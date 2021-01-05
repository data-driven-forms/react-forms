import { ReactNode } from "react";
import { FieldArrayField } from "@data-driven-forms/react-form-renderer";
import { ButtonGroupProps, ButtonProps, HeaderProps } from "semantic-ui-react";

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
  buttonLabels?: FieldArrayButtonLabels;
  /** Sub components customization API */
  FieldArrayGridProps?: React.HTMLProps<HTMLDivElement>;
  FieldArrayHeaderProps?: React.HTMLProps<HTMLDivElement>;
  FieldArrayButtonGridProps?: React.HTMLProps<HTMLDivElement>;
  ButtonGroupProps?: ButtonGroupProps;
  UndoButtonProps?: ButtonProps;
  RedoButtonProps?: ButtonProps;
  AddButtonProps?: ButtonProps;
  DescriptionProps?: HeaderProps;
  ArrayItemsGridProps?: React.HTMLProps<HTMLDivElement>;
  NoItemsProps?: React.HTMLProps<HTMLParagraphElement>;
  RemoveButtonProps?: ButtonProps;
  ArrayItemGridProps?: React.HTMLProps<HTMLDivElement>;
  ArrayItemFieldsGridProps?: React.HTMLProps<HTMLDivElement>;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
