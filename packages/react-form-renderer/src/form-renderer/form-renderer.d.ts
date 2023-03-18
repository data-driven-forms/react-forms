import { ComponentType, ReactElement, FunctionComponent, ReactNode } from 'react';
import { FormProps } from 'react-final-form';
import Schema from '../common-types/schema';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper } from '../validator-mapper';
import { ActionMapper } from './action-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';
import { FormTemplateRenderProps } from '../common-types/form-template-render-props';
import { AnyObject } from '../common-types/any-object';

export interface FormRendererProps<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>,
  FormTemplateProps extends FormTemplateRenderProps = FormTemplateRenderProps
> extends Omit<FormProps<FormValues, InitialFormValues>, 'onSubmit'> {
  initialValues?: InitialFormValues;
  onCancel?: (values: FormValues, ...args: any[]) => void;
  onReset?: () => void;
  onError?: (...args: any[]) => void;
  onSubmit?: FormProps<FormValues, InitialFormValues>['onSubmit'];
  schema: Schema;
  clearOnUnmount?: boolean;
  clearedValue?: any;
  componentMapper: ComponentMapper;
  FormTemplate?: ComponentType<FormTemplateProps> | FunctionComponent<FormTemplateProps>;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
  FormTemplateProps?: Partial<FormTemplateProps>;
  children?: ReactNode | ((props: FormTemplateRenderProps) => ReactNode);
}

declare function FormRenderer<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>,
  FormTemplateProps extends FormTemplateRenderProps = FormTemplateRenderProps
>(props: FormRendererProps<FormValues, InitialFormValues, FormTemplateProps>): ReactElement<any, any>;

export default FormRenderer;
