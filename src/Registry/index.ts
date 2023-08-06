import {ElementData} from "../index";
import {WithoutChildren} from "../helper";

export interface BreadcrumbElement<TData extends ElementData> {
    depth: number;
    data: Omit<TData, 'children'>;
}

export type ElementsSubscriber<TData extends ElementData> = (elements: WithoutChildren<TData>[]) => void;

export interface RegistryInterface<TData extends ElementData> {
    add: (element: BreadcrumbElement<WithoutChildren<TData>>) => VoidFunction;
    subscribe: (listener: ElementsSubscriber<TData>) => VoidFunction;
}

export {default as FakeRegistry} from './FakeRegistry';
export {default as Registry} from './Registry';