import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../common/form-group';
import DataDrivenSelect from '../common/select/select';

const Select = (props) => {
  const { label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest } = useFieldApi(props);
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
    >
      <DataDrivenSelect {...input} {...rest} isDisabled={isDisabled || isReadOnly} />
    </FormGroup>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  hideLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

export default Select;

export const InternalSelect = DataDrivenSelect;
