import React from 'react';
import FormGroup from '../common/form-group';
import { TextInput } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import showError from '../common/show-error';

const TextField = (props) => {
  const { label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest } = useFieldApi(props);
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
    >
      <TextInput {...input} {...rest} id={id || input.name} isReadOnly={isReadOnly} isDisabled={isDisabled} {...showError(meta)} />
    </FormGroup>
  );
};

TextField.propTypes = {
  label: PropTypes.node,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

export default TextField;
