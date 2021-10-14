/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import fnToString from '../utils/fn-to-string';
import reducer, { init } from './reducer';
import useIsMounted from '../hooks/use-is-mounted';

const getSelectValue = (stateValue, simpleValue, isMulti, allOptions) => {
  let enhancedValue = stateValue;

  let hasSelectAll = isMulti && allOptions.find(({ selectAll }) => selectAll);
  let hasSelectNone = isMulti && allOptions.find(({ selectNone }) => selectNone);

  if (hasSelectAll || hasSelectNone) {
    enhancedValue = enhancedValue || [];
    const optionsLength = allOptions.filter(
      ({ selectAll, selectNone, divider, options }) => !selectAll && !selectNone && !divider && !options
    ).length;

    const selectedAll = optionsLength === enhancedValue.length;
    const selectedNone = enhancedValue.length === 0;

    enhancedValue = [
      ...enhancedValue,
      ...(hasSelectAll && selectedAll ? [simpleValue ? hasSelectAll.value : hasSelectAll] : []),
      ...(hasSelectNone && selectedNone ? [simpleValue ? hasSelectNone.value : hasSelectNone] : []),
    ];
  }

  return simpleValue ? allOptions.filter(({ value }) => (isMulti ? enhancedValue.includes(value) : isEqual(value, enhancedValue))) : enhancedValue;
};

const handleSelectChange = (option, simpleValue, isMulti, onChange, allOptions, removeSelectAll, removeSelectNone) => {
  let enhanceOption = option;

  if (removeSelectNone) {
    enhanceOption = enhanceOption.filter(({ selectNone }) => !selectNone);
  } else if (removeSelectAll) {
    enhanceOption = enhanceOption.filter(({ selectAll }) => !selectAll);
  }

  const sanitizedOption = !enhanceOption && isMulti ? [] : enhanceOption;

  if (isMulti && sanitizedOption.find(({ selectAll }) => selectAll)) {
    return onChange(allOptions.filter(({ selectAll, selectNone, value }) => !selectAll && !selectNone && value).map(({ value }) => value));
  }

  if (isMulti && sanitizedOption.find(({ selectNone }) => selectNone)) {
    return onChange([]);
  }

  return simpleValue
    ? onChange(isMulti ? sanitizedOption.map((item) => item.value) : sanitizedOption ? sanitizedOption.value : undefined)
    : onChange(sanitizedOption);
};

const Select = ({
  invalid,
  classNamePrefix,
  simpleValue,
  isMulti,
  pluckSingleValue,
  options: propsOptions,
  loadOptions,
  loadingMessage,
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
  ...props
}) => {
  const [state, originalDispatch] = useReducer(reducer, { optionsTransformer, propsOptions }, init);
  const dispatch = (action) => originalDispatch({ ...action, optionsTransformer });

  const isMounted = useIsMounted();

  const updateOptions = () => {
    dispatch({ type: 'startLoading' });

    return loadOptions().then((data) => {
      if (isMounted.current) {
        if (!noValueUpdates) {
          if (value && Array.isArray(value)) {
            const selectValue = value.filter((value) =>
              typeof value === 'object' ? data.find((option) => value.value === option.value) : data.find((option) => value === option.value)
            );
            onChange(selectValue.length === 0 ? undefined : selectValue);
          } else if (value && !data.find(({ value: internalValue }) => internalValue === value)) {
            onChange(undefined);
          }
        }

        dispatch({ type: 'updateOptions', payload: data });
      }
    });
  };

  useEffect(() => {
    if (loadOptions) {
      updateOptions();
    }

    dispatch({ type: 'initialLoaded' });
  }, []);

  const loadOptionsStr = loadOptions ? fnToString(loadOptions) : '';

  useEffect(() => {
    if (loadOptionsStr && state.isInitialLoaded) {
      updateOptions();
    }
  }, [loadOptionsStr, loadOptionsChangeCounter]);

  useEffect(() => {
    if (state.isInitialLoaded) {
      if (!noValueUpdates && value && !propsOptions.map(({ value }) => value).includes(value)) {
        onChange(undefined);
      }

      dispatch({ type: 'setOptions', payload: propsOptions });
    }
  }, [propsOptions]);

  const renderNoOptionsMessage = () => (Object.values(state.promises).some((value) => value) ? () => updatingMessage : () => noOptionsMessage);

  if (state.isLoading) {
    return (
      <SelectComponent
        {...props}
        classNamePrefix={classNamePrefix}
        isDisabled={true}
        isFetching={true}
        placeholder={loadingMessage}
        options={state.options}
        onChange={() => {}}
        {...loadingProps}
        noOptionsMessage={renderNoOptionsMessage()}
        {...(state.originalOptions && { originalOptions: state.originalOptions })}
      />
    );
  }

  const onInputChange = (inputValue) => {
    if (inputValue && loadOptions && state.promises[inputValue] === undefined && props.isSearchable) {
      dispatch({ type: 'setPromises', payload: { [inputValue]: true } });

      loadOptions(inputValue)
        .then((options) => {
          if (isMounted.current) {
            dispatch({
              type: 'setPromises',
              payload: { [inputValue]: false },
              options,
            });
          }
        })
        .catch((error) => {
          dispatch({ type: 'setPromises', payload: { [inputValue]: false } });
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
  };

  const selectValue = pluckSingleValue ? (isMulti ? value : Array.isArray(value) && value[0] ? value[0] : value) : value;

  const filteredLength = state.options.filter(({ selectAll, selectNone }) => !selectAll && !selectNone).length;
  const shouldRemoveSelectAll = isMulti && state.options.find(({ selectAll }) => selectAll) && selectValue.length === filteredLength;
  const shouldRemoveSelectNone = isMulti && state.options.find(({ selectNone }) => selectNone) && selectValue.length === 0;

  return (
    <SelectComponent
      className={clsx(classNamePrefix, {
        'has-error': invalid,
      })}
      {...props}
      isDisabled={props.isDisabled || props.isReadOnly}
      options={state.options}
      classNamePrefix={classNamePrefix}
      isMulti={isMulti}
      value={getSelectValue(selectValue, simpleValue, isMulti, state.options)}
      onChange={(option) => handleSelectChange(option, simpleValue, isMulti, onChange, state.options, shouldRemoveSelectAll, shouldRemoveSelectNone)}
      onInputChange={onInputChange}
      isFetching={Object.values(state.promises).some((value) => value)}
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
  SelectComponent: PropTypes.elementType.isRequired,
  noValueUpdates: PropTypes.bool,
  optionsTransformer: PropTypes.func,
};

Select.defaultProps = {
  options: [],
  invalid: false,
  simpleValue: true,
  pluckSingleValue: true,
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false,
};

export default Select;
