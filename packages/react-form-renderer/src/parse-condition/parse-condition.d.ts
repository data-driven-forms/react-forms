import { AnyObject } from "../common-types/any-object";
import { ConditionDefinition } from "../condition";
import Field from "../common-types/field";

export type ParseCondition = (condition: ConditionDefinition, values: AnyObject, Field: Field) => void;
declare const parseCondition: ParseCondition
export default parseCondition;
