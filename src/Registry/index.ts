import { ElementData } from "..";

export interface BreadcrumbElement<TData extends ElementData> {
  depth: number;
  data: Omit<TData, "children">;
}

export type Subscriber<TData extends ElementData> = (
  elements: readonly Omit<TData, "children">[],
) => void;

export interface RegistryInterface<TData extends ElementData> {
  add: (element: BreadcrumbElement<TData>) => VoidFunction;
  subscribe: (listener: Subscriber<TData>) => VoidFunction;
}

export { default as FakeRegistry } from "./FakeRegistry";
export { default as Registry } from "./Registry";
