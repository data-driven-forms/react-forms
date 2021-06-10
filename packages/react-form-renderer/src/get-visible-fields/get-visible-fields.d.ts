import { Schema, AnyObject } from "../common-types";

declare function getVisibleFields(schema: Schema, values: AnyObject ): Schema;

export default getVisibleFields;
