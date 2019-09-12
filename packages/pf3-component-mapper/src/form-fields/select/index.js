import React, { Component } from 'react';
import ReactSelect, { components } from 'react-select';
import PropTypes from 'prop-types';

import { SelectPropTypes, SelectDefaultProps } from '@data-driven-forms/common/src/select-proptypes';
import { ChildrenPropTypes } from '@data-driven-forms/common/src/children-proptype';

import customStyles from './select-styles';
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

ValueContainer.propTypes = {
  ...ChildrenPropTypes,
  isMulti: PropTypes.bool,
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
  ...SelectPropTypes,
};

Select.defaultProps = {
  ...SelectDefaultProps,
};

export default Select;
