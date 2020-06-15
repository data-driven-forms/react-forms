import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import { FormGroupProps } from "@patternfly/react-core";

export interface DualListSelectOption extends AnyObject {
  value?: any;
  label: ReactNode;
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
  leftValues: DualListSelectOption[];
  rightValues: DualListSelectOption[];
}

export type DualListSelectProps = InternalDualListSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
