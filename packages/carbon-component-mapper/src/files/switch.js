import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Toggle } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';

const Switch = (props) => {
  const { input, meta, onText, offText, ...rest } = useFieldApi(prepareProps(props));

  return <Toggle {...input} key={input.name} id={input.name} labelA={offText} labelB={onText} {...rest} />;
};

Switch.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  optionalText: PropTypes.node,
  description: PropTypes.node
};

export default Switch;
