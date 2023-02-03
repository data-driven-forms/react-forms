import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { RadioButton } from '@ui5/webcomponents-react';

import FormGroup from '../form-group';
import convertProps from '../convert-props';
import validationError from '../validation-error';

const SingleRadio = ({ label, text, ...props }) => {
  const { input, ...rest } = useFieldApi({ type: 'radio', ...convertProps(props) });

  return <RadioButton {...input} text={text || label} onChange={undefined} onInput={input.onChange} {...rest} />;
};

const Radio = ({ options, ...props }) => (
  <FormGroup label={convertProps(props).label}>
    {options.map((option) => (
      <SingleRadio key={option.value} {...props} label={option.label} value={option.value} />
    ))}
  </FormGroup>
);

Radio.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default Radio;
