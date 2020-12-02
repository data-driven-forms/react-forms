import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
import MultipleChoiceList from '../multiple-choice-list/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import IsRequired from '../is-required';
import FormGroup from '../form-group';

export const SingleCheckbox = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, FormItemProps, ...rest } = useFieldApi({
    ...props,
    type: 'checkbox'
  });

  return (
    <FormGroup
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
      hideLabel
    >
      <AntCheckbox
        checked={input.checked}
        {...input}
        defaultValue={input.value ? input.value : undefined}
        disabled={isDisabled || isReadOnly}
        value={input.name}
        {...rest}
      >
        {isRequired ? <IsRequired>{label}</IsRequired> : label}
      </AntCheckbox>
    </FormGroup>
  );
};

SingleCheckbox.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  description: PropTypes.node,
  validateOnMount: PropTypes.bool,
  FormItemProps: PropTypes.object
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.array
};

export default Checkbox;
