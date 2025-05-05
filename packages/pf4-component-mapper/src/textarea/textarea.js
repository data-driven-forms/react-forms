import React from 'react';
import { TextArea as Pf4TextArea } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import showError from '../show-error/show-error';

const Textarea = (props) => {
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
      <Pf4TextArea
        {...showError(meta, validateOnMount)}
        isRequired={isRequired}
        isDisabled={isDisabled || isReadOnly}
        {...input}
        id={id || input.name}
        {...rest}
      />
    </FormGroup>
  );
};

export default Textarea;
