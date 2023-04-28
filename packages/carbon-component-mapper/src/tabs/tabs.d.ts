import { ReactNode } from "react";
import { Field } from "@data-driven-forms/react-form-renderer";

import { TabsProps as CarbonTabsProps, TabProps } from 'carbon-components-react';

export interface TabField extends TabProps {
  name: string;
  title?: string | undefined;
  label?: ReactNode;
  fields: Field[];
}

export interface TabsProps extends CarbonTabsProps {
  fields: TabField[];
  TabWrapperProps?: React.HTMLProps<HTMLDivElement>;
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
