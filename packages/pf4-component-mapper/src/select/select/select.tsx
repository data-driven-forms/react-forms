import React, { useRef, useState } from 'react';

import DataDrivenSelect, { flatOptions } from '@data-driven-forms/common/select';
import parseInternalValue from '@data-driven-forms/common/select/parse-internal-value';
import Downshift from 'downshift';
import { CaretDownIcon, CloseIcon, CircleNotchIcon } from '@patternfly/react-icons';

import './select-styles.css';
import '@patternfly/react-styles/css/components/Menu/menu.css';
import '@patternfly/react-styles/css/components/Label/label.css';
import '@patternfly/react-styles/css/components/Label/label-group.css';
import '@patternfly/react-styles/css/components/Divider/divider.css';

import Menu from './menu';
import ClearIndicator from './clear-indicator';
import ValueContainer from './value-container';
import { Icon } from '@patternfly/react-core';
import { SelectOption } from '../../types';

const customItemToString = (value: any, isMulti: boolean, showMore: boolean, handleShowMore: () => void, handleChange: (item: any) => void): any => {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    if (!value || value.length === 0) {
      return;
    }

    if (isMulti) {
      const visibleOptions = showMore ? value : value.slice(0, 3);
      return (
        <div className="pf-v6-c-label-group pf-v6-u-ml-sm" onClick={(event) => event.stopPropagation()}>
          <ul className="pf-v6-c-label-group__list" aria-label="Chip group category">
            {visibleOptions.map((item: any, index: number) => {
              const label = typeof item === 'object' ? item.label : item;
              return (
                <li className="pf-v6-c-label-group__list-item" onClick={(event) => event.stopPropagation()} key={item.key || item.value || item}>
                  <div className="pf-v6-c-label">
                    <span className="pf-v6-c-label__text" id={`pf-random-id-${index}-${label}`}>
                      {label}
                    </span>
                    <button
                      onClick={() => handleChange(item)}
                      className="pf-v6-c-button pf-u-plain pf-v6-u-pt-0 pf-v6-u-pb-0"
                      type="button"
                      aria-label="remove option"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </li>
              );
            })}
            {value.length > 3 && (
              <li className="pf-v6-c-label-group__list-item">
                <button type="button" onClick={handleShowMore} className="pf-v6-c-label pf-m-overflow">
                  <span className="pf-v6-c-label__text">{showMore ? 'Show less' : `${value.length - 3} more`}</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      );
    }

    return value.map((item: any) => (typeof item === 'object' ? item.label : item));
  }

  if (typeof value === 'object') {
    return value.label;
  }

  return value;
};

const filterOptions = (options: SelectOption[], filterValue: any = ''): SelectOption[] => {
  const filter = (Array.isArray(filterValue) && filterValue.length > 0 ? filterValue[0] : filterValue).toLowerCase();

  if (!filter) {
    return options;
  }

  return options
    .map((option) => {
      if (option.options) {
        const filteredNested = option.options
          .map((option) => (option.label?.toLowerCase().includes(filter) ? option : null))
          .filter(Boolean) as SelectOption[];

        if (filteredNested.length === 0) {
          return null;
        }

        return {
          ...option,
          options: filteredNested,
        };
      }

      if (option.label?.toLowerCase().includes(filter)) {
        return option;
      }

      return null;
    })
    .filter(Boolean) as SelectOption[];
};

const getValue = (isMulti: boolean, option: any, value: any): any => {
  if (!isMulti || !option) {
    return option;
  }

  const isSelected = value.find(({ value: itemValue }: any) => itemValue === option.value);
  return isSelected ? value.filter(({ value: itemValue }: any) => itemValue !== option.value) : [...value, option];
};

const stateReducer = (state: any, changes: any, isMulti: boolean): any => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.clickButton:
      return {
        ...state,
        ...changes,
        highlightedIndex: undefined,
        inputValue: undefined,
      };
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        isOpen: isMulti ? state.isOpen : !state.isOpen,
        highlightedIndex: state.highlightedIndex,
        inputValue: isMulti ? state.inputValue : changes.inputValue,
      };
    case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem:
      return {
        ...changes,
        inputValue: state.inputValue,
      };
    case Downshift.stateChangeTypes.mouseUp:
      if (typeof changes.inputValue === 'string') {
        return {
          ...changes,
        };
      }

      if (Array.isArray(changes.inputValue) && typeof changes.inputValue[0] === 'string') {
        return {
          ...changes,
          inputValue: changes.inputValue[0],
        };
      }

      if (state.isOpen === true && changes.isOpen === false && changes.inputValue) {
        return {
          ...state,
          ...changes,
          inputValue: '',
        };
      }

      return {
        ...changes,
        inputValue: state.inputValue,
      };
    default:
      return changes;
  }
};

export interface InternalSelectProps {
  noResultsMessage?: string;
  noOptionsMessage?: string;
  onChange: (value: any) => void;
  options: SelectOption[];
  value: any;
  simpleValue?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  isFetching?: boolean;
  onInputChange?: (value: string) => void;
  loadingMessage?: string;
  menuPortalTarget?: Element;
  menuIsPortal?: boolean;
  originalOptions?: SelectOption[];
  id?: string;
  name?: string;
  [key: string]: any;
}

