import React from 'react';
import { TextArea as Pf4TextArea } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import PropTypes from 'prop-types';
import FormGroup from '../form-group/form-group';
import showError from '../common/show-error';

const Textarea = (props) => {
  const {
    label,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    hideLabel,
    input,
    isReadOnly,
    isDisabled,
    id,
    FormGroupProps,
    ...rest
  } = useFieldApi(props);
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
      <Pf4TextArea {...showError(meta, validateOnMount)} disabled={isDisabled || isReadOnly} {...input} id={id || input.name} {...rest} />
    </FormGroup>
  );
};

Textarea.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  FormGroupProps: PropTypes.object
};

export default Textarea;
