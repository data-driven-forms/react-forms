import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group';
import { Slider as PF4Slider } from '@patternfly/react-core';

const Slider = (props) => {
  const { label, isRequired, helperText, meta, validateOnMount, description, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } =
    useFieldApi(props);

  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <PF4Slider onChange={input.onChange} value={input.value} inputValue={input.value} isDisabled={isDisabled || isReadOnly} {...rest} />
    </FormGroup>
  );
};

Slider.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  FormGroupProps: PropTypes.object,
};

export default Slider;