const InternalSelect: React.FC<InternalSelectProps> = ({
  noResultsMessage,
  noOptionsMessage,
  onChange,
  options,
  value,
  simpleValue,
  placeholder,
  isSearchable,
  isDisabled,
  isClearable,
  isMulti,
  isFetching,
  onInputChange,
  loadingMessage,
  menuPortalTarget,
  menuIsPortal,
  originalOptions,
  ...props
}) => {
  const [showMore, setShowMore] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectToggleRef = useRef<HTMLDivElement>(null);
  const parsedValue = parseInternalValue(value);
  const handleShowMore = () => setShowMore((prev) => !prev);
  const handleChange = (option: any) => onChange(getValue(isMulti || false, option, value));

  return (
    <Downshift
      id={props.id || props.name}
      onChange={handleChange}
      itemToString={(value) => customItemToString(value, isMulti || false, showMore, handleShowMore, handleChange)}
      selectedItem={value || ''}
      stateReducer={(state, changes) => stateReducer(state, changes, isMulti || false)}
      onInputValueChange={(inputValue, { selectedItem }) => {
        if (onInputChange && typeof inputValue === 'string' && selectedItem?.label !== inputValue) {
          onInputChange(inputValue);
        }
      }}
    >
      {({ isOpen, inputValue, itemToString, selectedItem, clearSelection, getInputProps, getToggleButtonProps, getItemProps, highlightedIndex }) => {
        const toggleButtonProps = getToggleButtonProps();
        return (
          <div className="pf-v6-c-menu">
            <div
              ref={selectToggleRef}
              className={`pf-v6-c-menu-toggle${isDisabled ? ' pf-m-disabled' : ''}${
                isSearchable ? ' pf-m-typeahead' : ''
              } ddorg__pf4-component-mapper__select-toggle`}
              tabIndex={0}
              {...toggleButtonProps}
            >
              <ValueContainer
                isMulti={isMulti}
                isSearchable={isSearchable}
                placeholder={placeholder}
                inputRef={inputRef}
                getInputProps={getInputProps}
                value={customItemToString(selectedItem, isMulti || false, showMore, handleShowMore, handleChange)}
              />
              {isClearable && parsedValue && <ClearIndicator clearSelection={clearSelection} />}
              <button className="pf-v6-c-menu-toggle__button">
                <span className="pf-v6-c-menu-toggle__controls">
                  <span className="pf-v6-c-menu-toggle__toggle-icon">
                    <Icon>{isFetching ? <CircleNotchIcon className="ddorg__pf4-component-mapper__select-loading-icon" /> : <CaretDownIcon />}</Icon>
                  </span>
                </span>
              </button>
            </div>
            {isOpen && (
              <Menu
                noResultsMessage={noResultsMessage}
                noOptionsMessage={noOptionsMessage}
                isFetching={isFetching}
                isSearchable={isSearchable}
                getInputProps={getInputProps}
                filterOptions={filterOptions}
                filterValue={inputValue}
                options={options}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                selectedItem={isMulti ? value : parsedValue}
                isMulti={isMulti}
                menuPortalTarget={menuPortalTarget}
                menuIsPortal={menuIsPortal}
                selectToggleRef={selectToggleRef}
                originalOptions={originalOptions}
              />
            )}
          </div>
        );
      }}
    </Downshift>
  );
};

export interface SelectComponentProps {
  showMoreLabel?: string;
  showLessLabel?: string;
  simpleValue?: boolean;
  loadingMessage?: string;
  updatingMessage?: string;
  options?: SelectOption[];
  menuIsPortal?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  noResultsMessage?: string;
  noOptionsMessage?: string;
  [key: string]: any;
}

const Select: React.FC<SelectComponentProps> = ({
  showMoreLabel = 'more',
  showLessLabel = 'Show less',
  simpleValue = true,
  loadingMessage = 'Loading...',
  updatingMessage = 'Loading data...',
  options = [],
  menuIsPortal = false,
  placeholder = 'Choose...',
  isSearchable = false,
  isClearable = false,
  noResultsMessage = 'No results found',
  noOptionsMessage = 'No options',
  ...props
}) => {
  const menuPortalTarget = menuIsPortal ? document.body : undefined;

  return (
    <DataDrivenSelect
      SelectComponent={InternalSelect}
      menuPortalTarget={menuPortalTarget}
      menuIsPortal={menuIsPortal}
      {...props}
      showMoreLabel={showMoreLabel}
      showLessLabel={showLessLabel}
      simpleValue={simpleValue}
      loadingMessage={loadingMessage}
      updatingMessage={updatingMessage}
      options={options}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      noResultsMessage={noResultsMessage}
      noOptionsMessage={noOptionsMessage}
      optionsTransformer={flatOptions}
    />
  );
};

export default Select;
