import { Validator } from '../validators';
import { ConditionDefinition } from '../condition';
import { DataType } from '../data-types';
import { AnyObject } from '../common-types/any-object';
import { FieldInputProps } from 'react-final-form';
import { FormOptions } from '../renderer-context';
import { Meta } from '../use-field-api';

export type FieldAction = [string, ...any[]];

export interface FieldActions {
  [key: string]: FieldAction;
}

export interface FieldApi<FieldValue, T extends HTMLElement = HTMLElement> {
  meta: Meta<FieldValue>;
  input: FieldInputProps<FieldValue, T>;
}

export type ResolvePropsFunction<FormValues = Record<string, any>, FieldValue = FormValues[keyof FormValues]> = (
  props: AnyObject,
  fieldApi: FieldApi<FieldValue>,
  formOptions: FormOptions<FormValues>
) => AnyObject;

interface Field<FormValues = Record<string, any>, FieldValue = FormValues[keyof FormValues]> extends AnyObject {
  name: string;
  component: string;
  validate?: Validator[];
  condition?: ConditionDefinition | ConditionDefinition[];
  initializeOnMount?: boolean;
  dataType?: DataType;
  initialValue?: FieldValue;
  clearedValue?: FieldValue;
  clearOnUnmount?: boolean;
  actions?: FieldActions;
  resolveProps?: ResolvePropsFunction<FormValues, FieldValue>;
}

export default Field;
