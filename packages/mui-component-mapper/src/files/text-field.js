import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@material-ui/core';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TextField = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    inputProps,
    FormFieldGridProps,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <MuiTextField
        {...input}
        fullWidth
        error={!!invalid}
        helperText={invalid || helperText || description}
        disabled={isDisabled}
        label={label}
        placeholder={placeholder}
        required={isRequired}
        inputProps={{
          readOnly: isReadOnly,
          ...inputProps
        }}
        {...rest}
      />
    </FormFieldGrid>
  );
};

TextField.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node,
  inputProps: PropTypes.object,
  FormFieldGridProps: PropTypes.object
};

export default TextField;
