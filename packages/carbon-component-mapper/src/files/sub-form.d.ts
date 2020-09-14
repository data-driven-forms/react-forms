import { Field, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

export interface SubFormProps {
  fields: Field | Field[];
  title?: ReactNode;
  description?: ReactNode;
  TitleElement?: string;
  DescriptionElement?: string;
  TitleProps?: AnyObject;
  DescriptionProps?: AnyObject;
}

declare const SubForm: React.ComponentType<SubFormProps>;

export default SubForm;
