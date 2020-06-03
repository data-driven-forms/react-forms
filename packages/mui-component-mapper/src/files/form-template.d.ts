export interface FormTemplateProps {
  FormWrapper?: React.ComponentType;
  Button?: React.ComponentType;
  ButtonGroup?: React.ComponentType;
  Title?: React.ComponentType;
  Description?: React.ComponentType;
  FormWrapperProps?: React.HTMLAttributes<HTMLFormElement>;
}

declare const FormTemplate: React.ComponentType<FormTemplateProps>;

export default FormTemplate;
