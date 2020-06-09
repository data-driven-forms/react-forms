import { ReactNode } from "react";

export interface FormTemplateProps {
  requiredLabelInfo?: ReactNode;
  formWrapperProps?: React.HTMLProps<HTMLFormElement>;
  showFormControls?: boolean;
  disableSubmit: string[];
}

declare const FormTemplate: React.ComponentType<FormTemplateProps>;

export default FormTemplate;
