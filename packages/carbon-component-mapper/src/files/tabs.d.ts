import { ReactNode } from "react";
import { Field, AnyObject } from "@data-driven-forms/react-form-renderer";

export interface TabField extends AnyObject {
  name: string;
  title?: ReactNode;
  label?: ReactNode;
  fields: Field[];
}

export interface TabsProps extends AnyObject {
  fields: TabField[];
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
