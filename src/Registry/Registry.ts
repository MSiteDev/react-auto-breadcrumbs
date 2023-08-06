import { ElementData } from "../index";
import { BreadcrumbElement, RegistryInterface, Subscriber } from "./index";

export default class Registry<TData extends ElementData>
  implements RegistryInterface<TData>
{
  private elements: BreadcrumbElement<TData>[] = [];
  private subscribers: Subscriber<TData>[] = [];

  public add(element: BreadcrumbElement<TData>): VoidFunction {
    this.elements.push(element);
    this.emitChange();
    return () => (this.elements = this.elements.filter((e) => e !== element));
  }

  public get sortedElementsData(): readonly Omit<TData, "children">[] {
    return this.elements
      .sort((a, b) => {
        return Math.min(1, Math.max(-1, a.depth - b.depth));
      })
      .map((e) => e.data);
  }

  private emitChange() {
    this.subscribers.forEach((s) => s(this.sortedElementsData));
  }

  public subscribe(subscriber: Subscriber<TData>): VoidFunction {
    this.subscribers.push(subscriber);
    return () =>
      (this.subscribers = this.subscribers.filter((s) => s !== subscriber));
  }
}
