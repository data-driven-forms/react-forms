import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { CommonFieldProps } from "./common-field-props";
import { ReactNode } from "react";
import { SegmentProps, FormFieldProps, InputProps, GridColumnProps, ButtonProps, HeaderProps } from "semantic-ui-react";

export interface DualListSelectOption {
  label: ReactNode;
  value?: any;
}

export interface DualListSelectOptionProps extends React.HTMLProps<HTMLDivElement> {
  selectedClassName?: string;
}

interface InternalDualListSelectProps {
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  moveLeftTitle?: ReactNode;
  moveRightTitle?: ReactNode;
  allToLeft?: boolean;
  allToRight?: boolean;
  moveAllLeftTitle?: ReactNode;
  moveAllRightTitle?: ReactNode;
  noValueTitle?: ReactNode;
  noOptionsTitle?: ReactNode;
  filterOptionsTitle?: ReactNode;
  filterValueTitle?: ReactNode;
  filterValueText?: ReactNode;
  filterOptionsText?: ReactNode;
  leftValues?: DualListSelectOption[];
  rightValues?: DualListSelectOption[];
  /** Sub components customization API */
  OptionsListProps?: SegmentProps;
  OptionProps?: DualListSelectOptionProps;
  LabelProps?: FormFieldProps;
  ToolbarProps?: InputProps;
  ButtonGridProps?: GridColumnProps;
  RightButtonProps?: ButtonProps;
  DoubleRightButtonProps?: ButtonProps;
  LeftButtonProps?: ButtonProps;
  DoubleLeftButtonProps?: ButtonProps;
  OptionsHeaderProps?: HeaderProps;
  ValuesHeaderProps?: HeaderProps;
}

export type DualListSelectProps = InternalDualListSelectProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
