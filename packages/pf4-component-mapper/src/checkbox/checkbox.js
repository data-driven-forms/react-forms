import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceList from './multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import { Checkbox as Pf4Checkbox } from '@patternfly/react-core';
import IsRequired from '../is-required/is-required';

const SingleCheckbox = (props) => {
  const {
    label,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    input,
    isReadOnly,
    isDisabled,
    id,
    FormGroupProps,
    ...rest
  } = useFieldApi(props);
  return (
    <FormGroup
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <Pf4Checkbox
        isChecked={input.checked}
        {...input}
        id={id || input.name}
        label={isRequired ? <IsRequired>{label}</IsRequired> : label}
        aria-label={rest.name}
        {...rest}
        isDisabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

SingleCheckbox.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  FormGroupProps: PropTypes.object
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any }))
};

export default Checkbox;
