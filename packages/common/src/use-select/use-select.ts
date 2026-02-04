import { useEffect, useReducer, useState } from 'react';

import isEqual from 'lodash/isEqual';
import { AnyObject } from '@data-driven-forms/react-form-renderer';

import useIsMounted from '../hooks/use-is-mounted';
import reducer, { init, SelectState } from './reducer';
import fnToString from '../utils/fn-to-string';
import { SelectOption, OptionValue, SelectValue } from '../types/shared-types';

interface UseSelectProps<T = OptionValue> {
    loadOptions?: (inputValue?: string) => Promise<SelectOption<T>[]>;
    optionsTransformer?: (options: AnyObject[]) => SelectOption<T>[];
    options?: SelectOption<T>[];
    noValueUpdates?: boolean;
    onChange?: (value?: SelectValue<T>) => void;
    value?: SelectValue<T>;
    loadOptionsChangeCounter?: number;
    isSearchable?: boolean;
    pluckSingleValue?: boolean;
    isMulti?: boolean;
    simpleValue?: boolean;
    compareValues?: (value1: T, value2: T) => boolean;
}

const getSelectValue = <T extends OptionValue>(
  stateValue: SelectValue<T>,
  simpleValue: boolean,
  isMulti: boolean,
  allOptions: SelectOption<T>[]
): SelectOption<T>[] | SelectValue<T> => {
  let enhancedValue = stateValue;

  let hasSelectAll = isMulti && allOptions.find(({ selectAll }) => selectAll);
  let hasSelectNone = isMulti && allOptions.find(({ selectNone }) => selectNone);

  if (hasSelectAll || hasSelectNone) {
    // Ensure enhancedValue is an array for multi-select
    const valueArray = Array.isArray(enhancedValue) ? enhancedValue : (enhancedValue ? [enhancedValue] : []);
    enhancedValue = valueArray as SelectValue<T>;

    const optionsLength = allOptions.filter(
      ({ selectAll, selectNone, divider, options }) => !selectAll && !selectNone && !divider && !options
    ).length;

    const selectedAll = optionsLength === valueArray.length;
    const selectedNone = valueArray.length === 0;

    enhancedValue = [
      ...valueArray,
      ...(hasSelectAll && selectedAll ? [simpleValue ? hasSelectAll.value : hasSelectAll] : []),
      ...(hasSelectNone && selectedNone ? [simpleValue ? hasSelectNone.value : hasSelectNone] : []),
    ] as SelectValue<T>;
  }

  const enhancedArray = Array.isArray(enhancedValue) ? enhancedValue : (enhancedValue ? [enhancedValue] : []);
  return simpleValue ? allOptions.filter(({ value }) => (isMulti ? enhancedArray.includes(value) : isEqual(value, enhancedValue))) : enhancedValue;
};

const handleSelectChange = <T extends OptionValue>(
  option: SelectOption<T> | SelectOption<T>[] | null,
  simpleValue: boolean,
  isMulti: boolean,
  onChange: (value?: SelectValue<T>) => void,
  allOptions: SelectOption<T>[],
  removeSelectAll: boolean,
  removeSelectNone: boolean
): void => {
  // Normalize option to always be an array for filtering
  const optionArray = option ? (Array.isArray(option) ? option : [option]) : [];
  let enhanceOption = optionArray;

  if (removeSelectNone) {
    enhanceOption = enhanceOption.filter(({ selectNone }) => !selectNone);
  } else if (removeSelectAll) {
    enhanceOption = enhanceOption.filter(({ selectAll }) => !selectAll);
  }

  const sanitizedOption = !enhanceOption.length && isMulti ? [] : enhanceOption;

  if (isMulti && Array.isArray(sanitizedOption) && sanitizedOption.find(({ selectAll }) => selectAll)) {
    return onChange(allOptions.filter(({ selectAll, selectNone, value }) => !selectAll && !selectNone && value).map(({ value }) => value));
  }

  if (isMulti && Array.isArray(sanitizedOption) && sanitizedOption.find(({ selectNone }) => selectNone)) {
    return onChange([]);
  }

  if (simpleValue) {
    if (isMulti) {
      const values = (sanitizedOption as SelectOption<T>[]).map((item) => item.value);
      return onChange(values as SelectValue<T>);
    } else {
      const singleValue = Array.isArray(sanitizedOption) && sanitizedOption[0] ? sanitizedOption[0].value : undefined;
      return onChange(singleValue);
    }
  } else {
    if (isMulti) {
      return onChange(sanitizedOption as unknown as SelectValue<T>);
    } else {
      const singleOption = Array.isArray(sanitizedOption) ? sanitizedOption[0] : undefined;
      return onChange(singleOption as unknown as SelectValue<T>);
    }
  }
};

