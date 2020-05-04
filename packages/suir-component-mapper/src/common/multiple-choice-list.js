import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import { validationError } from './helpers';
import { Form, Header } from 'semantic-ui-react';

const CheckboxContext = createContext({});

const FinalCheckbox = ({ label, isDisabled: _isDisabled, ...rest }) => {
  const {
    props: { isRequired, isReadOnly, helperText, validate, isDisabled, ...props }
  } = useContext(CheckboxContext);
  return <Form.Checkbox {...rest} {...props} disabled={isDisabled} label={label} />;
};

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <div>
      <Header>{label}</Header>
      <div>{children}</div>
    </div>
  );
};

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = ({ ...props }) => (
  <CheckboxContext.Provider value={{ props }}>
    <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
  </CheckboxContext.Provider>
);

MultipleChoiceList.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

export default MultipleChoiceList;
