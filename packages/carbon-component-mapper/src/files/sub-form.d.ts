import { Field, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

export interface SubFormProps extends Omit<React.HTMLProps<HTMLDivElement>, 'title'> {
  fields: Field | Field[];
  title?: ReactNode;
  description?: ReactNode;
  TitleElement?: string;
  DescriptionElement?: string;
  TitleProps?: AnyObject;
  DescriptionProps?: AnyObject;
  HeaderProps?: React.HTMLProps<HTMLDivElement>;
}

declare const SubForm: React.ComponentType<SubFormProps>;

export default SubForm;
