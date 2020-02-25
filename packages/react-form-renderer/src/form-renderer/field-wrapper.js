import React from 'react';
import PropTypes from 'prop-types';

import { shouldWrapInField } from './helpers';
import componentTypes from '../components/component-types';
import FieldProvider from '../components/field-provider';
import composeValidators from '../components/compose-validators';

const shouldAssignFormOptions = (componentType) => componentTypes.FIELD_ARRAY === componentType;
const assignSpecialType = (componentType) => ([componentTypes.CHECKBOX, componentTypes.RADIO].includes(componentType) ? componentType : undefined);

const FieldWrapper = ({ componentType, validate, component, ...rest }) => {
  const componentProps = {
    type: assignSpecialType(componentType),
    FieldProvider,
    ...rest,
    component
  };
  if (shouldAssignFormOptions(componentType)) {
    componentProps.arrayValidator = (value = []) => {
      if (!Array.isArray(value)) {
        return;
      }
      
      const arrayValidator = composeValidators(validate);
      let result = arrayValidator(value && value.length > 0 ? value : undefined);
      if (typeof result === 'function') {
        result = result(value);
      }
      
      return result;
    };
  } else {
    componentProps.validate = composeValidators(validate);
  }
  
  const Component = component;
  return shouldWrapInField(componentType) ? (
    <FieldProvider {...componentProps} />
  ) : (
    <Component validate={composeValidators(validate)} {...rest} FieldProvider={FieldProvider} />
  );
};

FieldWrapper.propTypes = {
  componentType: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired
};

export default FieldWrapper;
