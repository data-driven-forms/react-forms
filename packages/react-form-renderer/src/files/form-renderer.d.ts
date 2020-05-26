import { ComponentType } from 'react';
import { FormApi } from 'final-form';
import Schema from './schema';
import ComponentMapper from './component-mapper';
import ValidatorMapper from './validator-mapper';
import ActionMapper from './action-mapper';
import SchemaValidatorMapper from './schema-validator-mapper';

export interface FormSubscription {
  [key: string]: boolean;
}

export interface FormRendererProps {
  initialValues?: object;
  onSubmit: (values: object, formApi: FormApi, callback: () => void) => Promise<any>;
  onCancel: () => void;
  onReset: () => void;
  schema: Schema;
  clearOnUnmount?: boolean;
  subscription: FormSubscription;
  clearedValue: any;
  componentMapper: ComponentMapper;
  FormTemplate: ComponentType;
  validatorMapper: ValidatorMapper;
  actionMapper: ActionMapper;
  schemaValidatorMapper: SchemaValidatorMapper;
}

declare const FormRenderer: React.ComponentType<FormRendererProps>;

export default FormRenderer;
