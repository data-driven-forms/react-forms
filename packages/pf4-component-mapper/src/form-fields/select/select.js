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
    const { loadOptions } = this.props;
    if (!loadOptions) {
      this.setState({
        isLoading: false,
      });
    } else {
      return loadOptions()
      .then((data) => {
        return this.setState({
          allOptions: data,
          isLoading: false,
        });});
    }
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
    const { selectVariant, loadOptions, loadingMessage, noOptionsMessage, ... props } = this.props;
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
        { ...props }
        className={ `ddorg__pf4-component-mapper__select${props.isMulti ? ' multi-select' : ' single-select'}` }
        classNamePrefix="ddorg__pf4-component-mapper__select"
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
};

Select.defaultProps = {
  selectVariant: 'default',
  showMoreLabel: 'more',
  showLessLabel: 'Show less',
  simpleValue: true,
  loadingMessage: 'Loading...',
  updatingMessage: 'Loading data...',
  options: [],
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
