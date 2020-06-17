import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import DataDrivenSelect from '@data-driven-forms/common/src/select';
import parseInternalValue from '@data-driven-forms/common/src/select/parse-internal-value';
import Downshift from 'downshift';
import { CaretDownIcon } from '@patternfly/react-icons';
import '@patternfly/react-styles/css/components/Select/select.css';

import './select-styles.scss';
import Input from './input';
import Menu from './menu';

const InternalSelect = ({ onChange, options, value, simpleValue, placeholder, isSearchable, ...props }) => {
  // console.log(props);
  const inputRef = useRef();
  const parsedValue = parseInternalValue(value);
  return (
    <Downshift
      id={props.id || props.name}
      onChange={(value) => {
        return onChange(value);
      }}
      selectedItem={value}
    >
      {({ isOpen, getLabelProps, getInputProps, getToggleButtonProps, getItemProps, highlightedIndex, selectedItem }) => {
        const toggleButtonProps = { ...getToggleButtonProps() };
        const enhancedToggleButtonProps = {
          ...toggleButtonProps,
          onClick: (...args) => {
            if (isSearchable) {
              inputRef.current.focus();
            }

            return toggleButtonProps.onClick(...args);
          }
        };
        return (
          <div className="pf-c-select">
            <button className="pf-c-select__toggle" {...enhancedToggleButtonProps}>
              <div className="pf-c-select_toggle-wrapper ddorg__pf4-component-mapper__select-toggle-wrapper">
                <Input inputRef={inputRef} placeholder={placeholder} className="pf-c-select_toggle-text" {...getInputProps()} value={value} />
              </div>
              <span className="pf-c-select__toggle-arrow">
                <CaretDownIcon />
              </span>
            </button>
            {isOpen && <Menu options={options} getItemProps={getItemProps} highlightedIndex={highlightedIndex} selectedItem={parsedValue} />}
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
  name: PropTypes.string.isRequired
}

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
  noOptionsMessage: PropTypes.func,
  menuIsPortal: PropTypes.bool,
  placeholder: PropTypes.string
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
  isClearable: false
};

export default Select;
