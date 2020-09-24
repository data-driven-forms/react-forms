import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Toggle } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';
import HelperTextBlock from '../common/helper-text-block';

const Switch = (props) => {
  const { input, meta, onText, offText, validateOnMount, helperText, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && meta.error;

  return (
    <div>
      <Toggle {...input} key={input.name} id={input.name} labelA={offText} labelB={onText} {...rest} />
      <HelperTextBlock helperText={helperText} errorText={invalid} />
    </div>
  );
};

Switch.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node
};

export default Switch;
