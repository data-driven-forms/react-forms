import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

import {
  FormGroupProps as CarbonFormGroups,
  GridDefaultProps, RowDefaultProps,
  ColumnDefaultProps, ButtonProps,
  SearchProps, TooltipIconProps,
  StructuredListProps, StructuredListBodyProps,
  AllStructuredListRowProps,
  StructuredListCellProps
} from 'carbon-components-react';

export interface DualListSelectValue extends AnyObject {
  value: any;
  label: ReactNode;
  ListRowProps?: AllStructuredListRowProps;
  ListCellProps?: StructuredListCellProps;
  GridProps?: GridDefaultProps;
  RowProps?: RowDefaultProps;
  LabelProps?: ColumnDefaultProps;
  CheckmarkProps?: ColumnDefaultProps;
}

interface InternalDualListSelectProps {
  options: DualListSelectValue[];
  noOptionsTitle?: ReactNode;
  noValueTitle?: ReactNode;
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  LeftTitleElement?: string;
  RightTitleElement?: string;
  LeftTitleProps?: AnyObject;
  RightTitleProps?: AnyObject;
  moveLeftTitle?: ReactNode;
  moveRightTitle?: ReactNode;
  moveAllLeftTitle?: ReactNode;
  moveAllRightTitle?: ReactNode;
  label?: ReactNode;
  filterOptionsTitle?: string;
  filterValuesTitle?: string;
  sortOptionsTitle?: string;
  sortValuesTitle?: string;
  filterOptionsText?: ReactNode;
  filterValueText?: ReactNode;
  FormGroupProps?: CarbonFormGroups;
  GridProps?: GridDefaultProps;
  RowProps?: RowDefaultProps;
  OptionsColumnProps?: ColumnDefaultProps;
  ButtonColumnProps?: ColumnDefaultProps;
  ValuesColumnProps?: ColumnDefaultProps;
  AddButtonProps?: ButtonProps;
  AddAllButtonProps?: ButtonProps;
  RemoveButtonProps?: ButtonProps;
  RemoveAllButtonProps?: ButtonProps;
  LeftToolbarProps?: React.HTMLProps<HTMLDivElement>;
  RightToolbarProps?: React.HTMLProps<HTMLDivElement>;
  LeftSearchProps?: SearchProps;
  RightSearchProps?: SearchProps;
  LeftSortProps?: TooltipIconProps;
  RightSortProps?: TooltipIconProps;
  LeftListProps?: StructuredListProps;
  LeftBodyProps?: StructuredListBodyProps;
  RightListProps?: StructuredListProps;
  RightBodyProps?: StructuredListBodyProps
}

export type DualListSelectProps = InternalDualListSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
