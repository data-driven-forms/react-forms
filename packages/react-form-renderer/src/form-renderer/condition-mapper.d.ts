import { ConditionDefinition } from "../condition";

export interface ConditionMapper {
  [key: string]: (...args: any[]) => (value: any, conditionConfig: ConditionDefinition) => boolean;
}
