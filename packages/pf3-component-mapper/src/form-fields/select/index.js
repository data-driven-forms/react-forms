import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';
import customStyles from './select-styles';
import { selectChange, getSelectSimpleValue } from './select-helper';
import './react-select.scss';

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
      isSearchable,
      isDisabled,
      isReadOnly,
      loadingMessage,
      simpleValue,
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
      onChange={ option => selectChange(input.onChange, option, rest.multi, simpleValue) }
      value={ simpleValue ? getSelectSimpleValue(options, rest.multi, input.value) : input.value }
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
