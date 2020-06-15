import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../common/form-field';

const DatePicker = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    label,
    helperText,
    validateOnMount,
    meta,
    FormFieldGridProps,
    HelperTextProps,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={helperText} HelperTextProps={HelperTextProps} {...FormFieldGridProps}>
      <FormField
        label={label}
        {...input}
        type="date"
        required={isRequired}
        error={
          invalid && {
            content: meta.error
          }
        }
        {...rest}
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
  description: PropTypes.node,
  /** Sub components customization API */
  FormFieldGridProps: PropTypes.object,
  HelperTextProps: PropTypes.object
};

DatePicker.defaultProps = {
  FormFieldGridProps: {},
  HelperTextProps: {}
};

export default DatePicker;
