import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';

import MultiValueContainer from './multi-value-container';
import ValueContainer from './value-container';
import MultiValueRemove from './multi-value-remove';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';
import Option from './option';

import './select-styles.scss';

const selectProvider = type => ({
  default: ReactSelect,
  createable: CreatableSelect,
})[type || 'default'];

export class Select extends React.Component {
  state = {
    isLoading: true,
    options: this.props.options || [],
  };

  componentDidMount() {
    const { loadOptions } = this.props;

    if (!loadOptions) {
      this.setState({
        isLoading: false,
      });
    } else {
      return loadOptions()
      .then((data) => this.setState({
        options: data,
        isLoading: false,
      }));
    }
  }

  render() {
    const { selectVariant, loadOptions, loadingMessage, ... props } = this.props;
    const { isLoading, options } = this.state;
    const Select = selectProvider(selectVariant);
    const isSearchable = selectVariant === 'createable' || props.isSearchable;
    const simpleValue = selectVariant === 'createable' ? false : props.simpleValue;

    if (isLoading){
      return (<Select
        className="ddorg__pf4-component-mapper__select"
        classNamePrefix="ddorg__pf4-component-mapper__select"
        isDisabled={ true }
        placeholder={ loadingMessage }
      />);
    }

    return (
      <Select
        menuPlacement="auto"
        components={{
          MultiValueContainer,
          ValueContainer,
          MultiValueRemove,
          DropdownIndicator,
          ClearIndicator,
          Option,
        }}
        { ...props }
        className="ddorg__pf4-component-mapper__select"
        classNamePrefix="ddorg__pf4-component-mapper__select"
        onChange={ (option) => {
          const o =  !option && props.isMulti ? [] : option;
          return simpleValue
            ? props.onChange(props.isMulti
              ? o.map(item => item.value)
              : o ? o.value : undefined)
            : props.onChange(o);} }
        value={ simpleValue ? options.filter(({ value }) => props.isMulti ? props.value.includes(value) : value === props.value) : props.value }
        isSearchable={ isSearchable }
        options={ options }
      />
    );
  }
}

Select.propTypes = {
  selectVariant: PropTypes.oneOf([ 'default', 'createable' ]),
  isSearchable: PropTypes.bool,
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
  simpleValue: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.any,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.node,
};

Select.defaultProps = {
  selectVariant: 'default',
  showMoreLabel: 'more',
  showLessLabel: 'Show less',
  simpleValue: true,
  loadingMessage: 'Loading...',
};

const DataDrivenSelect = ({ input, multi, ...props }) => (
  <Select
    { ...input }
    hideSelectedOptions={ false }
    isMulti={ multi }
    { ...props }
    closeMenuOnSelect={ !multi }
  />
);

DataDrivenSelect.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
};

DataDrivenSelect.defaultProps = {
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false,
};

export default DataDrivenSelect;
