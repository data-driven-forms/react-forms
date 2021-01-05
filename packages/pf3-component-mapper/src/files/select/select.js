import React, { Component, createRef, Fragment, useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import './react-select.scss';
import PropTypes from 'prop-types';
import { optionsPropType } from '@data-driven-forms/common/prop-types-templates';
import fnToString from '@data-driven-forms/common/utils/fn-to-string';
import DataDrivenSelect from '@data-driven-forms/common/select';
import useIsMounted from '@data-driven-forms/common/hooks/use-is-mounted';
import { DropdownButton } from 'patternfly-react';
import clsx from 'clsx';

import Option from './option';
import DropdownIndicator from './dropdown-indicator';
import ClearIndicator from './clear-indicator';

const sanitizeNullValue = (value) => {
  if (value === null) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeNullValue(item));
  }

  if (typeof value === 'object') {
    return {
      ...value,
      value: value.value === null ? '' : value.value
    };
  }

  return value;
};

const getDropdownText = (value, placeholder, options) => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [placeholder, true];
    }

    if (typeof value[0] === 'object') {
      return [value.map(({ label }) => label).join(', '), false];
    }

    return [value.map((item) => options.find(({ value }) => value === item).label).join(', '), false];
  }

  if (typeof value === 'object') {
    return [value.label, false];
  }

  if (!value) {
    return [placeholder, true];
  }

  const selectedOption = options.find((option) => option.value === value);
  if (!selectedOption) {
    return [placeholder, true];
  }

  return [selectedOption.label, false];
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
    return <input ref={this.inputRef} type="text" {...this.props} className="form-control" />;
  }
}

SearchInput.propTypes = {
  value: PropTypes.any
};

const SelectTitle = ({ title, classNamePrefix, isClearable, value, onClear, isFetching, isDisabled }) => (
  <Fragment>
    <span key="searchable-select-value-label" className={`${classNamePrefix}-value`}>
      {title}
    </span>
    {isClearable && value && (
      <div
        className={`${classNamePrefix}-searchebale-clear`}
        onClick={(event) => {
          event.stopPropagation();
          return onClear(undefined);
        }}
      >
        <i className="fa fa-times" />
      </div>
    )}
    {!isDisabled && isFetching && <i className="ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-circle-o-notch spin" />}
    {!isDisabled && !isFetching && <i className="ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-angle-down" />}
  </Fragment>
);

SelectTitle.propTypes = {
  title: PropTypes.node.isRequired,
  classNamePrefix: PropTypes.string,
  isClearable: PropTypes.bool,
  value: PropTypes.any,
  onClear: PropTypes.func,
  isFetching: PropTypes.bool,
  isDisabled: PropTypes.bool
};

const Select = ({ input, loadOptions, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setFetching] = useState(loadOptions ? true : false);
  const [options, setOptions] = useState(props.options || []);
  const isMounted = useIsMounted();

  // common select controls the string of loadOptions and if the string changed, then it reloads options
  // however we are enhancing the loadOptions here so the string is always the same
  // by increasing this counter, we can enforce the update
  const [loadOptionsChangeCounter, setCounter] = useState(0);

  const handleToggleOpen = () => setIsOpen(!isOpen);

  const loadOptionsStr = fnToString(loadOptions);

  useEffect(() => {
    setCounter(loadOptionsChangeCounter + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadOptionsStr]);

  const loadOptionsEnhanced = loadOptions
    ? (value) => {
        if (isMounted.current) {
          setFetching(true);
        }

        return loadOptions(value).then((data) => {
          if (isMounted.current) {
            setOptions([...options, ...data.filter(({ value }) => !options.find((option) => option.value === value))]);
            setFetching(false);
          }

          return data;
        });
      }
    : undefined;

  if (props.isSearchable) {
    const [title, isPlaceholder] = getDropdownText(input.value, isFetching ? props.loadingMessage : props.placeholder, options);
    const searchableInput = {
      ...input,
      onChange: props.isMulti
        ? input.onChange
        : (...args) => {
            handleToggleOpen();
            return input.onChange(...args);
          }
    };
    return (
      <div className={`${props.classNamePrefix}-button`}>
        <DropdownButton
          onToggle={() => handleToggleOpen()}
          disabled={props.isDisabled}
          noCaret
          open={isOpen}
          id={props.id || input.name}
          title={
            <SelectTitle
              isDisabled={props.isDisabled}
              isFetching={isFetching}
              classNamePrefix={props.classNamePrefix}
              value={input.value}
              isClearable={props.isClearable}
              title={title}
              onClear={input.onChange}
            />
          }
          className={clsx(`${props.classNamePrefix}-dropdown`, {
            'is-empty': isPlaceholder
          })}
        >
          <DataDrivenSelect
            SelectComponent={({ value, ...props }) => <ReactSelect value={sanitizeNullValue(value)} {...props} />}
            {...searchableInput}
            {...props}
            loadOptions={loadOptionsEnhanced}
            className={clsx(props.classNamePrefix, {
              sercheable: props.isSearchable
            })}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isClearable={false}
            tabSelectsValue={false}
            menuIsOpen
            backspaceRemovesValue={false}
            isMulti={props.isMulti}
            loadOptionsChangeCounter={loadOptionsChangeCounter}
            placeholder="Search..."
            components={{
              ClearIndicator,
              Option,
              DropdownIndicator: null,
              IndicatorSeparator: null,
              Placeholder: () => null,
              // eslint-disable-next-line react/prop-types
              Input: ({ selectProps, cx, isHidden, isDisabled, innerRef, getStyles, ...props }) => <SearchInput id={input.name} {...props} />
            }}
          />
        </DropdownButton>
      </div>
    );
  }

  return (
    <DataDrivenSelect
      SelectComponent={({ value, ...props }) => <ReactSelect value={sanitizeNullValue(value)} {...props} />}
      {...props}
      {...input}
      loadOptionsChangeCounter={loadOptionsChangeCounter}
      loadOptions={loadOptionsEnhanced}
      className={props.classNamePrefix}
      components={{
        ClearIndicator,
        Option,
        DropdownIndicator: props.isDisabled ? null : DropdownIndicator
      }}
    />
  );
};

Select.defaultProps = {
  placeholder: 'Search...',
  classNamePrefix: 'ddorg__pf3-component-mapper__select',
  loadingMessage: 'Loading...',
  updatingMessage: 'Loading data'
};

Select.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any
  }).isRequired,
  classNamePrefix: PropTypes.string,
  loadOptions: PropTypes.func,
  options: optionsPropType,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  id: PropTypes.string,
  placeholder: PropTypes.node,
  loadingMessage: PropTypes.node
};

export default Select;
