import React from 'react';
import PropTypes from 'prop-types';

import DataDrivenSelect from '@data-driven-forms/common/src/select';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';

import MultiValueContainer from './multi-value-container';
import ValueContainer from './value-container';
import MultiValueRemove from './multi-value-remove';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';
import Option from './option';

import './select-styles.scss';

const Select = ({ selectVariant, menuIsPortal, ...props }) => {
  const isSearchable = selectVariant === 'createable' || props.isSearchable;
  const simpleValue = selectVariant === 'createable' ? false : props.simpleValue;

  const menuPortalTarget = menuIsPortal ? document.body : undefined;

  return (
    <DataDrivenSelect
      SelectComponent={selectVariant === 'createable' ? CreatableSelect : ReactSelect}
      loadingProps={{
        className: 'ddorg__pf4-component-mapper__select',
        classNamePrefix: 'ddorg__pf4-component-mapper__select'
      }}
      menuPlacement="auto"
      components={{
        MultiValueContainer,
        ValueContainer,
        MultiValueRemove,
        DropdownIndicator,
        ClearIndicator,
        Option
      }}
      menuPortalTarget={menuPortalTarget}
      {...props}
      className={`ddorg__pf4-component-mapper__select${props.isMulti ? ' multi-select' : ' single-select'}`}
      classNamePrefix="ddorg__pf4-component-mapper__select"
      styles={{
        menuPortal: (provided) => ({
          ...provided,
          'z-index': 'initial'
        })
      }}
      isSearchable={isSearchable}
      simpleValue={simpleValue}
      selectVariant={selectVariant}
    />
  );
};

Select.propTypes = {
  selectVariant: PropTypes.oneOf(['default', 'createable']),
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
  selectVariant: 'default',
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
