import { Schema, AnyObject, ComponentMapper, SchemaValidatorMapper } from "../common-types";
import { ActionMapper } from "../form-renderer";
import { ValidatorMapper } from "../validator-mapper";

export interface ValidationOptions {
    values: AnyObject;
    componentMapper?: ComponentMapper;
    validatorMapper?: ValidatorMapper;
    actionMapper?: ActionMapper;
    schemaValidatorMapper?: SchemaValidatorMapper;
    omitWarnings?: boolean;
}

declare function validation(schema: Schema, options: ValidationOptions): AnyObject;

export default validation;
