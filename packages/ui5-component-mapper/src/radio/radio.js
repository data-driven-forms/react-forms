import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const SingleRadio = (props) => {
  const { label, input, isDisabled } = useFieldApi({ type: 'radio', ...props });

  const id = `${input.name}-${input.value}`;

  return (
    <div key={id}>
      <input {...input} id={id} disabled={isDisabled} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const Radio = ({ label, options, ...props }) => (
  <div>
    <p>{label}</p>
    {options.map((option) => (
      <SingleRadio key={option.value} {...props} label={option.label} value={option.value} />
    ))}
  </div>
);

Radio.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

export default Radio;