const useSelect = <T extends OptionValue = OptionValue>({
  loadOptions,
  optionsTransformer,
  options: initialOptions = [],
  noValueUpdates,
  onChange,
  value,
  loadOptionsChangeCounter,
  isSearchable,
  pluckSingleValue,
  isMulti,
  simpleValue,
  compareValues = (a: T, b: T) => isEqual(a, b),
}: UseSelectProps<T>) => {
  const [propsOptions, setPropsCache] = useState<SelectOption<T>[]>(initialOptions);
  const [state, originalDispatch] = useReducer(reducer<T>, { optionsTransformer, propsOptions: initialOptions }, init<T>);
  const dispatch = (action: any) => originalDispatch({ ...action, optionsTransformer, compareValues });

  useEffect(() => {
    if (!isEqual(initialOptions, propsOptions)) {
      setPropsCache(initialOptions);
    }
  }, [initialOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  const isMounted = useIsMounted();

  const updateOptions = () => {
    dispatch({ type: 'startLoading' });

    return loadOptions!().then((data) => {
      if (isMounted.current) {
        if (!noValueUpdates) {
          if (value && Array.isArray(value)) {
            const selectValue = value.filter((val: T) =>
              typeof val === 'object'
                ? data.find((option) => compareValues((val as any).value, option.value))
                : data.find((option) => compareValues(val, option.value))
            );
            onChange!(selectValue.length === 0 ? undefined : selectValue);
          } else if (value && !Array.isArray(value) && !data.find(({ value: internalValue }) => compareValues(internalValue, value))) {
            onChange!(undefined);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadOptionsStr = loadOptions ? fnToString(loadOptions) : '';

  useEffect(() => {
    if (loadOptionsStr && state.isInitialLoaded) {
      updateOptions();
    }
  }, [loadOptionsStr, loadOptionsChangeCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isEqual(state.options, propsOptions) && state.isInitialLoaded) {
      if (!noValueUpdates && value && !Array.isArray(value) && !propsOptions.map(({ value }) => value).includes(value)) {
        onChange!(undefined);
      }

      dispatch({ type: 'setOptions', payload: propsOptions });
    }
  }, [propsOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  const onInputChange = (inputValue: string) => {
    if (inputValue && loadOptions && state.promises[inputValue] === undefined && isSearchable) {
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
  const selectValueArray = Array.isArray(selectValue) ? selectValue : (selectValue ? [selectValue] : []);
  const shouldRemoveSelectAll = isMulti && state.options.find(({ selectAll }) => selectAll) && selectValueArray.length === filteredLength;
  const shouldRemoveSelectNone = isMulti && state.options.find(({ selectNone }) => selectNone) && selectValueArray.length === 0;

  return {
    value: getSelectValue<T>(selectValue, simpleValue || false, isMulti || false, state.options),
    onChange: (option: SelectOption<T> | SelectOption<T>[] | null) => handleSelectChange<T>(option, simpleValue || false, isMulti || false, onChange, state.options, shouldRemoveSelectAll || false, shouldRemoveSelectNone || false),
    onInputChange,
    isFetching: Object.values(state.promises).some((value) => value),
    state,
  };
};

export default useSelect;
