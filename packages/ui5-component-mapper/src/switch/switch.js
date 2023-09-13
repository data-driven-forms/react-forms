import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Switch as UI5Switch } from '@ui5/webcomponents-react';

import FormGroup from '../form-group';
import convertProps from '../convert-props';
import validationError from '../validation-error';

const Switch = (props) => {
  const { input, meta, label, validateOnMount, ...rest } = useFieldApi(convertProps(props));

  return (
    <FormGroup label={label}>
      <UI5Switch {...input} onChange={undefined} onInput={input.onChange} {...rest} {...validationError(meta, validateOnMount)} />
    </FormGroup>
  );
};

export default Switch;
