import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TextInput } from 'carbon-components-react';

import IsOptional from '../common/is-optional';
import WithDescription from '../common/with-description';

const TextField = (props) => {
  const { input, meta, isDisabled, isReadOnly, label, labelText, isRequired, optionalText, description, ...rest } = useFieldApi(props);

  const modifiedLabel = description ? <WithDescription description={description} labelText={labelText || label} /> : labelText || label;

  const finalLabel = isRequired ? modifiedLabel : <IsOptional labelText={modifiedLabel} optionalText={optionalText} />;

  const invalid = meta.touched && meta.error;

  return (
    <TextInput
      {...input}
      key={input.name}
      id={input.name}
      labelText={finalLabel}
      disabled={isDisabled}
      readOnly={isReadOnly}
      invalid={Boolean(invalid)}
      invalidText={invalid || ''}
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
  optionalText: PropTypes.node,
  description: PropTypes.node
};

export default TextField;
