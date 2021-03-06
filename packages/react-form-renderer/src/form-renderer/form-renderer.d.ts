import { ComponentType, FunctionComponent } from 'react';
import { FormProps } from 'react-final-form';
import Schema from '../common-types/schema';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper} from '../validator-mapper';
import { ActionMapper } from './action-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';
import { FormTemplateRenderProps } from '../common-types/form-template-render-props';
import { AnyObject } from '../common-types/any-object';

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
