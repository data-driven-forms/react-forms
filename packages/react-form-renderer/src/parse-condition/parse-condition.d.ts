import { AnyObject } from "../common-types/any-object";
import { ConditionDefinition } from "../condition";
import Field from "../common-types/field";
import { ConditionMapper } from "../form-renderer/condition-mapper";

export type ParseCondition = (condition: ConditionDefinition, values: AnyObject, Field: Field, conditionMapper?: ConditionMapper) => void;
declare const parseCondition: ParseCondition
export default parseCondition;
