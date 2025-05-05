import React from 'react';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../helpers/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../form-field/form-field';

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
    FormFieldGridProps = {},
    HelperTextProps = {},
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelperTextProps={HelperTextProps} {...FormFieldGridProps}>
      <FormField
        label={label}
        {...input}
        type="date"
        required={isRequired}
        error={
          invalid && {
            content: meta.error || meta.submitError,
          }
        }
        {...rest}
        control={(props) => <input {...props} readOnly={isReadOnly} disabled={isDisabled} placeholder={placeholder} />}
      />
    </FormFieldGrid>
  );
};

export default DatePicker;
