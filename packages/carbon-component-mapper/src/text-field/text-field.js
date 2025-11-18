import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TextInput, NumberInput } from '@carbon/react';

import prepareProps from '../prepare-props';

const TextField = (props) => {
  const { input, meta, validateOnMount, labelText, ...rest } = useFieldApi(prepareProps(props));

  const Component = input.type === 'number' ? NumberInput : TextInput;

  const setValue = (e, state, input) => (input.type === 'number' ? `${state.value}` : e.target.value);

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warn = (meta.touched || validateOnMount) && meta.warning;

  return (
    <Component
      {...input}
      key={input.name}
      id={input.name}
      invalid={Boolean(invalid)}
      invalidText={invalid || ''}
      warn={Boolean(warn)}
      warnText={warn || ''}
      onChange={(e, state) => input.onChange(setValue(e, state, input))}
      {...(input.type === 'number' ? { label: labelText } : { labelText })}
      {...rest}
    />
  );
};

export default TextField;
