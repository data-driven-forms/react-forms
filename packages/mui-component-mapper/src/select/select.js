import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../common/helpers';
import { meta } from '@data-driven-forms/common/prop-types-templates';
import DDFSelect from '@data-driven-forms/common/select';
import parseInternalValue from '@data-driven-forms/common/select/parse-internal-value';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { TextField, CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';

/**
 * Returns label of selected option
 * @param {Object|Array} option currently selected option
 * @param {Array<Object>} options all options avaiable
 * @returns {String}
 */
export const getOptionLabel = (option, options) => {
  if (typeof option === 'undefined') {
    return '';
  }

  if (option === '') {
    return '';
  }

  if (Array.isArray(option) && option.length === 0) {
    return '';
  }

  if (typeof option === 'object') {
    return option.label;
  }

  const item = options.find(({ value }) => value === option);
  return (item && item.label) || '';
};

/**
 * Function that creates correct DDF select value format
 * @param {Object|Array} option currently selected values
 * @param {Boolean} isMulti multiple select flag
 * @returns {Object|Array<Object>}
 */
export const createValue = (option, isMulti) => {
  if (isMulti) {
    return Array.isArray(option) ? option.map((item) => (typeof item === 'object' ? item : { value: item })) : option;
  }

  return option;
};

const InternalSelect = ({
  value,
  options,
  label,
  helperText,
  validateOnMount,
  meta,
  isSearchable,
  description,
  classNamePrefix,
  isMulti,
  placeholder,
  onInputChange,
  isFetching,
  noOptionsMessage,
  hideSelectedOptions,
  closeMenuOnSelect,
  required,
  onChange,
  onFocus,
  onBlur,
  FormFieldGridProps,
  TextFieldProps: { inputProps: textFieldInputProps, ...TextFieldProps },
  inputProps,
  isClearable,
  isDisabled,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  const internalValue = parseInternalValue(value, isMulti);
  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <Autocomplete
        filterSelectedOptions={hideSelectedOptions}
        disabled={isDisabled}
        disableClearable={isClearable}
        popupIcon={isFetching ? <CircularProgress size={20} color="inherit" /> : <ArrowDropDownIcon />}
        fullWidth
        {...rest}
        renderInput={(params) => (
          <TextField
            onFocus={onFocus}
            onBlur={onBlur}
            {...params}
            required={required}
            error={!!invalid}
            helperText={invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description}
            label={label}
            margin="normal"
            {...TextFieldProps}
            inputProps={{
              ...params.inputProps,
              ...textFieldInputProps,
              ...inputProps,
              readOnly: !isSearchable,
              placeholder: !internalValue || internalValue.length === 0 ? placeholder : undefined
            }}
          />
        )}
        noOptionsText={noOptionsMessage()}
        onInputChange={(_event, value) => onInputChange(value)}
        options={options}
        multiple={isMulti}
        getOptionLabel={(option) => getOptionLabel(option, options)}
        value={typeof internalValue === 'undefined' ? null : internalValue}
        onChange={(_event, option) => onChange(createValue(option, isMulti))}
        loading={isFetching}
      />
    </FormFieldGrid>
  );
};

InternalSelect.propTypes = {
  meta,
  placeholder: PropTypes.node,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired })).isRequired,
  description: PropTypes.node,
  FormFieldGridProps: PropTypes.object,
  value: PropTypes.any,
  isClearable: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  isMulti: PropTypes.bool,
  loadingMessage: PropTypes.node,
  onInputChange: PropTypes.func,
  isFetching: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  closeMenuOnSelect: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  hideSelectedOptions: PropTypes.bool,
  required: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  TextFieldProps: PropTypes.object,
  inputProps: PropTypes.object,
  isDisabled: PropTypes.bool
};

InternalSelect.defaultProps = {
  placeholder: 'Please choose',
  FormFieldGridProps: {},
  TextFieldProps: {},
  inputProps: {},
  loadingText: 'Loading...'
};

const Select = (props) => {
  const {
    input,
    isRequired,
    isDisabled,
    isReadOnly,
    disabled,
    multiple,
    isMulti,
    isClearable,
    disableClearable,
    loadingMessage,
    loadingText,
    noOptionsMessage,
    noOptionsText,
    closeMenuOnSelect,
    ...rest
  } = useFieldApi(props);
  return (
    <DDFSelect
      {...input}
      isMulti={multiple || isMulti}
      required={isRequired}
      disabled={isDisabled || isReadOnly || disabled}
      disableClearable={!isClearable || disableClearable}
      loadingText={loadingMessage || loadingText}
      noOptionsMessage={noOptionsMessage || noOptionsText}
      {...rest}
      SelectComponent={InternalSelect}
    />
  );
};

export default Select;
