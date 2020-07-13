import { FormTemplateRenderProps, AnyObject } from "@data-driven-forms/react-form-renderer";

export interface FormTemplateProps extends FormTemplateRenderProps {
  formWrapperProps?: AnyObject;
  layout?: string;
}

declare const FormTemplate: React.ComponentType<FormTemplateProps>;

export default FormTemplate;
