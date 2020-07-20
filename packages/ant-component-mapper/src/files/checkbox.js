import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import IsRequired from '../common/is-required';
import AntForm from '../common/form-wrapper';

export const SingleCheckbox = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, FormItemProps, ...rest } = useFieldApi({
    ...props,
    type: 'checkbox'
  });

  return (
    <AntForm
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
    </AntForm>
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
