import React, { ReactNode } from 'react';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper } from '../validator-mapper';
import { ActionMapper } from '../form-renderer';
import Field from '../common-types/field';
import { AnyObject } from '../common-types/any-object';
import Schema from '../common-types/schema';
import { ManagerApi } from '@data-driven-forms/form-state-manager/manager-api';

export interface FormOptions extends ManagerApi {
  onCancel?: (values: object, ...args: any[]) => void;
  onReset?: () => void;
  handleSubmit: () => Promise<AnyObject | undefined> | undefined;
  renderForm: (fields: Field[]) => ReactNode[];
  initialValues: AnyObject;
  schema: Schema,
}

export interface RendererContextValue {
  componentMapper: ComponentMapper;
  validatorMapper: ValidatorMapper;
  actionMapper: ActionMapper;
  formOptions: FormOptions;
}

declare const RendererContext: React.Context<RendererContextValue>;

export default RendererContext;
