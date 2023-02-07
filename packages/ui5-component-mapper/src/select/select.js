import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import useSelect from '@data-driven-forms/common/use-select';

import { Select as UI5Select, Option } from '@ui5/webcomponents-react';

import FormGroup from '../form-group';
import convertProps from '../convert-props';
import validationError from '../validation-error';

const Select = (props) => {
  const {
    input,
    meta,
    label,
    validateOnMount,
    options,
    loadOptions,
    optionsTransformer,
    simpleValue,
    isMulti,
    pluckSingleValue,
    noValueUpdates,
    isSearchable,
    loadOptionsChangeCounter,
    ...rest
  } = useFieldApi(convertProps(props));

  const {
    value: selectValue,
    onChange,
    isFetching,
    onInputChange,
    state,
  } = useSelect({
    loadOptions,
    optionsTransformer,
    options,
    noValueUpdates,
    onChange: input.onChange,
    value: input.value,
    loadOptionsChangeCounter,
    isSearchable,
    pluckSingleValue,
    isMulti,
    simpleValue: false,
  });

  return (
    <FormGroup label={label}>
      <UI5Select
        {...input}
        onChange={(event) => onChange(event.detail.selectedOption.dataset.id)}
        {...rest}
        {...validationError(meta, validateOnMount)}
      >
        {state.options &&
          state.options.map(({ label, value, ...option }) => (
            <Option key={value} data-id={value} {...option} selected={value === selectValue}>
              {label}
            </Option>
          ))}
      </UI5Select>
    </FormGroup>
  );
};

Select.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    })
  ),
};

export default Select;
