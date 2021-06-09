import { Schema, AnyObject } from "../common-types";

export interface ValidationOptions {
    values: AnyObject;
}

declare function validation(schema: Schema, options: ValidationOptions): AnyObject;

export default validation;
