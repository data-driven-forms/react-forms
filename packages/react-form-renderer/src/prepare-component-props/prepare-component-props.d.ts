import { AnyObject, ComponentMapper } from "../common-types";
import { ActionMapper } from "../form-renderer";

export interface PrepareComponentPropsOptions {
    component: string;
    rest: AnyObject;
    componentMapper: ComponentMapper;
    actionMapper: ActionMapper;
}

declare function prepareComponentProps(PrepareComponentPropsOptions: AnyObject): AnyObject;

export default prepareComponentProps;
