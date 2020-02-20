import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

const TextField = ({ input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, validateOnMount, meta, ...rest }) => (
  <FormFieldGrid>
    <MuiTextField
      {...input}
      fullWidth
      error={!!validationError(meta, validateOnMount)}
      helperText={helperText}
      disabled={isDisabled}
      label={label}
      placeholder={placeholder}
      required={isRequired}
      inputProps={{
        readOnly: isReadOnly
      }}
      {...rest}
    />
  </FormFieldGrid>
);

TextField.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool
};

export default TextField;
