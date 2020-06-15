import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ISliderProps } from "@blueprintjs/core";

interface InternalSliderProps extends ISliderProps {
  step?: string | number;
}

export type SliderProps = InternalSliderProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
