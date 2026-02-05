/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { AnyObject } from "@data-driven-forms/react-form-renderer";

import clsx from 'clsx';
import useSelect from '../use-select/use-select';
import deepEqual from './deep-equal';
import { SelectOption, OptionValue, SelectValue, FlatSelectOption } from '../types/shared-types';

export interface SelectProps<T = OptionValue> {
  options?: SelectOption<T>[];
  onChange?: (value?: SelectValue<T>) => void;
  classNamePrefix?: string;
  invalid?: boolean;
  simpleValue?: boolean;
  isMulti?: boolean;
  pluckSingleValue?: boolean;
  value?: SelectValue<T>;
  placeholder?: string;
  loadOptionsChangeCounter?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  loadOptions?: (inputValue?: string) => Promise<SelectOption<T>[]>;
  loadingMessage?: React.ReactNode;
  loadingProps?: AnyObject;
  selectVariant?: string;
  updatingMessage?: React.ReactNode;
  noOptionsMessage?: React.ReactNode;
  noResultsMessage?: React.ReactNode;
  isSearchable?: boolean;
  isClearable?: boolean;
  SelectComponent?: React.ComponentType<AnyObject>;
  noValueUpdates?: boolean;
  optionsTransformer?: (options: AnyObject[]) => FlatSelectOption<T>[];
  compareValues?: (valueA: T, valueB: T) => boolean;
  menuIsPortal?: boolean;
  menuPortalTarget?: Element;
  showMoreLabel?: string;
  showLessLabel?: string;
  // Allow any additional props to be passed through to SelectComponent
  // Different mappers may need different props for their SelectComponent implementations
  [key: string]: any;
}

const Select = <T extends OptionValue = OptionValue>({
  invalid = false,
  classNamePrefix,
  simpleValue = true,
  isMulti,
  pluckSingleValue = true,
  options: propsOptions,
  loadOptions,
  loadingMessage,
  placeholder = 'Choose...',
  loadingProps,
  selectVariant,
  updatingMessage,
  noOptionsMessage,
  value,
  onChange,
  loadOptionsChangeCounter,
  SelectComponent,
  noValueUpdates,
  optionsTransformer,
  compareValues = deepEqual,
  isSearchable = false,
  isClearable = false,
  ...props
}: SelectProps<T>) => {
  const {
    state,
    value: selectValue,
    onChange: selectOnChange,
    onInputChange,
    isFetching,
  } = useSelect({
    loadOptions,
    optionsTransformer,
    options: propsOptions,
    noValueUpdates,
    onChange,
    value,
    loadOptionsChangeCounter,
    isSearchable,
    pluckSingleValue,
    isMulti,
    simpleValue,
    compareValues,
  });

  const renderNoOptionsMessage = () => (Object.values(state.promises).some((value) => value) ? () => updatingMessage : () => noOptionsMessage);
  // When isMulti is true, the "getSelect" always creates new value array, we need to memoize it to not create new array instance
  // Memo is required to fix https://github.com/data-driven-forms/react-forms/issues/1366
  // Keeping prev values in ref and calling lodash.isEqual is not reliable as it ca return false positive beucase it only has true/false result.
  // If we have multiple updates during one reconciliation pahse the search input reset will trigger on initial key stroke
  // JSON.stringify is expensive but seems to be working better.
  const selectValueInternal = useMemo(() => selectValue, [JSON.stringify(selectValue)]);

  if (!SelectComponent) {
    return null;
  }

  if (state.isLoading) {
    return (
      <SelectComponent
        isClearable={isClearable}
        isSearchable={isSearchable}
        {...props}
        classNamePrefix={classNamePrefix}
        isDisabled={true}
        isFetching={true}
        placeholder={placeholder}
        loadingMessage={loadingMessage}
        options={state.options}
        onChange={() => {}}
        onInputChange={onInputChange}
        value={selectValueInternal}
        isMulti={isMulti}
        {...loadingProps}
        noOptionsMessage={renderNoOptionsMessage()}
        {...(state.originalOptions && { originalOptions: state.originalOptions })}
      />
    );
  }

  return (
    <SelectComponent
      className={clsx(classNamePrefix, {
        'has-error': invalid,
      })}
      {...props}
      isSearchable={isSearchable}
      isClearable={isClearable}
      placeholder={placeholder}
      isDisabled={props.isDisabled || props.isReadOnly}
      options={state.options}
      classNamePrefix={classNamePrefix}
      isMulti={isMulti}
      value={selectValueInternal}
      onChange={selectOnChange}
      onInputChange={onInputChange}
      isFetching={isFetching}
      noOptionsMessage={renderNoOptionsMessage()}
      hideSelectedOptions={false}
      closeMenuOnSelect={!isMulti}
      {...(state.originalOptions && { originalOptions: state.originalOptions })}
    />
  );
};

export default Select;
