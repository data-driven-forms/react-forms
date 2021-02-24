import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import DataDrivenSelect from './select/select';

const Select = (props) => {
  const {
    label,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    hideLabel,
    input,
    isReadOnly,
    isDisabled,
    id,
    FormGroupProps,
    ...rest
  } = useFieldApi(props);
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <DataDrivenSelect {...input} {...rest} isDisabled={isDisabled || isReadOnly} />
    </FormGroup>
  );
};

Select.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  FormGroupProps: PropTypes.object
};

export default Select;

export const InternalSelect = DataDrivenSelect;
