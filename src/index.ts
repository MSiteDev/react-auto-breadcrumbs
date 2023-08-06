import {createContext, createElement, PropsWithChildren, ReactElement, useContext, useEffect, useState} from "react";
import {WithoutChildren} from "./helper";
import {FakeRegistry, RegistryInterface, Registry} from "./Registry";

export type ElementData = Record<string, any>;

interface Options {
    displayName?: string;
}

export default function createBreadcrumbComponents<TData extends ElementData>(options: Options = {}) {
    const {displayName = 'Default'} = options;

    const DepthContext = createContext<number>(0);
    DepthContext.displayName = `BreadcrumbDepthContext-${displayName}`;

    const RegistryContext = createContext<RegistryInterface<TData>>(new FakeRegistry());
    RegistryContext.displayName = `BreadcrumbManagerContext-${displayName}`;

    function BreadcrumbsProvider({children}: PropsWithChildren) {
        const [manager] = useState(() => new Registry<TData>());

        return createElement(RegistryContext.Provider, {value: manager}, children);
    }

    function Breadcrumb({children, ...data}: PropsWithChildren<WithoutChildren<TData>>) {
        const depth = useContext(DepthContext);
        const manager = useContext(RegistryContext);

        useEffect(() => manager.add({depth, data}), [manager, depth, ...Object.values(data)]);

        return createElement(DepthContext.Provider, {value: depth + 1}, children);
    }

    function useBreadcrumbs() {
        const manager = useContext(RegistryContext);
        const [elements, setElements] = useState<WithoutChildren<TData>[]>([]);

        useEffect(() => manager.subscribe(setElements), [manager]);

        return elements;
    }

    function Breadcrumbs({render}: {render: (elements: WithoutChildren<TData>[]) => ReactElement}) {
        return render(useBreadcrumbs());
    }

    return {BreadcrumbsProvider, Breadcrumb, useBreadcrumbs, Breadcrumbs}
}