/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import { input } from '../prop-types-templates';
import fnToString from '../utils/fn-to-string';
import reducer from './reducer';

const getSelectValue = (stateValue, simpleValue, isMulti, allOptions) =>
  simpleValue ? allOptions.filter(({ value }) => (isMulti ? stateValue.includes(value) : isEqual(value, stateValue))) : stateValue;

const handleSelectChange = (option, simpleValue, isMulti, onChange) => {
  const sanitizedOption = !option && isMulti ? [] : option;
  return simpleValue
    ? onChange(isMulti ? sanitizedOption.map((item) => item.value) : sanitizedOption ? sanitizedOption.value : undefined)
    : onChange(sanitizedOption);
};

const selectProvider = (type) =>
  ({
    createable: CreatableSelect
  }[type] || ReactSelect);

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
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    options: propsOptions,
    promises: {},
    isMounted: false
  });

  const updateOptions = () => {
    dispatch({ type: 'startLoading' });

    return loadOptions().then((data) => {
      if (Array.isArray(value)) {
        const selectValue = value.filter((value) =>
          typeof value === 'object' ? data.find((option) => value.value === option.value) : data.find((option) => value === option.value)
        );
        onChange(selectValue.length === 0 ? undefined : selectValue);
      } else if (!data.find(({ value: internalValue }) => internalValue === value)) {
        onChange(undefined);
      }

      dispatch({ type: 'updateOptions', payload: data });
    });
  };

  useEffect(() => {
    if (loadOptions) {
      updateOptions();
    }

    dispatch({ type: 'mounted' });

    return () => {
      dispatch({ type: 'unmounted' });
    };
  }, []);

  const loadOptionsStr = loadOptions ? fnToString(loadOptions) : '';

  useEffect(() => {
    if (loadOptionsStr && state.isMounted) {
      updateOptions();
    }
  }, [loadOptionsStr]);

  useEffect(() => {
    if (state.isMounted) {
      if (!propsOptions.map(({ value }) => value).includes(value)) {
        onChange(undefined);
      }

      dispatch({ type: 'setOptions', payload: propsOptions });
    }
  }, [propsOptions]);

  if (state.isLoading) {
    return <ReactSelect isDisabled={true} placeholder={loadingMessage} options={state.options} {...loadingProps} />;
  }

  const onInputChange = (inputValue) => {
    if (loadOptions && state.promises[inputValue] === undefined) {
      dispatch({ type: 'setPromises', payload: { [inputValue]: true } });

      loadOptions(inputValue)
        .then((options) => {
          if (state.isMounted) {
            dispatch({
              type: 'setPromises',
              payload: { [inputValue]: false },
              options
            });
          }
        })
        .catch((error) => {
          dispatch({ type: 'setPromises', payload: { [inputValue]: false } });
          throw error;
        });
    }
  };

  const renderNoOptionsMessage = () => (Object.values(state.promises).some((value) => value) ? () => updatingMessage : () => noOptionsMessage);

  const selectValue = pluckSingleValue ? (isMulti ? value : Array.isArray(value) && value[0] ? value[0] : value) : value;

  const SelectFinal = selectProvider(selectVariant);

  return (
    <SelectFinal
      className={clsx(classNamePrefix, {
        'has-error': invalid
      })}
      {...props}
      options={state.options}
      classNamePrefix={classNamePrefix}
      isMulti={isMulti}
      value={getSelectValue(selectValue, simpleValue, isMulti, state.options)}
      onChange={(option) => handleSelectChange(option, simpleValue, isMulti, onChange)}
      onInputChange={onInputChange}
      isFetching={Object.values(state.promises).some((value) => value)}
      noOptionsMessage={renderNoOptionsMessage()}
      hideSelectedOptions={false}
      closeMenuOnSelect={!isMulti}
    />
  );
};

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  classNamePrefix: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  simpleValue: PropTypes.bool,
  isMulti: PropTypes.bool,
  pluckSingleValue: PropTypes.bool,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  ...input
};

Select.defaultProps = {
  options: [],
  invalid: false,
  simpleValue: true,
  pluckSingleValue: true,
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false
};

export default Select;
