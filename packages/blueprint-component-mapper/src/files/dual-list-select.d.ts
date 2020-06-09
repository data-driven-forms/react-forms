import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { IButtonGroupProps, IButtonProps, IControlGroupProps, IInputGroupProps, IMenuProps, IMenuItemProps } from "@blueprintjs/core";

export interface DualListSelectValue extends AnyObject {
  value?: any;
  label: ReactNode;
}

export interface DualListSelectProps {
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  moveLeftTitle?: ReactNode;
  moveRightTitle?: ReactNode;
  allToLeft?: boolean;
  allToRight?: boolean;
  validateOnMount?: boolean;
  moveAllLeftTitle?: ReactNode;
  moveAllRightTitle?: ReactNode;
  noValueTitle?: ReactNode;
  noOptionsTitle?: ReactNode;
  filterOptionsTitle?: ReactNode;
  filterValueTitle?: ReactNode;
  filterValueText?: ReactNode;
  filterOptionsText?: ReactNode;
  leftValues?: DualListSelectValue[];
  rightValues?: DualListSelectValue[];
  WrapperProps?: React.HTMLProps<HTMLDivElement>;
  LeftWrapperProps?: React.HTMLProps<HTMLDivElement>;
  RightWrapperProps?: React.HTMLProps<HTMLDivElement>;
  ButtonGroupProps?: IButtonGroupProps;
  ToRightButtonProps?: IButtonProps;
  AllToRightButtonProps?: IButtonProps;
  AllToLeftButtonProps?: IButtonProps;
  ToLeftButtonProps?: IButtonProps;
  LeftControlGroupProps?: IControlGroupProps;
  LeftInputGroupProps?: IInputGroupProps;
  LeftButtonProps?: IButtonProps;
  RightControlGroupProps?: IControlGroupProps;
  RightInputGroupProps?: IInputGroupProps;
  RightButtonProps?: IButtonProps;
  LeftMenuProps?: IMenuProps;
  LeftMenuItemProps?: IMenuItemProps;
  RightMenuProps?: IMenuProps;
  RightMenuItemProps?: IMenuItemProps;
}

declare const DualListSelect: React.ComponentType<DualListSelectProps & FormGroupProps & UseFieldApiComponentConfig>

export default DualListSelect;
