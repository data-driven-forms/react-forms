import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import FormGroupProps from "./form-group";

interface InternalSliderProps extends React.HTMLProps<React.InputHTMLAttributes<any>> {
  isReadOnly?: boolean;
}

export type SliderProps = InternalSliderProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
