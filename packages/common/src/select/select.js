/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import useSelect from '../use-select/use-select';
import deepEqual from './deep-equal';

const Select = ({
  invalid = false,
  classNamePrefix,
  simpleValue = true,
  isMulti,
  pluckSingleValue = true,
  options: propsOptions = [],
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
}) => {
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

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  classNamePrefix: PropTypes.string,
  invalid: PropTypes.bool,
  simpleValue: PropTypes.bool,
  isMulti: PropTypes.bool,
  pluckSingleValue: PropTypes.bool,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  loadOptionsChangeCounter: PropTypes.number,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.node,
  loadingProps: PropTypes.object,
  selectVariant: PropTypes.string,
  updatingMessage: PropTypes.node,
  noOptionsMessage: PropTypes.node,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  SelectComponent: PropTypes.elementType.isRequired,
  noValueUpdates: PropTypes.bool,
  optionsTransformer: PropTypes.func,
  compareValues: PropTypes.func,
};

export default Select;
