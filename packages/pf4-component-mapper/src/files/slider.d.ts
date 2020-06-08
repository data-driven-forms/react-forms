import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import FormGroupProps from "./form-group";
import { InputHTMLAttributes } from "react";

export interface SliderProps extends React.HTMLProps<React.InputHTMLAttributes<any>> {
  isReadOnly?: boolean;
}

declare const Slider: React.ComponentType<SliderProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Slider;
