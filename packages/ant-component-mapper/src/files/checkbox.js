import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { validationError } from '../common/helpers';
import IsRequired from '../common/is-required';
import AntForm from '../common/form-wrapper';

export const SingleCheckbox = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  return (
    <AntForm component="fieldset" invalid={invalid} help={text}>
      <AntCheckbox
        checked={input.checked}
        {...input}
        defaultValue={input.value ? input.value : undefined}
        disabled={isDisabled || isReadOnly}
        value={input.name}
      >
        {isRequired ? <IsRequired>{label}</IsRequired> : label}
      </AntCheckbox>
    </AntForm>
  );
};

SingleCheckbox.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  description: PropTypes.node,
  validateOnMount: PropTypes.bool
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.array
};

export default Checkbox;
