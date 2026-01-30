import componentTypes from '../component-types';
import { ComponentType } from '../component-types';

const isSpecialType = (componentType: ComponentType): componentType is 'checkbox' | 'radio' => {
  return componentType === componentTypes.CHECKBOX || componentType === componentTypes.RADIO;
};

const assignSpecialType = (componentType: ComponentType): string | undefined => {
  return isSpecialType(componentType) ? componentType : undefined;
};

export default assignSpecialType;
