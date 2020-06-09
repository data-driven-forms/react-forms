import { ITabsProps } from "@blueprintjs/core";
import { ReactNode } from "react";
import { Field } from "@data-driven-forms/react-form-renderer";

export interface TabField {
  name: string;
  title?: ReactNode;
  fields: Field[];
}

export interface TabsProps extends ITabsProps {
  name: string;
  fields: TabField[];
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
