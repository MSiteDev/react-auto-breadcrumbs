import { PropsWithChildren, ReactElement, createContext, createElement, useContext, useEffect, useState } from 'react';

import { FakeRegistry, Registry, RegistryInterface } from './Registry';

export type ElementData = Record<string, any>;

interface Options {
    displayName?: string;
}

export default function createBreadcrumbComponents<TData extends ElementData = ElementData>(options: Options = {}) {
    const { displayName = 'Default' } = options;

    const DepthContext = createContext<number>(0);
    DepthContext.displayName = `BreadcrumbDepthContext-${displayName}`;

    const RegistryContext = createContext<RegistryInterface<TData>>(new FakeRegistry());
    RegistryContext.displayName = `BreadcrumbRegistryContext-${displayName}`;

    function BreadcrumbsProvider({ children }: PropsWithChildren) {
        const [manager] = useState(() => new Registry<TData>());

        return createElement(RegistryContext.Provider, { value: manager }, children);
    }

    function Breadcrumb({ children, ...data }: PropsWithChildren<TData>) {
        const depth = useContext(DepthContext);
        const manager = useContext(RegistryContext);

        useEffect(() => manager.add({ depth, data }), [manager, depth, ...Object.values(data)]);

        return createElement(DepthContext.Provider, { value: depth + 1 }, children);
    }

    function useBreadcrumbs() {
        const manager = useContext(RegistryContext);
        const [elements, setElements] = useState<readonly Omit<TData, 'children'>[]>([]);

        useEffect(() => manager.subscribe(setElements), [manager]);

        return elements;
    }

    function Breadcrumbs({ render }: { render: (elements: readonly Omit<TData, 'children'>[]) => ReactElement }) {
        return render(useBreadcrumbs());
    }

    return { BreadcrumbsProvider, Breadcrumb, useBreadcrumbs, Breadcrumbs };
}

export const { BreadcrumbsProvider, Breadcrumb, useBreadcrumbs, Breadcrumbs } = createBreadcrumbComponents<{
    label: string;
    path: string;
}>();
