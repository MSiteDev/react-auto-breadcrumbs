import {ElementData} from "../index";
import {RegistryInterface} from "./index";

export default class FakeRegistry<TData extends ElementData> implements RegistryInterface<TData> {
    public add(): VoidFunction {
        console.error('Trying to add breadcrumb element without a provider');
        return () => {};
    }
    public subscribe(): VoidFunction {
        console.error('Trying to subscribe to breadcrumb elements without a provider');
        return () => {};
    }
}