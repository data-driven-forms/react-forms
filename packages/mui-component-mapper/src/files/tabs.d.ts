import { Field } from "@data-driven-forms/react-form-renderer";
import { AppBarProps, TabProps } from "@material-ui/core";

export interface TabsProps {
  fields: Field[];
  AppBarProps?: AppBarProps;
  TabsProps?: TabsProps;
  TabProps?: TabProps;
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
