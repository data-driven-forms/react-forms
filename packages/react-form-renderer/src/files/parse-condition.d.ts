import { AnyObject } from "./common";
import { ConditionDefinition } from "./condition";

export type ParseCondition = (condition: ConditionDefinition, values: AnyObject) => void;
declare const parseCondition: ParseCondition
export default parseCondition;
