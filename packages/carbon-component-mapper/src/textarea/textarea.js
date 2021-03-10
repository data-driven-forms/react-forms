import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TextArea } from 'carbon-components-react';

import prepareProps from '../prepare-props';

const Textarea = (props) => {
  const { input, meta, validateOnMount, helperText, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const text = ((meta.touched || validateOnMount) && meta.warning) || helperText;

  return <TextArea {...input} key={input.name} id={input.name} invalid={Boolean(invalid)} invalidText={invalid || ''} helperText={text} {...rest} />;
};

Textarea.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node,
  helperText: PropTypes.node
};

export default Textarea;
