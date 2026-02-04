import React from 'react';
import { TextArea as Pf4TextArea, TextAreaProps } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import showError from '../show-error/show-error';
import { BaseFieldProps } from '../types';

export interface TextareaProps extends BaseFieldProps, Omit<TextAreaProps, keyof BaseFieldProps | 'id' | 'isRequired' | 'isDisabled'> {}

const Textarea: React.FC<TextareaProps> = (props) => {
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

// TextareaProps is exported above
