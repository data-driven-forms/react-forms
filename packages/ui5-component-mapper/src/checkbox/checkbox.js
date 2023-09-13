import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';

import { CheckBox } from '@ui5/webcomponents-react';

import FormGroup from '../form-group';
import convertProps from '../convert-props';
import validationError from '../validation-error';

const Wrapper = ({ children, ...props }) => <FormGroup label={convertProps(props).label}>{children}</FormGroup>;

Wrapper.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
};

const SingleCheckbox = ({ label, text, ...props }) => {
  const { input, meta, validateOnMount, ...rest } = useFieldApi(convertProps(props));

  return (
    <FormGroup>
      <CheckBox {...input} text={text || label} onChange={undefined} onInput={input.onChange} {...rest} {...validationError(meta, validateOnMount)} />
    </FormGroup>
  );
};

const SingleCheckboxInCommon = ({ label, text, id, ...props }) => <CheckBox {...convertProps(props)} text={text || label} id={id} />;

SingleCheckboxInCommon.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};

const Checkbox = ({ options, ...props }) =>
  options ? (
    <MultipleChoiceListCommon options={options} {...props} Wrapper={Wrapper} Checkbox={SingleCheckboxInCommon} />
  ) : (
    <SingleCheckbox {...props} />
  );

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any })),
};

export default Checkbox;
