import { RegistryInterface } from '.';
import { ElementData } from '..';

export default class FakeRegistry<TData extends ElementData> implements RegistryInterface<TData> {
    private addErrorHasBeenShown = false;
    private subscribeErrorHasBeenShown = false;

    public add(): VoidFunction {
        if (!this.addErrorHasBeenShown) {
            console.error('Trying to add breadcrumb element without a provider');
            this.addErrorHasBeenShown = true;
        }
        return () => void 0;
    }

    public subscribe(): VoidFunction {
        if (!this.subscribeErrorHasBeenShown) {
            console.error('Trying to subscribe to breadcrumb elements without a provider');
            this.subscribeErrorHasBeenShown = true;
        }
        return () => void 0;
    }
}
