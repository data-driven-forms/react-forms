import React from 'react';
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

export default Slider;
