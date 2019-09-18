import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'patternfly-react';

export const InputAddonButtonGroup = ({ fields, formOptions }) => (
  <InputGroup.Button>
    { formOptions.renderForm(fields, formOptions) }
  </InputGroup.Button>
);

InputAddonButtonGroup.propTypes = {
  formOptions: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
};

export const InputAddonGroup = ({ fields, formOptions }) => (
  <InputGroup.Addon>
    { formOptions.renderForm(fields, formOptions) }
  </InputGroup.Addon>
);

InputAddonGroup.propTypes = {
  formOptions: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
};

export default {
  InputAddonGroup,
  InputAddonButtonGroup,
};
