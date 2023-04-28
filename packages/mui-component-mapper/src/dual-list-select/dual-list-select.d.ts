import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import {
  GridProps,
  ListProps,
  ButtonProps,
  IconProps,
  ListItemProps,
  ListItemIconProps,
  ListItemTextProps,
  ListItemSecondaryActionProps,
  FormControlProps,
  FormLabelProps,
  FormHelperTextProps,
  TypographyProps,
  ToolbarProps,
  TextFieldProps,
  PaperProps,
} from "@mui/material";

export interface DualListOption extends AnyObject {
  value: any;
  label: ReactNode;
}

interface InternalDualListSelectProps {
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  moveLeftTitle?: ReactNode;
  moveRightTitle?: ReactNode;
  allToLeft?: boolean;
  allToRight?: boolean;
  checkboxVariant?: boolean;
  validateOnMount?: boolean;
  moveAllLeftTitle?: ReactNode;
  moveAllRightTitle?: ReactNode;
  label?: ReactNode;
  isRequired?: boolean;
  helperText?: ReactNode;
  noValueTitle?: ReactNode;
  noOptionsTitle?: ReactNode;
  filterOptionsTitle?: ReactNode;
  filterValueTitle?: ReactNode;
  filterValueText?: ReactNode;
  filterOptionsText?: ReactNode;
  description?: ReactNode;
  hideLabel?: boolean;
  id?: string;
  leftValues?: DualListOption[];
  rightValues?: DualListOption[];
  FormFieldGridProps?: GridProps;
  InternalGridProps?: GridProps;
  ListGridProps?: GridProps;
  LeftListGridProps?: GridProps;
  ListProps?: ListProps;
  LeftListProps?: ListProps;
  ButtonsGridProps?: GridProps;
  ButtonsInternalGridProps?: GridProps;
  ButtonGridProps?: GridProps;
  ToRightGridProps?: GridProps;
  ButtonProps?: ButtonProps;
  ToRightIconButtonProps?: ButtonProps;
  AllToRightGridProps?: GridProps;
  AllToRightIconButtonProps?: ButtonProps;
  AllToLeftGridProps?: GridProps;
  AllToLeftIconButtonProps?: ButtonProps;
  ToLeftGridProps?: GridProps;
  ToLeftIconButtonProps?: ButtonProps;
  RightListGridProps?: GridProps;
  RightListProps?: ListProps;
  ListItemProps?: ListItemProps;
  ListItemIconProps?: ListItemIconProps;
  ListItemTextProps?: ListItemTextProps;
  ListItemSecondaryActionProps?: ListItemSecondaryActionProps;
  LeftListItemProps?: ListItemProps;
  LeftListItemIconProps?: ListItemIconProps;
  LeftItemTextProps?: ListItemTextProps;
  LeftItemSecondaryActionProps?: ListItemSecondaryActionProps;
  RightListItemProps?: ListItemProps;
  RightListItemIconProps?: ListItemIconProps;
  RightItemTextProps?: ListItemTextProps;
  RightItemSecondaryActionProps?: ListItemSecondaryActionProps;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  TitleProps?: TypographyProps;
  ToolbarProps?: ToolbarProps;
  FilterFieldProps?: TextFieldProps;
  SortIconButtonProps?: ButtonProps;
  SortIconProps?: IconProps;
  LeftToolbarProps?: ToolbarProps;
  LeftFilterFieldProps?: TextFieldProps;
  LeftSortIconButtonProps?: ButtonProps;
  LeftSortIconProps?: IconProps;
  LeftTitleProps?: TypographyProps;
  RightToolbarProps?: ToolbarProps;
  RightFilterFieldProps?: TextFieldProps;
  RightSortIconButtonProps?: ButtonProps;
  RightSortIconProps?: IconProps;
  RightTitleProps?: TypographyProps;
  isFilterable?: Boolean;
  PaperProps?: PaperProps;
  LeftPaperProps?: PaperProps;
  RightPaperProps?: PaperProps;
}

export type DualListSelectProps = InternalDualListSelectProps & UseFieldApiComponentConfig;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
