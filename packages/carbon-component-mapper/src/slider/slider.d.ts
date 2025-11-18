import { FormGroupProps } from "../form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { SliderProps as CarbonSliderProps } from '@carbon/react';

export type SliderProps = CarbonSliderProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
