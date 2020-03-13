import React from 'react';
import PropTypes from 'prop-types';
import { FormSpy } from 'react-final-form';

import { components, dataTypes } from '../constants';
import FieldProvider from './field-provider';
import { FieldArray } from 'react-final-form-arrays';
import { shouldWrapInField, composeValidators } from './helpers';
import convertInitialValue from './convert-initial-value';

const shouldAssignFormOptions = componentType => components.FIELD_ARRAY === componentType;
const assignSpecialType = componentType => [ components.CHECKBOX, components.RADIO ].includes(componentType) ? componentType : undefined;

const FieldWrapper = ({ componentType, validate, component, ...rest }) => {
  const props = rest;

  if (Object.prototype.hasOwnProperty.call(rest, 'initialValue') && Object.prototype.hasOwnProperty.call(rest, 'dataType')) {
    props.initialValue = convertInitialValue(rest.initialValue, rest.dataType);
  }

  const componentProps = {
    type: assignSpecialType(componentType),
    FieldProvider,
    FieldArrayProvider: FieldArray,
    ...props,
    component,
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
  return shouldWrapInField(componentType)
    ? <FieldProvider { ...componentProps } />
    : (
      <Component
        validate={ composeValidators(validate) }
        { ...props }
        FieldProvider={ FieldProvider }
        FormSpyProvider={ FormSpy }
      />);
};

FieldWrapper.propTypes = {
  componentType: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  initialValue: PropTypes.any,
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  dataType: PropTypes.oneOf(dataTypes),
};

export default FieldWrapper;
