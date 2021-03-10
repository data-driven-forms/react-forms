import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Toggle } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const Switch = (props) => {
  const { input, meta, onText, offText, validateOnMount, helperText, WrapperProps, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  return (
    <div {...WrapperProps}>
      <Toggle {...input} key={input.name} id={input.name} labelA={offText} labelB={onText} {...rest} />
      <HelperTextBlock helperText={helperText} errorText={invalid} warnText={warnText} />
    </div>
  );
};

Switch.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node,
  WrapperProps: PropTypes.object
};

export default Switch;
