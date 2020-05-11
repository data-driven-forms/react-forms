import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Form } from 'semantic-ui-react';

const DatePicker = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, validateOnMount, meta } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={helperText}>
      <Form.Field
        label={label}
        {...input}
        type="date"
        required={isRequired}
        error={
          invalid && {
            content: meta.error
          }
        }
        control={(props) => <input {...props} readOnly={isReadOnly} disabled={isDisabled} placeholder={placeholder} />}
      />
    </FormFieldGrid>
  );
};

DatePicker.propTypes = {
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

export default DatePicker;
