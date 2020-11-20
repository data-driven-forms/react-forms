import React from 'react';
import { TextInput } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../common/form-group';
import showError from '../common/show-error';

const DatePicker = (props) => {
  const { label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } = useFieldApi(
    props
  );
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <TextInput {...input} {...showError(meta)} {...rest} type="date" id={id || input.name} isReadOnly={isReadOnly} isDisabled={isDisabled} />
    </FormGroup>
  );
};

DatePicker.propTypes = {
  label: PropTypes.node,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  FormGroupProps: PropTypes.object
};

export default DatePicker;
