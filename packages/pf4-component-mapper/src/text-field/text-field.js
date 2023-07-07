import React from 'react';
import FormGroup from '../form-group/form-group';
import { TextInput } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import showError from '../show-error/show-error';

const TextField = (props) => {
  const { label, isRequired, helperText, meta, validateOnMount, description, hideLabel, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } =
    useFieldApi(props);
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <TextInput
        {...input}
        {...showError(meta, validateOnMount)}
        {...rest}
        id={id || input.name}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        readOnly={isReadOnly}
      />
    </FormGroup>
  );
};

TextField.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  FormGroupProps: PropTypes.object,
};

export default TextField;
