import React from 'react';
import FormGroup from '../form-group/form-group';
import { TimePicker as PF4TimePicker } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import PropTypes from 'prop-types';

const TimePicker = (props) => {
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
      <PF4TimePicker {...input} time={input.value ? input.value : undefined} {...rest} id={id || input.name} isDisabled={isDisabled || isReadOnly} />
    </FormGroup>
  );
};

TimePicker.propTypes = {
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

export default TimePicker;
