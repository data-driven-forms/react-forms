import React from 'react';
import { Input /* Typography */ } from 'antd';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group';

const TextField = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta, FormItemProps, ...rest } =
    useFieldApi(props);

  return (
    <FormGroup
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
      input={input}
    >
      <Input
        {...input}
        defaultValue={input.value ? input.value : undefined}
        disabled={isDisabled}
        readOnly={isReadOnly}
        placeholder={placeholder}
        id={input.name}
        {...rest}
      />
    </FormGroup>
  );
};

export default TextField;
