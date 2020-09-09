import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

interface InternalSliderProps extends AnyObject, React.HTMLProps<HTMLInputElement> {
}

export type SliderProps = InternalSliderProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
