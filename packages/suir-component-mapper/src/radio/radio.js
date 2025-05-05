import React from 'react';
import { FormRadio, FormField } from 'semantic-ui-react';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../helpers/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const RadioOption = ({ name, option, isDisabled, isReadOnly, ...props }) => {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });
  return (
    <FormRadio
      {...input}
      disabled={isDisabled}
      onChange={(_event, data) => {
        input.onChange({ target: data, type: 'radio' });
      }}
      {...props}
      label={option.label}
    />
  );
};

const Radio = ({ name, ...props }) => {
  const {
    options = [],
    isDisabled,
    label,
    isRequired,
    helperText,
    description,
    isReadOnly,
    meta,
    validateOnMount,
    FormFieldGridProps = {},
    FormFieldProps = {},
    HelperTextProps = {},
    ...rest
  } = useFieldApi({
    ...props,
    name,
    type: 'radio',
  });
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelperTextProps={HelperTextProps} {...FormFieldGridProps}>
      <FormField
        {...FormFieldProps}
        disabled={isDisabled}
        required={isRequired}
        error={invalid && { content: meta.error || meta.submitError }}
        label={label}
      />
      {options.map((option) => (
        <RadioOption key={option.value} name={name} option={option} isDisabled={isDisabled} isReadOnly={isReadOnly} {...rest} />
      ))}
    </FormFieldGrid>
  );
};

export default Radio;
