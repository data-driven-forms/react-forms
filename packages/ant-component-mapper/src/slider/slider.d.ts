import { FormGroupProps } from "../form-group";

import { SliderProps as AntSliderProps } from 'antd/es/slider/index';

export type SliderProps = AntSliderProps & FormGroupProps;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
