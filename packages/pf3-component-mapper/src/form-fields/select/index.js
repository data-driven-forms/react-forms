import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';
import customStyles from './select-styles';
import isEqual from 'lodash/isEqual';
import './react-select.scss';

/**
 * New implementation of select of PF3
 */

import NewSelect from '@data-driven-forms/common/src/select';
import Option from './option';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';
import { DropdownButton, FormControl } from 'patternfly-react';
import clsx from 'clsx';
import './react-select.scss';

const fnToString = (fn = '') => fn.toString().replace(/\s+/g, ' ');

const ValueContainer = ({ children, ...props }) => {
  if (props.isMulti) {
    return (
      <components.ValueContainer { ...props }>
        <div className="pf3-select_multi-values-wrapper">
          { children[0] }
        </div>
        { children.slice(1) }
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer { ...props }>
      { children }
    </components.ValueContainer>
  );
};

class Select extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      options: props.options || [],
    };
  }

  updateOptions = () => {
    const { loadOptions } = this.props;

    this.setState({ isLoading: true });

    return loadOptions()
    .then((data) => {
      if (!data.map(({ value }) => value).includes(this.props.input.value)) {
        this.props.input.onChange(undefined);
      }

      return this.setState({
        options: data,
        isLoading: false,
      });
    });
  }

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

  render() {
    const {
      invalid,
      input,
      placeholder,
      isSearchable,
      isDisabled,
      isReadOnly,
      loadingMessage,
      simpleValue,
      options: _options, // catch options from props, if they are undefined (bcs they would overwrite the state)
      pluckSingleValue,
      ...rest
    } = this.props;

    const { options, isLoading } = this.state;
    const { value, ...inputRest } = input;

    if (isLoading) {
      return <ReactSelect
        className={ `final-form-select ${invalid ? 'has-error' : ''}` }
        styles={ customStyles }
        placeholder={ loadingMessage }
        isDisabled={ true }
      />;
    }

    const selectValue = pluckSingleValue ? rest.multi ? value : Array.isArray(value) && value[0] ? value[0] : value : value;

    return <ReactSelect
      className={ `final-form-select ${invalid ? 'has-error' : ''}` }
      styles={ customStyles }
      { ...inputRest }
      options={ options }
      placeholder={ placeholder || 'Please choose' }
      isMulti={ rest.multi }
      isSearchable={ !!isSearchable }
      isClearable={ false }
      hideSelectedOptions={ false }
      closeMenuOnSelect={ !rest.multi }
      noOptionsMessage={ () => 'No option found' }
      isDisabled={ isDisabled || isReadOnly }
      components={{
        ValueContainer,
      }}
      onChange={ option => simpleValue
        ? input.onChange(rest.multi
          ? option.map(item => item.value)
          : option ? option.value : undefined)
        : input.onChange(option) }
      value={ simpleValue ? options.filter(({ value }) => rest.multi ? input.value.includes(value) : isEqual(value, selectValue)) : selectValue }
      { ...rest }
    />;
  }
}

Select.propTypes = {
  simpleValue: PropTypes.bool,
  loadOptions: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
  })),
  invalid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.any,
    ]),
  }),
  initialValue: PropTypes.any,
  placeholder: PropTypes.string,
  rest: PropTypes.any,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  loadingMessage: PropTypes.string,
  pluckSingleValue: PropTypes.bool,
};

Select.defaultProps = {
  input: {
    value: [],
  },
  loadingMessage: 'Loading...',
  simpleValue: true,
  pluckSingleValue: true,
};

export default Select;

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

const SelectTitle = ({ title, classNamePrefix, isClearable, value, onClear }) => (
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
  </Fragment>
);

export class P3Select extends Component {
  state = {
    isOpen: false,
  }
  handleToggleOpen = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))

  componentDidUpdate(prevProps, prevState) {
    //console.log('root update', prevState, this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isOpen !== this.state.isOpen) {
      return true;
    }

    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      return true;
    }

    return false;
  }

  render () {
    const { input, ...props } = this.props;
    const { isOpen } = this.state;
    const [ title, isPlaceholder ] = getDropdownText(input.value, props.placeholder, props.options);
    if (props.isSearchable) {
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
            noCaret={ props.isDisabled }
            open={ isOpen }
            id={ props.id || props.input.name }
            title={ <SelectTitle
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
            <NewSelect
              input={ searchableInput }
              { ...props }
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
      <NewSelect
        { ...this.props }
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
