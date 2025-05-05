import React from 'react';
import { FormTextArea } from 'semantic-ui-react';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../helpers/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../form-field/form-field';

const Textarea = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
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
        required={isRequired}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...input}
        error={invalid && { content: meta.error || meta.submitError }}
        control={FormTextArea}
        {...rest}
      />
    </FormFieldGrid>
  );
};

export default Textarea;
