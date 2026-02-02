import { Validator } from '../validators';
import { ConditionDefinition } from '../condition';
import { DataType } from '../data-types';
import { AnyObject } from './any-object';
import { FieldInputProps } from 'react-final-form';
import { FormOptions } from '../renderer-context';
import { Meta } from '../use-field-api';
import ComponentMapper, { ComponentPropsMap } from './component-mapper';

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

// Re-export BaseFieldProps from use-field-api for consistency
export { BaseFieldProps } from '../use-field-api';

// Strict base field properties for generic type inference (without AnyObject)
export interface StrictBaseFieldProps<FormValues = Record<string, any>, FieldValue = FormValues[keyof FormValues]> {
  name: string;
  label?: string;
  helperText?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isVisible?: boolean;
  hideField?: boolean;
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

// Utility type for users to create typed field component props without AnyObject
export type TypedFieldProps<P = {}> = StrictBaseFieldProps & P;

// Generic field type that infers component-specific props from any ComponentMapper
export type Field<
  T extends ComponentMapper = ComponentMapper,
  C extends keyof T = keyof T,
  FormValues = Record<string, any>,
  FieldValue = FormValues[keyof FormValues]
> = StrictBaseFieldProps<FormValues, FieldValue> & {
  component: C;
} & ComponentPropsMap<T>[C];

// For backward compatibility - preserve the original interface
interface LegacyField<FormValues = Record<string, any>, FieldValue = FormValues[keyof FormValues]> extends AnyObject {
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

// Export the backward-compatible version as default for existing code
export default LegacyField;
