import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'patternfly-react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { childrenPropTypes } from '@data-driven-forms/common/prop-types-templates';

const InputGroupWrapper = ({ inputAddon, children }) => {
  const formOptions = useFormApi();

  return (
    <InputGroup>
      {inputAddon.before && inputAddon.before.fields && formOptions.renderForm(inputAddon.before.fields, formOptions)}
      {children}
      {inputAddon.after && inputAddon.after.fields && formOptions.renderForm(inputAddon.after.fields, formOptions)}
    </InputGroup>
  );
};

InputGroupWrapper.propTypes = {
  inputAddon: PropTypes.shape({
    before: PropTypes.shape({
      fields: PropTypes.array
    }),
    after: PropTypes.shape({
      fields: PropTypes.array
    })
  }),
  children: childrenPropTypes
};

export default InputGroupWrapper;
