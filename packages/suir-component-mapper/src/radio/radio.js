import React from 'react';
import PropTypes from 'prop-types';
import { FormRadio, FormField } from 'semantic-ui-react';
import { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../common/helpers';
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

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.any.isRequired }).isRequired,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool
};

const Radio = ({ name, ...props }) => {
  const {
    options,
    isDisabled,
    label,
    isRequired,
    helperText,
    description,
    isReadOnly,
    meta,
    validateOnMount,
    FormFieldGridProps,
    FormFieldProps,
    HelperTextProps,
    ...rest
  } = useFieldApi({
    ...props,
    name,
    type: 'radio'
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

Radio.propTypes = {
  ...wrapperProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.any,
  description: PropTypes.node,
  /** Sub components customization API */
  FormFieldGridProps: PropTypes.object,
  FormFieldProps: PropTypes.object,
  HelperTextProps: PropTypes.object
};

Radio.defaultProps = {
  options: [],
  FormFieldGridProps: {},
  FormFieldProps: {},
  HelperTextProps: {}
};

export default Radio;
