import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { IRadioGroupProps } from "@blueprintjs/core";

export interface RadioProps extends IRadioGroupProps {}

declare const Radio: React.ComponentType<RadioProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Radio;
