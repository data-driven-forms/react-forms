import { Field } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { HeaderProps } from "semantic-ui-react";
import { FormFieldGridProps } from "./form-field-grid";

export interface SubFormProps {
  fields: Field | Field[];
  title?: ReactNode;
  description?: ReactNode;
  HeaderProps?: HeaderProps;
  DescriptionProps?: React.HTMLProps<HTMLElement>;
  FormFieldsGridProps?: React.HTMLProps<HTMLElement>;
}

declare const SubForm: React.ComponentType<SubFormProps>;

export default SubForm;
