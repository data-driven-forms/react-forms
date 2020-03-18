import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import MUISelect from './select/integration-select';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const selectValue = (option) => option.sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })).map((item) => item.value);

const Select = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    label,
    helperText,
    validateOnMount,
    meta,
    options,
    isSearchable,
    description,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid>
      <MUISelect
        fullWidth
        {...input}
        options={options.filter((option) => Object.prototype.hasOwnProperty.call(option, 'value') && option.value !== null)}
        placeholder={placeholder || 'Please choose'}
        value={options.filter(({ value }) => (rest.isMulti ? input.value.includes(value) : value === input.value))}
        isMulti={rest.isMulti}
        isSearchable={!!isSearchable}
        isClearable={false}
        hideSelectedOptions={false}
        closeMenuOnSelect={!rest.isMulti}
        noOptionsMessage={() => 'No option found'}
        invalid={invalid}
        isDisabled={isDisabled}
        textFieldProps={{
          label,
          color: invalid ? 'red' : 'blue',
          InputLabelProps: {
            shrink: true
          }
        }}
        onChange={(option) => input.onChange(rest.isMulti ? selectValue(option) : option ? option.value : undefined)}
        input={input}
        label={label}
        isRequired={isRequired}
        helperText={invalid || helperText || description}
        {...rest}
      />
    </FormFieldGrid>
  );
};

Select.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired })).isRequired,
  description: PropTypes.node
};

export default Select;
