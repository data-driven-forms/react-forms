import { AnyObject, Field } from "@data-driven-forms/react-form-renderer";
export interface WizardProps extends AnyObject {
  fields: Field[];
  isDynamic?: boolean;
  crossroads?: string[];
  Wizard?: React.ComponentType;
  component?: any;
  initialState?: AnyObject;
}

declare const Wizard: React.ComponentType<WizardProps>
export const wizardProps: AnyObject
export default Wizard;
