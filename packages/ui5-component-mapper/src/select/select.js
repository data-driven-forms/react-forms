import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Select as UI5Select, Option } from '@ui5/webcomponents-react';

import FormGroup from '../form-group';
import convertProps from '../convert-props';
import validationError from '../validation-error';

const Select = (props) => {
  const { input, meta, label, validateOnMount, options, ...rest } = useFieldApi(convertProps(props));

  return (
    <FormGroup label={label}>
      <UI5Select
        {...input}
        onChange={(event) => input.onChange(event.detail.selectedOption.dataset.id)}
        {...rest}
        {...validationError(meta, validateOnMount)}
      >
        {options &&
          options.map((option) => (
            <Option key={option.value} data-id={option.value}>
              {option.label}
            </Option>
          ))}
      </UI5Select>
    </FormGroup>
  );
};

Select.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    })
  ),
};

export default Select;
