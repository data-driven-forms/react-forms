import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'patternfly-react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

export const InputAddonButtonGroup = ({ fields }) => {
  const formOptions = useFormApi();

  return <InputGroup.Button>{formOptions.renderForm(fields, formOptions)}</InputGroup.Button>;
};

InputAddonButtonGroup.propTypes = {
  fields: PropTypes.array.isRequired
};

export const InputAddonGroup = ({ fields }) => {
  const formOptions = useFormApi();
  return <InputGroup.Addon>{formOptions.renderForm(fields, formOptions)}</InputGroup.Addon>;
};

InputAddonGroup.propTypes = {
  fields: PropTypes.array.isRequired
};

export default {
  InputAddonGroup,
  InputAddonButtonGroup
};
