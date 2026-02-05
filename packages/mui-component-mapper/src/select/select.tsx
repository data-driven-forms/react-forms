import React, { useMemo } from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';
import DDFSelect from '@data-driven-forms/common/select';
import parseInternalValue from '@data-driven-forms/common/select/parse-internal-value';
import type { SelectOption, OptionValue, SelectValue } from '@data-driven-forms/common';
import { TextField, CircularProgress } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Autocomplete } from '@mui/material';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

export interface SelectProps<T = OptionValue> extends BaseFieldProps {
  options?: SelectOption<T>[];
  loadOptions?: (inputValue: string) => Promise<SelectOption<T>[]>;
  isSearchable?: boolean;
  isMulti?: boolean;
  multiple?: boolean;
  isClearable?: boolean;
  disableClearable?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  isFetching?: boolean;
  noOptionsMessage?: () => string;
  noOptionsText?: () => string;
  loadingMessage?: string;
  loadingText?: string;
  placeholder?: string;
  FormFieldGridProps?: Record<string, any>;
  TextFieldProps?: {
    inputProps?: Record<string, any>;
    [key: string]: any;
  };
  inputProps?: Record<string, any>;
  classNamePrefix?: string;
  onInputChange?: (value: string) => void;
  // Allow additional Autocomplete props
  [key: string]: any;
}

/**
 * Returns label of selected option
 * @param {Object|Array} option currently selected option
 * @param {Array<Object>} options all options available
 * @returns {String}
 */
export function getOptionLabel<T = OptionValue>(option: T | SelectOption<T> | undefined, options: SelectOption<T>[]): string {
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
    return String((option as SelectOption<T>).label);
  }

  const item = options.find(({ value }) => value === option);
  return (item && String(item.label)) || '';
}

/**
 * Function that creates correct DDF select value format
 * @param {Object|Array} option currently selected values
 * @param {Boolean} isMulti multiple select flag
 * @returns {Object|Array<Object>}
 */
export function createValue<T = OptionValue>(
  option: T | SelectOption<T> | (T | SelectOption<T>)[] | null,
  isMulti: boolean
): T | SelectOption<T> | (T | SelectOption<T>)[] | undefined {
  if (isMulti) {
    return Array.isArray(option) ? option.map((item) => (typeof item === 'object' ? item : ({ value: item } as SelectOption<T>))) : option;
  }

  return option;
}

interface InternalSelectProps<T = OptionValue> {
  value: SelectValue<T>;
  options: SelectOption<T>[];
  label?: string;
  helperText?: string;
  validateOnMount?: boolean;
  meta: ExtendedFieldMeta;
  isSearchable?: boolean;
  description?: string;
  classNamePrefix?: string;
  isMulti?: boolean;
  placeholder?: string;
  onInputChange?: (value: string) => void;
  isFetching?: boolean;
  noOptionsMessage?: () => string;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  required?: boolean;
  onChange: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  FormFieldGridProps?: Record<string, any>;
  TextFieldProps?: {
    inputProps?: Record<string, any>;
    [key: string]: any;
  };
  inputProps?: Record<string, any>;
  isClearable?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  [key: string]: any;
}

function InternalSelect<T = OptionValue>({
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
  placeholder = 'Please choose',
  onInputChange,
  isFetching,
  noOptionsMessage,
  hideSelectedOptions,
  closeMenuOnSelect,
  required,
  onChange,
  onFocus,
  onBlur,
  FormFieldGridProps = {},
  TextFieldProps: { inputProps: textFieldInputProps, ...TextFieldProps } = {},
  inputProps = {},
  isClearable,
  isDisabled,
  loadingText = 'Loading...',
  ...rest
}: InternalSelectProps<T>) {
  const invalid = validationError(meta, validateOnMount);
  // When isMulti is true, the "parseInternalValue" always creates new value array, we need to memoize it to not create new array instance
  // Memo is required to fix https://github.com/data-driven-forms/react-forms/issues/1366
  const internalValue = useMemo(() => parseInternalValue(value, isMulti), [value, isMulti]);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <Autocomplete
        filterSelectedOptions={hideSelectedOptions}
        disabled={isDisabled}
        disableClearable={isClearable}
        popupIcon={isFetching ? <CircularProgress size={20} color="inherit" /> : <ArrowDropDownIcon />}
        fullWidth
        loadingText={loadingText}
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
              placeholder: !internalValue || (internalValue as any).length === 0 ? placeholder : undefined,
            }}
          />
        )}
        noOptionsText={noOptionsMessage && noOptionsMessage()}
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
}

function Select<T = OptionValue>(props: SelectProps<T>) {
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
}

export default Select;
