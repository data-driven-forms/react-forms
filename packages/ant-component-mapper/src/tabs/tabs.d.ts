import { ReactNode } from "react";
import { Field } from "@data-driven-forms/react-form-renderer";

import { TabsProps as AntTabsProps, TabPaneProps } from 'antd/lib/tabs';

export interface TabField extends TabPaneProps {
  name: string;
  title?: ReactNode;
  fields: Field[];
}

export interface TabsProps extends AntTabsProps {
  fields: TabField[];
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
