import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import ReactSelect, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { TimesCircleIcon, CaretDownIcon, CheckIcon } from '@patternfly/react-icons';

import selectStyles from './select-styles';
import './select-styles.scss';

const Input = props => <components.Input { ...props } isMulti={ props.selectProps.isMulti } />;

Input.propTypes = {
  isHidden: PropTypes.bool,
  selectProps: PropTypes.shape({
    isMulti: PropTypes.bool,
  }).isRequired,
};

const MultiValueContainer = (props, ...rest) => (
  <div className="pf4-ddforms-multiselect-chip" title={ props.data.label }>
    <span>{ props.children[0] }</span>
    <span className="multi-value-remove-button">{ props.children[1] }</span>
  </div>
);

MultiValueContainer.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
  data: PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired,
};

const MultiValueRemove = props => (
  <components.MultiValueRemove { ...props }>
    <TimesCircleIcon style={{ fontSize: 12 }} />
  </components.MultiValueRemove>
);

const CHIP_CLEAR_BACKGROUND_COLOR = '#72767b';
const CHIP_CLEAR_BACKGROUND_HOVER_COLOR = '#151515';

class ClearIndicator extends Component {
  state = {
    fill: CHIP_CLEAR_BACKGROUND_COLOR,
  }
  render() {
    const { innerProps: { ref, ...restInnerProps }} = this.props;
    const { fill } = this.state;
    return (
      <TimesCircleIcon
        { ...restInnerProps }
        onClick={ this.props.clearValue }
        onMouseEnter={ () => this.setState(() => ({ fill: CHIP_CLEAR_BACKGROUND_HOVER_COLOR })) }
        onMouseLeave={ () => this.setState(() => ({ fill: CHIP_CLEAR_BACKGROUND_COLOR })) }
        fill={ fill }
        { ...this.props.getStyles('clearIndicator', this.props) }
      />
    );
  }
}

ClearIndicator.propTypes = {
  innerProps: PropTypes.object.isRequired,
  clearValue: PropTypes.func.isRequired,
  getStyles: PropTypes.func.isRequired,
};

class ValueContainer extends Component {
  state = {
    showAll: false,
  }
  render () {
    const { isMulti, ...props } = this.props;
    const { showAll } = this.state;
    if (isMulti) {
      return (
        <div className="pf4-ddforms-multi-value">
          { showAll ? props.children[0] : props.children[0] && props.children[0][0] ? props.children[0][0] : props.children[0] }
          { props.children[0] && props.children[0].length > 1 && (
            <Button
              className="pf4-ddforms-multiselect-chipgroup-button"
              onClick={ () => this.setState(({ showAll }) => ({ showAll: !showAll })) }
              variant="plain"
            >
              <span>{ showAll ? props.selectProps.showLessLabel : `${ props.children[0].length - 1 } ${props.selectProps.showMoreLabel}` }</span>
            </Button>
          ) }
          { props.children[1] && props.children[1] }
        </div>
      );
    }

    return props.children;
  }
}

ValueContainer.propTypes = {
  isMulti: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

const DropdownIndicator = () => {
  return <CaretDownIcon style={{ marginLeft: 8, marginRight: 8 }} />;
};

const Option = props => {
  return (
    <div
      className={ `pf4-ddforms-select-menu-option ${
        props.isFocused ? 'focused' : ''
      }` }
    >
      <components.Option { ...props } />
      { props.isSelected && (
        <CheckIcon size="sm" fill="#06c" style={{ paddingRight: 8 }} />
      ) }
    </div>
  );
};

Option.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

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
        styles={ selectStyles }
        isDisabled={ true }
        placeholder={ loadingMessage }
      />);
    }

    return (
      <Select
        styles={ selectStyles }
        menuPlacement="auto"
        components={{
          MultiValueContainer,
          ValueContainer,
          MultiValueRemove,
          DropdownIndicator,
          ClearIndicator,
          Option,
          Input,
        }}
        { ...props }
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
