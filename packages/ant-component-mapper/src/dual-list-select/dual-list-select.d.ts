import { FormGroupProps } from "../form-group";
import { AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

import { TransferProps } from "antd/es/transfer";

export interface DualListSelectValue extends AnyObject {
  value: any;
  label: ReactNode;
}

interface InternalDualListSelectProps extends TransferProps {
  options: DualListSelectValue[];
}

export type DualListSelectProps = InternalDualListSelectProps & FormGroupProps;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
