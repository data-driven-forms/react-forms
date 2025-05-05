import React from 'react';
import { Input } from 'semantic-ui-react';

import { validationError, validationWarning } from '../helpers/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormFieldGrid from '../form-field-grid/form-field-grid';
import FormField from '../form-field/form-field';

const TextField = (props) => {
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
    HelpertextProps = {},
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelpertextProps={HelpertextProps} {...FormFieldGridProps}>
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
            content: meta.error || meta.submitError,
          }
        }
      />
    </FormFieldGrid>
  );
};

export default TextField;
