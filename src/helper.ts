import {ElementData} from "./index";

export type WithoutChildren<T extends ElementData> = Omit<T, 'children'>;