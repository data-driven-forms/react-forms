import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { SliderProps as CarbonSliderProps } from 'carbon-components-react';

interface InternalSliderProps extends CarbonSliderProps {
}

export type SliderProps = InternalSliderProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
