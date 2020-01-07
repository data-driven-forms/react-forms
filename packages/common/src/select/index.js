import React, { Component } from 'react';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

const selectProvider = type => ({
  createable: CreatableSelect,
})[type] || ReactSelect;

const getSelectValue = (stateValue, simpleValue, isMulti, allOptions) => simpleValue
  ? allOptions.filter(({ value }) => isMulti
    ? stateValue.includes(value)
    : isEqual(value, stateValue))
  : stateValue;

const handleSelectChange = (option, simpleValue, isMulti, onChange) => {
  const sanitizedOption =  !option && isMulti ? [] : option;
  return simpleValue
    ? onChange(isMulti
      ? sanitizedOption.map(item => item.value)
      : sanitizedOption ? sanitizedOption.value : undefined)
    : onChange(sanitizedOption);
};

class Select extends Component {
  render() {
    const { input, invalid, classNamePrefix, isMulti, pluckSingleValue, options, selectVariant, menuIsPortal, ...props } = this.props;
    const { value, onChange, ...inputProps } = input;

    const isSearchable = selectVariant === 'createable' || props.isSearchable;
    const simpleValue = selectVariant === 'createable' ? false : props.simpleValue;
    const SelectComponent = selectProvider();

    const menuPortalTarget = menuIsPortal ? document.body : undefined;

    const selectValue = pluckSingleValue ? isMulti ? value : Array.isArray(value) && value[0] ? value[0] : value : value;

    return (
      <SelectComponent
        className={ clsx(classNamePrefix, {
          'has-error': invalid,
        }) }
        { ...props }
        { ...inputProps }
        menuPortalTarget={ menuPortalTarget }
        options={ options }
        classNamePrefix={ classNamePrefix }
        isMulti={ isMulti }
        isSearchable={ isSearchable }
        value={ getSelectValue(selectValue, simpleValue, isMulti, options) }
        onChange={ option => handleSelectChange(option, simpleValue, isMulti, onChange) }
      />
    );
  }
}

Select.propTypes = {
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }),
  selectVariant: PropTypes.oneOf([ 'default', 'createable' ]),
  options: PropTypes.array,
  classNamePrefix: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  simpleValue: PropTypes.bool,
  isMulti: PropTypes.bool,
  pluckSingleValue: PropTypes.bool,
  menuIsPortal: PropTypes.bool,
};

Select.defaultProps = {
  showMoreLabel: 'more',
  showLessLabel: 'Show less',
  selectVariant: 'default',
  options: [],
  invalid: false,
  simpleValue: true,
  pluckSingleValue: true,
  menuIsPortal: false,
};

const DataDrivenSelect = ({ multi, ...props }) => {
  const isMulti = props.isMulti || multi;
  const closeMenuOnSelect = !isMulti;
  return (
    <Select
      hideSelectedOptions={ false }
      isMulti={ isMulti }
      { ...props }
      closeMenuOnSelect={ closeMenuOnSelect }
    />
  );
};

DataDrivenSelect.propTypes = {
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  classNamePrefix: PropTypes.string.isRequired,
};

DataDrivenSelect.defaultProps = {
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false,
};

export default DataDrivenSelect;
