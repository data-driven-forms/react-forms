import React, { ReactNode } from 'react';
import { FormApi } from 'final-form';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper } from '../validator-mapper';
import { ActionMapper } from '../form-renderer';
import Field from '../common-types/field';
import { AnyObject } from '../common-types/any-object';
import Schema from '../common-types/schema';
import { ConditionMapper } from '../form-renderer/condition-mapper';

export interface FormOptions<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
  extends FormApi<FormValues, InitialFormValues> {
  registerInputFile?: (name: keyof FormValues) => void;
  unRegisterInputFile?: (name: keyof FormValues) => void;
  onCancel?: (values: FormValues, ...args: any[]) => void;
  onReset?: () => void;
  handleSubmit: () => Promise<FormValues | undefined> | undefined;
  clearedValue?: any;
  renderForm: (fields: Field[]) => ReactNode[];
  internalRegisterField: (name: keyof FormValues) => void;
  internalUnregisterField: (name: keyof FormValues) => void;
  getRegisteredFields: () => string[];
  ffGetRegisteredFields: () => string[];
  initialValues: InitialFormValues;
  schema: Schema;
}

export interface RendererContextValue {
  componentMapper: ComponentMapper;
  validatorMapper: ValidatorMapper;
  actionMapper: ActionMapper;
  formOptions: FormOptions;
  conditionMapper: ConditionMapper;
}

declare const RendererContext: React.Context<RendererContextValue>;

export default RendererContext;
