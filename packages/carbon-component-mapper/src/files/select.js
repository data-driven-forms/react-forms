import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const Select = (props) => {
  const { input, isDisabled, options } = useFieldApi(props);

  return (
    <select {...input} disabled={isDisabled}>
      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

Select.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node
    })
  )
};

export default Select;
