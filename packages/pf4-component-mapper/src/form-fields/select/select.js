import React from 'react';
import PropTypes from 'prop-types';
import DataDrivenSelect from '@data-driven-forms/common/src/select';

import MultiValueContainer from './multi-value-container';
import ValueContainer from './value-container';
import MultiValueRemove from './multi-value-remove';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';
import Option from './option';

import './select-styles.scss';

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
    const { loadOptions, loadingMessage, noOptionsMessage, ...props } = this.props;
    const { isLoading, allOptions } = this.state;

    return (
      <DataDrivenSelect
        { ...props }
        menuPlacement="auto"
        components={{
          MultiValueContainer,
          ValueContainer,
          MultiValueRemove,
          DropdownIndicator,
          ClearIndicator,
          Option,
        }}
        isFetching={ Object.values(this.state.promises).some(value => value) || isLoading }
        noOptionsMessage={ this.renderNoOptionsMessage() }
        onInputChange={ this.onInputChange }
        className={ `ddorg__pf4-component-mapper__select${(props.isMulti || props.multi) ? ' multi-select' : ' single-select'}` }
        classNamePrefix="ddorg__pf4-component-mapper__select"
        styles={{
          menuPortal: provided => ({
            ...provided,
            'z-index': 'initial',
          }),
        }}
        options={ allOptions }
      />
    );
  }
}

Select.propTypes = {
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.any,
  })),
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }),
  isMulti: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.node,
  updatingMessage: PropTypes.node,
  noOptionsMessage: PropTypes.func,
};

Select.defaultProps = {
  loadingMessage: 'Loading...',
  updatingMessage: 'Loading data...',
  options: [],
  menuIsPortal: false,
};

export default Select;
