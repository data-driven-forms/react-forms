import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';
import customStyles from './select-styles';
import './react-select.scss';

const selectValue = option => option.sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })).map(item => item.value);

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
      isLoading: true,
      options: props.options || [],
    };
  }

  componentDidMount(){
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
    const {
      invalid,
      input,
      placeholder,
      rest,
      isSearchable,
      isDisabled,
      isReadOnly,
      loadingMessage,
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
      value={ options.filter(({ value }) => rest.multi ? input.value.includes(value) : value === input.value) }
      isMulti={ rest.multi }
      isSearchable={ !!isSearchable }
      isClearable={ false }
      hideSelectedOptions={ false }
      closeMenuOnSelect={ !rest.multi }
      noOptionsMessage={ () => 'No option found' }
      isDisabled={ isDisabled || isReadOnly }
      onChange={ option =>
        input.onChange(rest.multi ? selectValue(option) : option ? option.value : undefined) } // eslint-disable-line no-nested-ternary
      components={{
        ValueContainer,
      }}
      { ...rest }
    />;
  }
}

Select.propTypes = {
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
};

export default Select;
