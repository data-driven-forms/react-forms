import { AnyObject } from "@data-driven-forms/react-form-renderer";

export interface DualListSortButtonProps extends AnyObject {
    position: 'left' | 'right';
}

declare const DualListSortButton: React.ComponentType<DualListSortButtonProps>;

export default DualListSortButton;
