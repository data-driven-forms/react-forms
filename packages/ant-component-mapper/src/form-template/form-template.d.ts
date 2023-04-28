import FormTemplateCommonProps from "@data-driven-forms/common/form-template";

export interface FormTemplateProps extends FormTemplateCommonProps {
  layout?: string;
}

declare const FormTemplate: React.ComponentType<FormTemplateProps>;

export default FormTemplate;
