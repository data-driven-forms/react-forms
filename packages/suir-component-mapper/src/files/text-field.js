import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormFieldGrid from '../common/form-field-grid';
import FormField from '../common/form-field';

const TextField = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, validateOnMount, meta, ...rest } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={helperText}>
      <FormField
        {...rest}
        control={Input}
        label={label}
        required={isRequired}
        disabled={isDisabled}
        readOnly={isReadOnly}
        placeholder={placeholder}
        {...input}
        error={
          invalid && {
            content: meta.error
          }
        }
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
  inputProps: PropTypes.object
};

export default TextField;
