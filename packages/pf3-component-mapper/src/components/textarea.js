import React from 'react';
import PropTypes from 'prop-types';

import FormControl from 'patternfly-react/dist/js/components/Form/FormControl';
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
  isDisabled: PropTypes.bool
};

export default Textarea;
