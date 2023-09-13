import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TimePicker as UI5TimePicker } from '@ui5/webcomponents-react';

import FormGroup from '../form-group';
import convertProps from '../convert-props';
import validationError from '../validation-error';

const TimePicker = (props) => {
  const { input, meta, label, validateOnMount, ...rest } = useFieldApi(convertProps(props));

  return (
    <FormGroup label={label}>
      <UI5TimePicker {...input} onChange={undefined} onInput={input.onChange} {...rest} {...validationError(meta, validateOnMount)} />
    </FormGroup>
  );
};

TimePicker.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
};

export default TimePicker;
