import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';

interface InternalSliderProps extends React.HTMLProps<HTMLInputElement> {
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

export type SliderProps = InternalSliderProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
