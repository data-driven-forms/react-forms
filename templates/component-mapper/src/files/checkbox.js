import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import MultipleChoiceListCommon from '@data-driven-forms/common/src/multiple-choice-list';

const Wrapper = ({ label, children }) => (
  <div>
    <h3>{label}</h3>
    {children}
  </div>
);

Wrapper.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node
};

const SingleCheckbox = (props) => {
  const { input, isDisabled, label, name } = useFieldApi({ ...props, type: 'checkbox' });

  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input {...input} type="checkbox" disabled={isDisabled}/>
    </React.Fragment>
  );
};

const SingleCheckboxInCommon = ({ label, isDisabled, ...props }) => (
  <React.Fragment>
    <label htmlFor={props.name}>{label}</label>
    <input {...props} type="checkbox" disabled={isDisabled} />
  </React.Fragment>
);

SingleCheckboxInCommon.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  isDisabled: PropTypes.bool,
  name: PropTypes.string
};

const Checkbox = ({ options, ...props }) =>
  options ? (
    <MultipleChoiceListCommon options={options} {...props} Wrapper={Wrapper} Checkbox={SingleCheckboxInCommon} />
  ) : (
    <SingleCheckbox {...props} />
  );

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any }))
};

export default Checkbox;
