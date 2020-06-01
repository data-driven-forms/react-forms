import { Validator } from "./validators";
import { ConditionDefinition } from './condition';
import { DataType } from "./data-types";
import { AnyObject } from "./common";

export type FieldAction = [string, ...any[]];

interface Field extends AnyObject {
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
