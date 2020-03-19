import React from 'react';
import PropTypes from 'prop-types';

import { FormControl } from 'patternfly-react';
import FormGroup from '../common/form-wrapper';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const Textarea = (props) => {
  const {
    meta,
    validateOnMount,
    label,
    hideLabel,
    isRequired,
    helperText,
    description,
    input,
    placeholder,
    isDisabled,
    isReadOnly,
    inputAddon,
    ...rest
  } = useFieldApi(props);
  return (
    <FormGroup
      meta={meta}
      validateOnMount={validateOnMount}
      label={label}
      hideLabel={hideLabel}
      isRequired={isRequired}
      helperText={helperText}
      description={description}
      inputAddon={inputAddon}
    >
      <FormControl {...input} disabled={isDisabled} readOnly={isReadOnly} {...rest} componentClass="textarea" placeholder={placeholder} />
    </FormGroup>
  );
};

Textarea.propTypes = {
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  inputAddon: PropTypes.shape({ fields: PropTypes.array })
};

export default Textarea;
