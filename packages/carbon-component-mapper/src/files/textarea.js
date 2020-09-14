import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TextArea } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';

const Textarea = (props) => {
  const { input, meta, ...rest } = useFieldApi(prepareProps(props));

  const invalid = meta.touched && meta.error;

  return <TextArea {...input} key={input.name} id={input.name} invalid={Boolean(invalid)} invalidText={invalid || ''} {...rest} />;
};

Textarea.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node
};

export default Textarea;
