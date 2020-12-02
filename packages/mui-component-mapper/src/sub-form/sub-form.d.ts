import { Field } from "@data-driven-forms/react-form-renderer";
import { GridProps, TypographyProps } from "@material-ui/core";
import { ReactNode } from "react";

export interface SubFormProps {
  fields: Field[] | Field;
  title?: ReactNode;
  description?: ReactNode;
  TitleGridProps?: GridProps;
  TitleProps?: TypographyProps;
  DescriptionProps?: TypographyProps;
  DescriptionGridProps?: GridProps;
  ItemsGridProps?: GridProps;
}

declare const SubForm: React.ComponentType<SubFormProps>;

export default SubForm;
