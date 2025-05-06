import React, { useState, useEffect } from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import DataDrivenSelect from '@data-driven-forms/common/select';
import fnToString from '@data-driven-forms/common/utils/fn-to-string';

import { Select as CarbonSelect, MultiSelect, SelectItem, ComboBox, SelectItemGroup } from 'carbon-components-react';
import prepareProps from '../prepare-props';

const onChangeWrapper =
  (onChange) =>
  ({ selectedItem, selectedItems }) =>
    onChange(selectedItems || selectedItem);

export const getMultiValue = (value, options) =>
  (Array.isArray(value) ? value : value ? [value] : []).map((item) =>
    typeof item === 'object' ? item : options.find(({ value }) => value === item)
  );

const renderOptions = (options) =>
  options.map((option, index) => {
    const { options, ...rest } = option;

    if (options) {
      return (
        <SelectItemGroup key={rest.value || index} text={rest.label} {...rest}>
          {renderOptions(options)}
        </SelectItemGroup>
      );
    }

    return <SelectItem key={rest.value || index} text={rest.label} {...rest} />;
  });

const ClearedMultiSelectFilterable = ({
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options,
  isFetching,
  invalid,
  isMulti,
  classNamePrefix,
  closeMenuOnSelect,
  onChange,
  originalOnChange,
  carbonLabel,
  placeholder,
  isDisabled,
  ...rest
}) => (
  <MultiSelect.Filterable
    disabled={isDisabled}
    {...rest}
    placeholder={carbonLabel || placeholder}
    onChange={onChangeWrapper(onChange)}
    titleText={rest.labelText}
    id={rest.name}
    invalid={Boolean(invalidText)}
    invalidText={invalidText}
    items={options}
    initialSelectedItems={getMultiValue(rest.value, options)}
  />
);

const ClearedMultiSelect = ({
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options,
  isFetching,
  invalid,
  isMulti,
  classNamePrefix,
  closeMenuOnSelect,
  onChange,
  originalOnChange,
  carbonLabel,
  placeholder,
  isDisabled,
  ...rest
}) => (
  <MultiSelect
    disabled={isDisabled}
    {...rest}
    label={carbonLabel || placeholder}
    onChange={onChangeWrapper(onChange)}
    titleText={rest.labelText}
    id={rest.name}
    invalid={Boolean(invalidText)}
    invalidText={invalidText}
    items={options}
    initialSelectedItems={getMultiValue(rest.value, options)}
  />
);

const getSelectValue = (value, isMulti) => (isMulti ? value : Array.isArray(value) ? value[0] : value);

const ClearedSelect = ({
  isSearchable,
  isClearable,
  isDisabled,
  isMulti,
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options,
  isFetching,
  invalid,
  classNamePrefix,
  closeMenuOnSelect,
  originalOnChange,
  placeholder,
  value,
  ...rest
}) => (
  <CarbonSelect
    value={getSelectValue(value, isMulti)}
    disabled={isFetching}
    {...rest}
    id={rest.name}
    invalid={Boolean(invalidText)}
    invalidText={invalidText}
  >
    {isFetching && <SelectItem text={placeholder} value={''} />}
    {renderOptions(options)}
  </CarbonSelect>
);

const getComboInitialValue = (value, options = []) => {
  const result = Array.isArray(value) ? value[0] : value;
  return typeof result === 'object' ? result : options.find(({ value }) => value === result) || result;
};

/**
 * Combobox cannot be multi value
 */
const ClearedSelectSearchable = ({
  isSearchable,
  isClearable,
  isDisabled,
  isMulti,
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options = [],
  isFetching,
  invalid,
  classNamePrefix,
  closeMenuOnSelect,
  originalOnChange,
  placeholder,
  labelText,
  onChange,
  value,
  ...rest
}) => (
  <ComboBox
    disabled={isFetching}
    {...rest}
    id={rest.name}
    invalid={Boolean(invalidText)}
    invalidText={invalidText}
    initialSelectedItem={getComboInitialValue(value, options)}
    items={options}
    placeholder={placeholder}
    titleText={labelText}
    onChange={onChangeWrapper(onChange)}
  />
);

const Select = (props) => {
  const {
    isMulti,
    isSearchable,
    isClearable,
    loadOptions,
    input,
    meta,
    validateOnMount,
    helperText,
    loadingMessage = 'Loading...',
    ...rest
  } = useFieldApi(prepareProps(props));

  const [loadOptionsChangeCounter, setCounter] = useState(0);

  const loadOptionsStr = fnToString(loadOptions);

  useEffect(() => {
    setCounter(loadOptionsChangeCounter + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadOptionsStr]);
  const isSearchClear = isSearchable || isClearable;

  let Component = ClearedSelect;

  if (isMulti && isSearchClear) {
    Component = ClearedMultiSelectFilterable;
  } else if (isMulti) {
    Component = ClearedMultiSelect;
  } else if (isSearchClear) {
    Component = ClearedSelectSearchable;
  }

  const invalidText = ((meta.touched || validateOnMount) && (meta.error || meta.submitError)) || '';
  const text = ((meta.touched || validateOnMount) && meta.warning) || helperText;

  return (
    <DataDrivenSelect
      SelectComponent={Component}
      simpleValue={false}
      loadingMessage={loadingMessage}
      {...rest}
      {...input}
      isMulti={isMulti}
      loadOptions={loadOptions}
      invalidText={invalidText}
      loadOptionsChangeCounter={loadOptionsChangeCounter}
      helperText={text}
    />
  );
};

export default Select;
