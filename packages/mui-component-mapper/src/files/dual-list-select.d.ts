import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import {
  GridProps,
  ListProps,
  IconButtonProps,
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
  TextFieldProps
} from "@material-ui/core";

export interface DualListOption extends AnyObject {
  value: any;
  label: ReactNode;
}

export interface DualListSelectProps {
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
  IconButtonProps?: IconButtonProps;
  ToRightIconButtonProps?: IconButtonProps;
  IconProps?: IconProps;
  AllToLeftIconProps?: IconProps;
  AllToRightGridProps?: GridProps;
  AllToRightIconButtonProps?: IconButtonProps;
  AllToLeftGridProps?: GridProps;
  AllToLeftIconButtonProps?: IconButtonProps;
  ToLeftGridProps?: GridProps;
  ToLeftIconProps?: IconProps;
  ToLeftIconButtonProps?: IconButtonProps;
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
  SortIconButtonProps?: IconButtonProps;
  SortIconProps?: IconProps;
  LeftToolbarProps?: ToolbarProps;
  LeftFilterFieldProps?: TextFieldProps;
  LeftSortIconButtonProps?: IconButtonProps;
  LeftSortIconProps?: IconProps;
  LeftTitleProps?: TypographyProps;
  RightToolbarProps?: ToolbarProps;
  RightFilterFieldProps?: TextFieldProps;
  RightSortIconButtonProps?: IconButtonProps;
  RightSortIconProps?: IconProps;
  RightTitleProps?: TypographyProps;
}

declare const DualListSelect: React.ComponentType<DualListSelectProps & UseFieldApiComponentConfig>;

export default DualListSelect;
