import componentTypes from '../component-types';

const assignSpecialType = (componentType) => ([componentTypes.CHECKBOX, componentTypes.RADIO].includes(componentType) ? componentType : undefined);

export default assignSpecialType;
