import { Schema, AnyObject, ComponentMapper } from "../common-types";
import { ActionMapper } from "../form-renderer";

export interface GetValidatesOptions {
    values: AnyObject;
    componentMapper: ComponentMapper;
    actionMapper: ActionMapper;
}

declare function getValidates(schema: Schema, options: GetValidatesOptions, validations?: AnyObject): AnyObject;

export default getValidates;
