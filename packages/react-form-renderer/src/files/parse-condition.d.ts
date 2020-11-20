import { AnyObject } from "./common";
import { ConditionDefinition } from "./condition";
import Field from "./field";

export type ParseCondition = (condition: ConditionDefinition, values: AnyObject, Field: Field) => void;
declare const parseCondition: ParseCondition
export default parseCondition;
