import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TextField = (props) => {
  const { input, isDisabled, isReadOnly } = useFieldApi(props);

  return <input {...input} disabled={isDisabled} readOnly={isReadOnly} />;
};

TextField.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool
};

export default TextField;
