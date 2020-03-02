import React from 'react';
import PropTypes from 'prop-types';

import componentTypes from '../components/component-types';
import composeValidators from '../components/compose-validators';

const shouldAssignFormOptions = (componentType) => componentTypes.FIELD_ARRAY === componentType;
const assignSpecialType = (componentType) => ([componentTypes.CHECKBOX, componentTypes.RADIO].includes(componentType) ? componentType : undefined);

const FieldWrapper = ({ componentType, validate, component, ...rest }) => {
  const componentProps = {
    type: assignSpecialType(componentType),
    ...rest
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
  return <Component validate={composeValidators(validate)} {...componentProps} />;
};

FieldWrapper.propTypes = {
  componentType: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  dataType: PropTypes.string
};

export default FieldWrapper;
