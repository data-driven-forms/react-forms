import AnyObject from "./any-object";

export type Change = (name: string, value?: any) => void;

export interface ManagerState {
  values: AnyObject;
  errors: AnyObject;
  pristine: boolean;
  change: Change;
}

export type ManagerApi = () => ManagerState;

declare type CreateManagerApi = () => ManagerApi

export default CreateManagerApi;
