import { ComponentType, FunctionComponent } from 'react';
import { FormApi, SubmissionErrors } from 'final-form';
import { FormProps } from 'react-final-form';
import Schema from './schema';
import ComponentMapper from './component-mapper';
import ValidatorMapper from './validator-mapper';
import ActionMapper from './action-mapper';
import SchemaValidatorMapper from './schema-validator-mapper';
import { FormTemplateRenderProps } from './form-template-render-props';
import { AnyObject } from './common';

export interface FormRendererProps extends FormProps {
  initialValues?: object;
  onCancel?: (values: AnyObject, ...args: any[]) => void;
  onReset?: () => void;
  schema: Schema;
  clearOnUnmount?: boolean;
  clearedValue?: any;
  componentMapper: ComponentMapper;
  FormTemplate: ComponentType<FormTemplateRenderProps> | FunctionComponent<FormTemplateRenderProps>;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
}

declare const FormRenderer: React.ComponentType<FormRendererProps>;

export default FormRenderer;
