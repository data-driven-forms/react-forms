import { Field } from "@data-driven-forms/react-form-renderer";
import { AppBarProps, GridProps, TabProps } from "@mui/material";

export interface TabsProps {
  fields: Field[];
  AppBarProps?: AppBarProps;
  TabsProps?: TabsProps;
  TabProps?: TabProps;
  FormFieldGridProps?: GridProps,
  GridItemProps?: GridProps,
}

declare const Tabs: React.ComponentType<TabsProps>;

export default Tabs;
