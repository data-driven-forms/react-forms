import { Field } from "@data-driven-forms/react-form-renderer";
import { TabProps, TabPaneProps } from "semantic-ui-react";

export interface TabsProps {
  fields: Field[];
  TabProps: TabProps;
  TabPaneProps: TabPaneProps;
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
