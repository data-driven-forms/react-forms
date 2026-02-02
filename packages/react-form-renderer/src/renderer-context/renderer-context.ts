import { createContext, ReactNode } from 'react';
import { FormApi } from 'final-form';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper } from '../validator-mapper';
import { ActionMapper } from '../form-renderer/action-mapper';
import Field from '../common-types/field';
import Schema from '../common-types/schema';
import { ConditionMapper } from '../form-renderer/condition-mapper';

export interface FormOptions<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
  extends FormApi<FormValues, InitialFormValues> {
  registerInputFile?: (name: keyof FormValues) => void;
  unRegisterInputFile?: (name: keyof FormValues) => void;
  onCancel?: (values: FormValues, ...args: any[]) => void;
  onReset?: () => void;
  onSubmit?: (...args: any[]) => void | any | Promise<any>;
  handleSubmit: () => Promise<FormValues | undefined> | undefined;
  onError?: (...args: any[]) => void;
  clearOnUnmount?: boolean;
  clearedValue?: any;
  renderForm: (fields: Field[]) => ReactNode[];
  internalRegisterField: (name: keyof FormValues) => void;
  internalUnRegisterField: (name: keyof FormValues) => void;
  getRegisteredFields: () => string[];
  ffGetRegisteredFields: () => string[];
  initialValues: InitialFormValues;
  schema: Schema;
  pristine: boolean;
  valid: boolean;
}

export interface RendererContextValue {
  componentMapper: ComponentMapper;
  validatorMapper: ValidatorMapper;
  actionMapper: ActionMapper;
  formOptions: FormOptions;
  conditionMapper: ConditionMapper;
}

const RendererContext = createContext<RendererContextValue>({
  formOptions: {} as FormOptions,
} as RendererContextValue);

export default RendererContext;
