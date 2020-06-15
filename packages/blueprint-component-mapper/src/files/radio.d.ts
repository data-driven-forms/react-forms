import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { IRadioGroupProps } from "@blueprintjs/core";

interface InternalRadioProps extends IRadioGroupProps {}

export type RadioProps = InternalRadioProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
