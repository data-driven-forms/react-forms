import { Field } from "../common-types";
import { ConditionDefinition } from "../condition";
import { ConditionMapper } from "../form-renderer/condition-mapper";

declare function getConditionTriggers(params:ConditionDefinition | ConditionDefinition[], field: Extract<Field, 'condition' | 'hideField'>, conditionMapper: ConditionMapper): string[];

export default getConditionTriggers;
