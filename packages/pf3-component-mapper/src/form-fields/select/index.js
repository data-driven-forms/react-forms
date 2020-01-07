import React, { Component, createRef, Fragment } from 'react';
import isEqual from 'lodash/isEqual';
import './react-select.scss';
import PropTypes from 'prop-types';

import DataDrivenSelect from '@data-driven-forms/common/src/select';
import { DropdownButton } from 'patternfly-react';
import fnToString from '@data-driven-forms/common/src/utils/fn-to-string';
import clsx from 'clsx';
import Option from './option';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';
import './react-select.scss';
import { optionsPropType } from '@data-driven-forms/common/src/prop-types-templates';

const getDropdownText = (value, placeholder, options) => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [ placeholder, true ];
    }

    if (typeof value[0] === 'object') {
      return [ value.map(({ label }) => label).join(', '), false ];
    }

    return [ value.map(item => options.find(({ value }) => value === item).label).join(', '), false ];
  }

  if (typeof value === 'object') {
    return [ value.label, false ];
  }

  if (!value) {
    return [ placeholder, true ];
  }

  return [ options.find(option => option.value === value).label, false ];
};

class SearchInput extends Component {
  inputRef = createRef(null);
  componentDidMount() {
    this.inputRef.current.focus();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  componentWillUnmount() {
    this.inputRef.current.blur();
  }

  render() {
    return <input ref={ this.inputRef } type="text" { ...this.props } className="form-control" />;
  }

}

SearchInput.propTypes = {
  value: PropTypes.any,
};

const SelectTitle = ({ title, classNamePrefix, isClearable, value, onClear, isFetching, isDisabled }) => (
  <Fragment>
    <span key="searchable-select-value-label" className={ `${classNamePrefix}-value` }>{ title }</span>
    { isClearable && value && (
      <div
        className={ `${classNamePrefix}-searchebale-clear` }
        onClick={ (event) => {
          event.stopPropagation();
          return onClear(undefined);
        } } >
        <i className="fa fa-times"/>
      </div>
    ) }
    { !isDisabled && isFetching && (
      <i className="ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-circle-o-notch spin" />
    ) }
    { !isDisabled && !isFetching && (
      <i className="ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-angle-down"/>
    ) }
  </Fragment>
);

SelectTitle.propTypes = {
  title: PropTypes.string.isRequired,
  classNamePrefix: PropTypes.string,
  isClearable: PropTypes.bool,
  value: PropTypes.any,
  onClear: PropTypes.func,
  isFetching: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

class Select extends Component {  constructor(props){
  super(props);
  this.state = {
    isFetching: false,
    isOpen: false,
    options: props.options || [],
  };
}
  handleToggleOpen = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))

  componentDidMount(){
    const { loadOptions } = this.props;
    if (loadOptions) {
      return this.updateOptions();
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.options, prevProps.options)) {
      if (!this.props.options.map(({ value }) => value).includes(this.props.input.value)) {
        this.props.input.onChange(undefined);
      }

      this.setState({ options: this.props.options });
    }

    if (this.props.loadOptions && fnToString(this.props.loadOptions) !== fnToString(prevProps.loadOptions)){
      return this.updateOptions();
    }
  }

  updateOptions = () => {
    const { loadOptions } = this.props;

    this.setState({ isFetching: true });

    return loadOptions()
    .then((data) => {
      if (!data.map(({ value }) => value).includes(this.props.input.value)) {
        this.props.input.onChange(undefined);
      }

      return this.setState({
        options: data,
        isFetching: false,
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isOpen !== this.state.isOpen) {
      return true;
    }

    if (nextState.isFetching !== this.state.isFetching) {
      return true;
    }

    if (!isEqual(this.state.options, nextState.options)) {
      return true;
    }

    if (this.props.loadOptions && fnToString(this.props.loadOptions) !== fnToString(nextProps.loadOptions)){
      return true;
    }

    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      return true;
    }

    return false;
  }

  render () {
    const { input, loadOptions, options: _options, ...props } = this.props;
    const { isOpen, options, isFetching } = this.state;
    if (props.isSearchable) {
      const [ title, isPlaceholder ] = getDropdownText(input.value, props.placeholder, options);
      const searchableInput = {
        ...input,
        onChange: props.isMulti || props.multi
          ? input.onChange
          : (...args) => {
            this.handleToggleOpen();
            return input.onChange(...args);
          },
      };
      return (
        <div className={ `${props.classNamePrefix}-button` }>
          <DropdownButton
            onToggle={ () => this.handleToggleOpen() }
            disabled={ props.isDisabled }
            noCaret
            open={ isOpen }
            id={ props.id || input.name }
            title={ <SelectTitle
              isDisabled={ props.isDisabled }
              isFetching={ isFetching }
              classNamePrefix={ this.props.classNamePrefix }
              value={ input.value }
              isClearable={ props.isClearable }
              title={ title }
              onClear={ input.onChange }
            /> }
            className={ clsx(`${props.classNamePrefix}-dropdown`, {
              'is-empty': isPlaceholder,
            }) }>
            { isOpen &&
              <DataDrivenSelect
                isFetching={ isFetching }
                input={ searchableInput }
                { ...props }
                options={ options }
                className={ clsx(props.classNamePrefix, {
                  sercheable: props.isSearchable,
                }) }
                controlShouldRenderValue={ false }
                hideSelectedOptions={ false }
                isClearable={ false }
                tabSelectsValue={ false }
                menuIsOpen
                backspaceRemovesValue={ false }
                isMulti={ props.isMulti || props.multi }
                placeholder="Search..."
                components={{
                  ClearIndicator,
                  Option,
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                  Placeholder: () => null,
                  Input: ({ selectProps, cx, isHidden, isDisabled, innerRef, getStyles, ...props }) =>
                    <SearchInput id={ this.props.input.name } { ...props } />,
                }} /> }
          </DropdownButton>
        </div>
      );
    }

    return (
      <DataDrivenSelect
        { ...this.props }
        isFetching={ isFetching }
        options={ options }
        input={ input }
        className={ props.classNamePrefix }
        components={{
          ClearIndicator,
          Option,
          DropdownIndicator: props.isDisabled ? null : DropdownIndicator,
        }}
      />
    );

  }
}

Select.defaultProps = {
  placeholder: 'Search...',
};

Select.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
  }).isRequired,
  classNamePrefix: PropTypes.string,
  loadOptions: PropTypes.func,
  options: optionsPropType,
};

export default Select;
