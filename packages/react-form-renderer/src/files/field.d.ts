import { Validator } from "./validators";
import { ConditionDefinition } from './condition';
import { DataType } from "./data-types";

export type FieldAction = [string, ...any[]];

interface Field extends Object {
  name: string;
  component: string;
  validate?: Validator[];
  condition?: ConditionDefinition[];
  initializeOnMount?: boolean;
  dataType?: DataType;
  initialValue?: any;
  clearedValue?: any;
  clearOnUnmount?: boolean;
  actions?: FieldAction;
}

export default Field;
