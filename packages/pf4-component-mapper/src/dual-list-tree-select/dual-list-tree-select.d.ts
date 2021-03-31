import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { DualListSelectorProps } from "@patternfly/react-core";
import { DualListSelectorTreeItemProps } from "@patternfly/react-core/dist/js/components/DualListSelector/DualListSelectorTreeItem";
import FormGroupProps from "../form-group";

export interface DualListTreeSelectOption extends DualListSelectorTreeItemProps {
  value: any;
}

interface InternalDualListSelectProps {
  options: Array<DualListTreeSelectOption | string>;
  isSortable?: boolean;
}

export type DualListTreeSelectProps = InternalDualListSelectProps & FormGroupProps & UseFieldApiComponentConfig & DualListSelectorProps;

declare const DualListSelectTree: React.ComponentType<DualListTreeSelectProps>;

export default DualListSelectTree;
