import { ComponentType, FunctionComponent } from 'react';
import { FormApi } from 'final-form';
import Schema from './schema';
import ComponentMapper from './component-mapper';
import ValidatorMapper from './validator-mapper';
import ActionMapper from './action-mapper';
import SchemaValidatorMapper from './schema-validator-mapper';
import { FormTemplateRenderProps } from '../../dist/cjs';

export interface FormSubscription {
  [key: string]: boolean;
}

export interface FormRendererProps {
  initialValues?: object;
  onSubmit: (values: object, formApi: FormApi, callback: () => void) => Promise<any>;
  onCancel?: () => void;
  onReset?: () => void;
  schema: Schema;
  clearOnUnmount?: boolean;
  subscription?: FormSubscription;
  clearedValue?: any;
  componentMapper: ComponentMapper;
  FormTemplate: ComponentType<FormTemplateRenderProps> | FunctionComponent<FormTemplateRenderProps>;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
}

declare const FormRenderer: React.ComponentType<FormRendererProps>;

export default FormRenderer;
