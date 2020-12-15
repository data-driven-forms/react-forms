import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TextInput } from 'carbon-components-react';

import prepareProps from './prepare-props';

const TextField = (props) => {
  const { input, meta, validateOnMount, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warn = (meta.touched || validateOnMount) && meta.warning;

  return (
    <TextInput
      {...input}
      key={input.name}
      id={input.name}
      invalid={Boolean(invalid)}
      invalidText={invalid || ''}
      warn={Boolean(warn)}
      warnText={warn || ''}
      {...rest}
    />
  );
};

TextField.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node
};

export default TextField;
