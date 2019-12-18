import React from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Option = (props) => {
  console.log(props);
  return (
    <div className={ clsx('ddorg__pf3-component-mapper__select__option', {
      'ddorg__pf3-component-mapper__select__option--is-focused': props.isFocused,
      'ddorg__pf3-component-mapper__select__option--is-selected': props.isSelected,
    }) }>
      <components.Option { ...props } />
      { props.isSelected && (props.selectProps && !props.selectProps.isCheckbox) && <i className="selected-indicator fa fa-check"></i> }
    </div>
  );
};

Option.propTypes = {
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  getStyles: PropTypes.func.isRequired,
  selectOption: PropTypes.func,
  cx: PropTypes.func.isRequired,
  data: PropTypes.shape({
    selected: PropTypes.bool,
  }),
  innerProps: PropTypes.shape({
    id: PropTypes.string,
  }),
  selectProps: PropTypes.shape({
    isCheckbox: PropTypes.bool,
  }),
};

Option.defaultProps = {
  isFocused: false,
  isSelected: false,
  selectOption: () => undefined,
  selectProps: {
    isCheckbox: false,
  },
  innerProps: {
    id: 'some-classname',
  },
};

export default Option;
