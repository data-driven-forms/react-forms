import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { DualListSelectorProps } from "@patternfly/react-core";
import { ReactNode } from "react";
import FormGroupProps from "../form-group";
export interface DualListSelectOption extends AnyObject {
  value: any;
  label: ReactNode | string;
}

export type GetValueFromNode = (node: ReactNode) => string;

interface InternalDualListSelectProps {
  options: Array<DualListSelectOption | string>;
  getValueFromNode?: GetValueFromNode;
  isSortable?: boolean;
}

export type DualListSelectProps = InternalDualListSelectProps & FormGroupProps & UseFieldApiComponentConfig & DualListSelectorProps;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
