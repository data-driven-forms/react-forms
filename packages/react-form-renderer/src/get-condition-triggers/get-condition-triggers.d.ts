import { ConditionDefinition } from "../condition";

declare function getConditionTriggers(params:ConditionDefinition | ConditionDefinition[]): string[];

export default getConditionTriggers;
