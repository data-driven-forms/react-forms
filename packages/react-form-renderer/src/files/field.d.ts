import { Validator } from "./validators";
import { ConditionDefinition } from './condition';
import { DataType } from "./data-types";
import { AnyObject } from "./common";
import { FieldMetaState, FieldInputProps } from "react-final-form";
import { FormOptions } from "./renderer-context";
import { Meta } from "./use-field-api";

export type FieldAction = [string, ...any[]];

export interface FieldActions {
  [key: string]: FieldAction;
}

export interface FieldApi<FieldValue, T extends HTMLElement = HTMLElement> {
  meta: Meta<FieldValue>;
  input: FieldInputProps<FieldValue, T>;
}

export type ResolvePropsFunction = (props: AnyObject, fieldApi: FieldApi<any>, formOptions: FormOptions) => AnyObject;

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
  resolveProps?: ResolvePropsFunction;
}

export default Field;
