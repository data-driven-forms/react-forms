import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Toggle } from 'carbon-components-react';

import WithDescription from '../common/with-description';

const Switch = (props) => {
  const {
    input,
    meta,
    isDisabled,
    isReadOnly,
    label,
    labelText,
    isRequired,
    optionalText,
    description,
    helperText,
    onText,
    offText,
    ...rest
  } = useFieldApi(props);

  const modifiedLabel = description ? <WithDescription description={description} labelText={labelText || label} /> : labelText || label;

  return (
    <Toggle {...input} key={input.name} id={input.name} labelText={modifiedLabel} disabled={isDisabled} labelA={offText} labelB={onText} {...rest} />
  );
};

Switch.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  optionalText: PropTypes.node,
  description: PropTypes.node
};

export default Switch;
