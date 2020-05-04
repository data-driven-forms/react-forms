import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TimePicker = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta, ...rest } = useFieldApi(
    props
  );
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid>
      <label htmlFor={input.name}>{label}</label>
      <input type="time" {...input} />
    </FormFieldGrid>
  );
};

TimePicker.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  locale: PropTypes.string,
  description: PropTypes.node
};

export default TimePicker;
