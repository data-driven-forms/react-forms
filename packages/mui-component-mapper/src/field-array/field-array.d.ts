import { ReactNode } from "react";
import { FieldArrayField } from "@data-driven-forms/react-form-renderer";
import { FormControlProps, GridProps, ButtonProps, FormHelperTextProps, TypographyProps } from "@mui/material";

export interface FieldArrayButtonLabels {
  add?: ReactNode;
  remove?: ReactNode;
}

export interface FieldArrayProps {
  label?: ReactNode;
  description?: ReactNode;
  fields: FieldArrayField[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
  FormControlProps?: FormControlProps;
  FormFieldGridProps?: GridProps;
  buttonLabels?: FieldArrayButtonLabels;
  GridContainerProps: GridProps;
  HeaderGridProps: GridProps;
  HeaderProps: TypographyProps;
  UndoButtonProps: ButtonProps;
  RedoButtonProps: ButtonProps;
  AddButtonProps: ButtonProps;
  DescriptionGridProps: GridProps;
  DescriptionProps: TypographyProps;
  BodyGridProps: GridProps;
  NoItemsProps: TypographyProps;
  FormHelperTextGridProps: GridProps;
  FormHelperTextProps: FormHelperTextProps;
  FieldContainerProps: GridProps;
  FieldGroupGridProps: GridProps;
  RemoveButtonGridProps: GridProps;
  RemoveButtonProps: ButtonProps;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;
export default FieldArray;
