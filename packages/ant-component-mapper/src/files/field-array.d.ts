import { FieldArrayField } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { RowProps } from "antd/lib/row";
import { ButtonProps } from "antd/es/button";
import { TextProps } from "antd/lib/typography/Text";
import { ColProps } from "antd/lib/col";
import { TitleProps } from "antd/lib/typography/Title";
import { SpaceProps } from "antd/lib/space";

export interface FieldArrayButtonLabels {
  add?: ReactNode;
  remove?: ReactNode;
}

export interface FieldArrayProps {
  fields: FieldArrayField[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
  buttonLabels?: FieldArrayButtonLabels;
  ArrayItemProps?: RowProps;
  FieldsContainerProps?: ColProps;
  RemoveContainerProps?: ColProps;
  RemoveButtonProps?: ButtonProps;
  FieldArrayRowProps?: RowProps;
  FieldArrayRowCol?: ColProps;
  FieldArrayHeaderProps?: RowProps;
  FieldArrayLabelProps?: TitleProps;
  FieldArrayButtonsProps?: SpaceProps;
  UndoButtonProps?: ButtonProps;
  RedoButtonProps?: ButtonProps;
  AddButtonProps?: ButtonProps;
  FieldArrayDescriptionProps?: TextProps;
  NoItemsMessageProps?: TextProps;
  ErrorMessageProps?: TextProps;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
