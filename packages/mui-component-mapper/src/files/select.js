import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import MUISelect from './select/integration-select';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const Select = (props) => {
  const { input, placeholder, label, helperText, validateOnMount, meta, isSearchable, description, ...rest } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid>
      <MUISelect
        fullWidth
        {...input}
        isSearchable={!!isSearchable}
        isClearable={false}
        invalid={invalid}
        textFieldProps={{
          label,
          InputLabelProps: {
            shrink: true
          }
        }}
        input={input}
        label={label}
        helperText={invalid || helperText || description}
        {...rest}
      />
    </FormFieldGrid>
  );
};

Select.propTypes = {
  input,
  meta,
  placeholder: PropTypes.node,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired })).isRequired,
  description: PropTypes.node
};

Select.defaultProps = {
  placeholder: 'Please choose',
  noOptionsMessage: 'No option found'
};

export default Select;

export const InternalSelect = MUISelect;
