import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import isEqual from 'lodash/isEqual';

import fnToString from '@data-driven-forms/common/src/utils/fn-to-string';

import MultiValueContainer from './multi-value-container';
import ValueContainer from './value-container';
import MultiValueRemove from './multi-value-remove';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';
import Option from './option';

import './select-styles.scss';

const selectProvider = type => ({
  createable: CreatableSelect,
})[type] || ReactSelect;

export class Select extends React.Component {
  isMounted = true;
  state = {
    isLoading: true,
    allOptions: this.props.options,
    promises: {},
  };

  componentDidMount() {
    if (!this.props.loadOptions) {
      this.setState({ isLoading: false });
    } else {
      return this.updateOptions();
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.options, prevProps.options)) {
      if (!this.props.options.map(({ value }) => value).includes(this.props.value)) {
        this.props.onChange(undefined);
      }

      this.setState({ allOptions: this.props.options });
    }

    if (this.props.loadOptions && fnToString(this.props.loadOptions) !== fnToString(prevProps.loadOptions)){
      return this.updateOptions();
    }
  }

  updateOptions = () => {
    this.setState({ isLoading: true });

    return this.props.loadOptions().then(data => {
      if (Array.isArray(this.props.value)) {
        const selectValue = this.props.value.filter(value => typeof value === 'object'
          ? data.find((option) => value.value === option.value)
          : data.find((option) => value === option.value));
        this.props.onChange(selectValue.length === 0 ? undefined : selectValue);
      } else if (!data.find(({ value }) => value === this.props.value)) {
        this.props.onChange(undefined);
      }

      return this.setState({
        allOptions: data,
        isLoading: false,
        promises: {},
      });
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  onInputChange = value => {
    if (this.props.loadOptions && this.state.promises[value] === undefined) {
      this.setState(prevState => ({ promises: { ...prevState.promises, [value]: true }}));
      this.props.loadOptions(value).then(options => {
        if (this.isMounted) {
          this.setState(prevState => ({
            promises: { ...prevState.promises, [value]: false },
            allOptions: [
              ...prevState.allOptions,
              ...options.filter(({ value }) => !prevState.allOptions.find(option => option.value === value)) ],
          }));
        }
      }).catch(error => {
        this.setState(prevState => ({ promises: { ...prevState.promises, [value]: false }}));
        throw error;
      });
    }
  }

  renderNoOptionsMessage = () => Object.values(this.state.promises).some(value => value)
    ? () => this.props.updatingMessage
    : () => this.props.noOptionsMessage;

  render() {
    const { selectVariant, loadOptions, loadingMessage, noOptionsMessage, menuIsPortal, ...props } = this.props;
    const { isLoading, allOptions } = this.state;
    const Select = selectProvider(selectVariant);
    const isSearchable = selectVariant === 'createable' || props.isSearchable;
    const simpleValue = selectVariant === 'createable' ? false : props.simpleValue;
    if (isLoading){
      return (<Select
        className="ddorg__pf4-component-mapper__select"
        classNamePrefix="ddorg__pf4-component-mapper__select"
        isDisabled={ true }
        placeholder={ loadingMessage }
        options={ allOptions }
      />);
    }

    const menuPortalTarget = menuIsPortal ? document.body : undefined;

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
        isFetching={ Object.values(this.state.promises).some(value => value) }
        noOptionsMessage={ this.renderNoOptionsMessage() }
        onInputChange={ this.onInputChange }
        menuPortalTarget={ menuPortalTarget }
        { ...props }
        className={ `ddorg__pf4-component-mapper__select${props.isMulti ? ' multi-select' : ' single-select'}` }
        classNamePrefix="ddorg__pf4-component-mapper__select"
        styles={{
          menuPortal: provided => ({
            ...provided,
            'z-index': 'initial',
          }),
        }}
        onChange={ (option) => {
          const o =  !option && props.isMulti ? [] : option;
          return simpleValue
            ? props.onChange(props.isMulti
              ? o.map(item => item.value)
              : o ? o.value : undefined)
            : props.onChange(o);} }
        value={ simpleValue ? allOptions.filter(({ value }) => props.isMulti ? props.value.includes(value) : value === props.value) : props.value }
        isSearchable={ isSearchable }
        options={ allOptions }
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
  })),
  onChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.node,
  updatingMessage: PropTypes.node,
  noOptionsMessage: PropTypes.func,
  menuIsPortal: PropTypes.bool,
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
};

const DataDrivenSelect = ({ multi, ...props }) => (
  <Select
    hideSelectedOptions={ false }
    isMulti={ multi }
    { ...props }
    closeMenuOnSelect={ !multi }
  />
);

DataDrivenSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
};

DataDrivenSelect.defaultProps = {
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false,
};

export default DataDrivenSelect;
