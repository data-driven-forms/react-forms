import React from 'react';
import PropTypes from 'prop-types';

import AntForm from '../common/form-wrapper';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { Select as AntSelect } from 'antd';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const selectValue = (option) => option.sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })).map((item) => item.value);

const { Option } = AntSelect;

const Select = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    isClearable,
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
    <AntForm layout="vertical" label={label} isRequired={isRequired} invalid={invalid} help={invalid || helperText || description}>
      <AntSelect
        placeholder={placeholder || 'Please choose'}
        // value={options.filter(({ value }) => (rest.isMulti ? input.value.includes(value) : value === input.value))}
        {...input}
        mode={rest.isMulti ? 'tags' : ''}
        showSearch={!!isSearchable}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        required={isRequired}
        allowClear={isClearable}
        notFoundContent="No option found"
        invalid={invalid}
        disabled={isDisabled || isReadOnly}
        onChange={(value, option) => input.onChange(rest.isMulti ? selectValue(option) : option ? option.value : undefined)}
        input={input}
        {...rest}
      >
        {options
          .filter((option) => Object.prototype.hasOwnProperty.call(option, 'value') && option.value !== null)
          .map(({ value, label }) => (
            <Option key={value} value={value} label={label}>
              {label}
            </Option>
          ))}
      </AntSelect>
    </AntForm>
  );
};

Select.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isClearable: PropTypes.bool,
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
