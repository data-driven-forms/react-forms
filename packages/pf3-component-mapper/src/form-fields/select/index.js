import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';
import customStyles from './select-styles';
import isEqual from 'lodash/isEqual';
import './react-select.scss';

const prepareFunction = (fn = '') => fn.toString().replace(/\s+/g, ' ');

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
    .then((data) => this.setState({
      options: data,
      isLoading: false,
    }));
  }

  componentDidMount(){
    const { loadOptions } = this.props;

    if (loadOptions) {
      return this.updateOptions();
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.options, prevProps.options)) {
      this.setState({ options: this.props.options });
    }

    if (this.props.loadOptions && prepareFunction(this.props.loadOptions) !== prepareFunction(prevProps.loadOptions)){
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
      ...rest
    } = this.props;

    const { options, isLoading } = this.state;

    if (isLoading) {
      return <ReactSelect
        className={ `final-form-select ${invalid ? 'has-error' : ''}` }
        styles={ customStyles }
        placeholder={ loadingMessage }
        isDisabled={ true }
      />;
    }

    return <ReactSelect
      className={ `final-form-select ${invalid ? 'has-error' : ''}` }
      styles={ customStyles }
      { ...input }
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
      value={ simpleValue ? options.filter(({ value }) => rest.multi ? input.value.includes(value) : value === input.value) : input.value }
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
};

Select.defaultProps = {
  input: {
    value: [],
  },
  loadingMessage: 'Loading...',
  simpleValue: true,
};

export default Select;
