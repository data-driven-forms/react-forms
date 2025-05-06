import React, { useReducer } from 'react';
import isEqual from 'lodash/isEqual';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import reducer, { initialState } from './reducer';

const getOptionsGroup = (value, lastClicked, options) => {
  const lastIndex = options.map(({ value }) => value.toString()).indexOf(lastClicked.toString());
  const currentIndex = options.map(({ value }) => value.toString()).indexOf(value);
  const startIndex = Math.min(lastIndex, currentIndex);
  const endIndex = Math.max(lastIndex, currentIndex) + 1;
  return [...options.slice(startIndex, endIndex).map(({ value }) => value.toString())];
};

const handleOptionClick = (event, value, options, isRight, dispatch, state) => {
  const selectedKey = isRight ? 'selectedLeftValues' : 'selectedRightValues';
  const lastKey = isRight ? 'lastLeftClicked' : 'lastRightClicked';
  if (event.shiftKey && state[lastKey]) {
    dispatch({ type: 'setSelectedValue', value, values: getOptionsGroup(value, state[lastKey], options), isRight });
  } else if (event.ctrlKey && state[lastKey]) {
    const selectedValues = state[selectedKey].includes(value) ? state[selectedKey].filter((item) => item !== value) : [...state[selectedKey], value];

    dispatch({ type: 'setSelectedValue', value, values: selectedValues, isRight });
  } else {
    dispatch({ type: 'setSelectedValue', value, values: [value], isRight });
  }
};

const DualListSelectCommon = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { DualListSelect, ...rest } = useFieldApi({
    ...props,
    FieldProps: {
      isEqual: (current, initial) => isEqual([...(current || [])].sort(), [...(initial || [])].sort()),
    },
  });

  const leftValues = rest.options
    .filter((option) => !rest.input.value.includes(option.value) && option.label.toLowerCase().includes(state.filterOptions.toLowerCase()))
    .sort((a, b) => (state.sortLeftDesc ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)));
  const rightValues = rest.options
    .filter((option) => rest.input.value.includes(option.value) && option.label.toLowerCase().includes(state.filterValue.toLowerCase()))
    .sort((a, b) => (state.sortRightDesc ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)));

  const handleOptionsClick = (event, value) => handleOptionClick(event, value, leftValues, true, dispatch, state);

  const handleValuesClick = (event, value) => handleOptionClick(event, value, rightValues, false, dispatch, state);

  const handleMoveRight = () => {
    rest.input.onChange([...rest.input.value, ...state.selectedLeftValues]);
    dispatch({ type: 'clearLeftOptions' });
  };

  const handleMoveLeft = () => {
    rest.input.onChange(rest.input.value.filter((value) => !state.selectedRightValues.includes(value)));
    dispatch({ type: 'clearRightValues' });
  };

  const sortOptions = () => dispatch({ type: 'sortOptions' });

  const sortValues = () => dispatch({ type: 'sortValue' });

  const filterOptions = (value) => dispatch({ type: 'setFilterOptions', value });

  const filterValues = (value) => dispatch({ type: 'setFilterValue', value });

  const handleClearLeftValues = () => {
    dispatch({ type: 'clearLeftValues' });
    rest.input.onChange([...rest.input.value, ...leftValues.map(({ value }) => value)]);
  };

  const handleClearRightValues = () => {
    dispatch({ type: 'clearRightValues' });
    rest.input.onChange([...rest.input.value.filter((val) => !rightValues.find(({ value }) => val === value))]);
  };

  return (
    <DualListSelect
      {...rest}
      leftValues={leftValues}
      rightValues={rightValues}
      handleOptionsClick={handleOptionsClick}
      handleValuesClick={handleValuesClick}
      handleMoveRight={handleMoveRight}
      handleMoveLeft={handleMoveLeft}
      sortOptions={sortOptions}
      sortValues={sortValues}
      filterOptions={filterOptions}
      filterValues={filterValues}
      handleClearLeftValues={handleClearLeftValues}
      handleClearRightValues={handleClearRightValues}
      state={state}
    />
  );
};

export default DualListSelectCommon;
