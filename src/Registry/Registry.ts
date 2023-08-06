import {ElementData} from "../index";
import {BreadcrumbElement, RegistryInterface, ElementsSubscriber} from "./index";
import {WithoutChildren} from "../helper";



export default class Registry<TData extends ElementData> implements RegistryInterface<TData> {
    private elements: BreadcrumbElement<WithoutChildren<TData>>[] = [];
    private subscribers: ElementsSubscriber<TData>[] = [];

    public add(element: BreadcrumbElement<WithoutChildren<TData>>): VoidFunction {
        this.elements.push(element);
        return () => this.elements = this.elements.filter(e => e !== element)
    }

    public subscribe(subscriber: ElementsSubscriber<TData>): VoidFunction {
        this.subscribers.push(subscriber);
        return () => this.subscribers = this.subscribers.filter(s => s !== subscriber)
    }
}