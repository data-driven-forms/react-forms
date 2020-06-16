import { Validator } from "./validators";
import { ConditionDefinition } from './condition';
import { DataType } from "./data-types";
import { AnyObject } from "./common";

export type FieldAction = [string, ...any[]];

export interface FieldActions {
  [key: string]: FieldAction;
}

interface Field extends AnyObject {
  name: string;
  component: string;
  validate?: Validator[];
  condition?: ConditionDefinition | ConditionDefinition[];
  initializeOnMount?: boolean;
  dataType?: DataType;
  initialValue?: any;
  clearedValue?: any;
  clearOnUnmount?: boolean;
  actions?: FieldActions;
}

export default Field;
