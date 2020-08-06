import AnyObject from "./any-object";

export interface FieldState {
    name: string;
    getFieldState: () => AnyObject;
    value: any;
    persistOnUnmount: boolean;
}
