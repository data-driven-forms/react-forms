import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ISliderProps } from "@blueprintjs/core";

export interface SliderProps extends ISliderProps {
  step?: string | number;
}

declare const Slider: React.ComponentType<SliderProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Slider;
