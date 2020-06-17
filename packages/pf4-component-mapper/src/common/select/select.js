import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import DataDrivenSelect from '@data-driven-forms/common/src/select';
import parseInternalValue from '@data-driven-forms/common/src/select/parse-internal-value';
import Downshift from 'downshift';
import { CaretDownIcon } from '@patternfly/react-icons';
import '@patternfly/react-styles/css/components/Select/select.css';

import './select-styles.scss';
import Menu from './menu';
import ClearIndicator from './clear-indicator';
import ValueContainer from './value-container';

const itemToString = (value) => {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'object' ? item.label : item)).join(',');
  }

  if (typeof value === 'object') {
    return value.label;
  }

  return value;
};

const filterOptions = (options, filterValue = '') => options.filter(({ label }) => label.toLowerCase().includes(filterValue.toLowerCase()));

const InternalSelect = ({
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
  ...props
}) => {
  // console.log(props);
  const inputRef = useRef();
  const parsedValue = parseInternalValue(value);
  return (
    <Downshift
      id={props.id || props.name}
      onChange={(value) => {
        return onChange(value);
      }}
      itemToString={itemToString}
      selectedItem={value}
    >
      {({ isOpen, inputValue, itemToString, selectedItem, clearSelection, getInputProps, getToggleButtonProps, getItemProps, highlightedIndex }) => {
        const toggleButtonProps = getToggleButtonProps();
        return (
          <div className="pf-c-select">
            <button disabled={isDisabled} className={`pf-c-select__toggle${isDisabled ? ' pf-m-disabled' : ''}`} {...toggleButtonProps}>
              <div className="pf-c-select_toggle-wrapper ddorg__pf4-component-mapper__select-toggle-wrapper">
                <ValueContainer placeholder={placeholder} value={itemToString(selectedItem)} />
              </div>
              <span className="pf-c-select__toggle-arrow">
                {isClearable && parsedValue && <ClearIndicator clearSelection={clearSelection} />}
                <CaretDownIcon />
              </span>
            </button>
            {isOpen && (
              <Menu
                noResultsMessage={noResultsMessage}
                noOptionsMessage={noOptionsMessage}
                inputRef={inputRef}
                isDisabled={isDisabled}
                placeholder={placeholder}
                isSearchable={isSearchable}
                getInputProps={getInputProps}
                filterOptions={filterOptions}
                filterValue={inputValue}
                options={options}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                selectedItem={parsedValue}
              />
            )}
          </div>
        );
      }}
    </Downshift>
  );
};

InternalSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any
    })
  ).isRequired,
  value: PropTypes.any,
  simpleValue: PropTypes.bool,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  noResultsMessage: PropTypes.node,
  noOptionsMessage: PropTypes.func
};

const Select = ({ selectVariant, menuIsPortal, ...props }) => {
  const isSearchable = selectVariant === 'createable' || props.isSearchable;
  const simpleValue = selectVariant === 'createable' ? false : props.simpleValue;

  const menuPortalTarget = menuIsPortal ? document.body : undefined;

  return <DataDrivenSelect SelectComponent={InternalSelect} {...props} />;
};

Select.propTypes = {
  isSearchable: PropTypes.bool,
  showMoreLabel: PropTypes.node,
  showLessLabel: PropTypes.node,
  simpleValue: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any
    })
  ),
  onChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.node,
  updatingMessage: PropTypes.node,
  menuIsPortal: PropTypes.bool,
  placeholder: PropTypes.string,
  noResultsMessage: PropTypes.node,
  noOptionsMessage: PropTypes.node
};

Select.defaultProps = {
  showMoreLabel: 'more',
  showLessLabel: 'Show less',
  simpleValue: true,
  loadingMessage: 'Loading...',
  updatingMessage: 'Loading data...',
  options: [],
  menuIsPortal: false,
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false,
  noResultsMessage: 'No results found',
  noOptionsMessage: 'No options'
};

export default Select;
