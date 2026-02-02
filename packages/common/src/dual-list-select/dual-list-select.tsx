import React, { useReducer } from 'react';
import isEqual from 'lodash/isEqual';

import { useFieldApi, UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { SelectOption, OptionValue } from '../types/shared-types';

import reducer, { initialState, DualListSelectState, DualListSelectAction } from './reducer';

interface DualListSelectComponentProps<T = OptionValue> {
  leftValues: SelectOption<T>[];
  rightValues: SelectOption<T>[];
  handleOptionsClick: (event: React.MouseEvent, value: T) => void;
  handleValuesClick: (event: React.MouseEvent, value: T) => void;
  handleMoveRight: () => void;
  handleMoveLeft: () => void;
  handleClearLeftValues: () => void;
  handleClearRightValues: () => void;
  filterOptions?: (options: SelectOption<T>[], filterValue: string) => SelectOption<T>[];
  filterValue?: string;
  filterValueText?: string;
  filterPlaceholder?: string;
  filterOptionsText?: string;
  filterValuePlaceholder?: string;
  noOptionsText?: string;
  noValueText?: string;
  [key: string]: unknown;
}

export type DualListSelectCommonProps<
  T = OptionValue,
  SelectProps = Record<string, unknown>
> = UseFieldApiConfig & {
  DualListSelect: React.ComponentType<DualListSelectComponentProps<T>>;
  options: SelectOption<T>[];
} & SelectProps;

const getOptionsGroup = <T extends OptionValue>(
  value: T,
  lastClicked: T,
  options: SelectOption<T>[]
): T[] => {
  const lastIndex = options.map(({ value }) => value.toString()).indexOf(lastClicked.toString());
  const currentIndex = options.map(({ value }) => value.toString()).indexOf(value.toString());
  const startIndex = Math.min(lastIndex, currentIndex);
  const endIndex = Math.max(lastIndex, currentIndex) + 1;
  return [...options.slice(startIndex, endIndex).map(({ value }) => value)];
};

const handleOptionClick = <T extends OptionValue>(
  event: React.MouseEvent,
  value: T,
  options: SelectOption<T>[],
  isRight: boolean,
  dispatch: React.Dispatch<DualListSelectAction>,
  state: DualListSelectState
): void => {
  const selectedKey = isRight ? 'selectedLeftValues' : 'selectedRightValues';
  const lastKey = isRight ? 'lastLeftClicked' : 'lastRightClicked';

  if (event.shiftKey && state[lastKey]) {
    dispatch({ type: 'setSelectedValue', value, values: getOptionsGroup(value, state[lastKey] as T, options), isRight });
  } else if (event.ctrlKey && state[lastKey]) {
    const selectedValues = state[selectedKey].includes(value) ? state[selectedKey].filter((item) => item !== value) : [...state[selectedKey], value];

    dispatch({ type: 'setSelectedValue', value, values: selectedValues, isRight });
  } else {
    dispatch({ type: 'setSelectedValue', value, values: [value], isRight });
  }
};

const DualListSelectCommon = <T extends OptionValue = OptionValue>(
  props: DualListSelectCommonProps<T>
) => {
  const [state, dispatch] = useReducer(reducer<T>, initialState);

  const { DualListSelect, ...rest } = useFieldApi({
    ...props,
    FieldProps: {
      isEqual: (current: T[], initial: T[]) => isEqual([...(current || [])].sort(), [...(initial || [])].sort()),
    },
  });

  const leftValues = rest.options
    .filter((option: SelectOption<T>) =>
      !rest.input.value.includes(option.value) &&
      String(option.label).toLowerCase().includes(state.filterOptions.toLowerCase())
    )
    .sort((a: SelectOption<T>, b: SelectOption<T>) =>
      state.sortLeftDesc
        ? String(a.label).localeCompare(String(b.label))
        : String(b.label).localeCompare(String(a.label))
    );

  const rightValues = rest.options
    .filter((option: SelectOption<T>) =>
      rest.input.value.includes(option.value) &&
      String(option.label).toLowerCase().includes(state.filterValue.toLowerCase())
    )
    .sort((a: SelectOption<T>, b: SelectOption<T>) =>
      state.sortRightDesc
        ? String(a.label).localeCompare(String(b.label))
        : String(b.label).localeCompare(String(a.label))
    );

  const handleOptionsClick = (event: React.MouseEvent, value: T) =>
    handleOptionClick(event, value, leftValues, true, dispatch, state);

  const handleValuesClick = (event: React.MouseEvent, value: T) =>
    handleOptionClick(event, value, rightValues, false, dispatch, state);

  const handleMoveRight = () => {
    rest.input.onChange([...rest.input.value, ...state.selectedLeftValues]);
    dispatch({ type: 'clearLeftOptions' });
  };

  const handleMoveLeft = () => {
    rest.input.onChange(rest.input.value.filter((value: T) => !state.selectedRightValues.includes(value)));
    dispatch({ type: 'clearRightValues' });
  };

  const sortOptions = () => dispatch({ type: 'sortOptions' });

  const sortValues = () => dispatch({ type: 'sortValue' });

  const filterOptions = (value: string) => dispatch({ type: 'setFilterOptions', value });

  const filterValues = (value: string) => dispatch({ type: 'setFilterValue', value });

  const handleClearLeftValues = () => {
    dispatch({ type: 'clearLeftValues' });
    rest.input.onChange([...rest.input.value, ...leftValues.map(({ value }: SelectOption<T>) => value)]);
  };

  const handleClearRightValues = () => {
    dispatch({ type: 'clearRightValues' });
    rest.input.onChange([
      ...rest.input.value.filter((val: T) => !rightValues.find(({ value }: SelectOption<T>) => val === value))
    ]);
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
