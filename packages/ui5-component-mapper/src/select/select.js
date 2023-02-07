import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import useSelect from '@data-driven-forms/common/use-select';

import { Select as UI5Select, Option, ComboBox, ComboBoxItem, MultiComboBox, MultiComboBoxItem } from '@ui5/webcomponents-react';

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

  if (isMulti) {
    return (
      <FormGroup label={label}>
        <MultiComboBox
          loading={state.isLoading || isFetching}
          onInput={(event) => onInputChange(event.target.value)}
          onSelectionChange={(event) =>
            onChange(
              event.target.items.filter((item) => item.selected).map((item) => state.options.find((option) => option.label === item.text)?.value)
            )
          }
          {...rest}
          {...validationError(meta, validateOnMount)}
        >
          {state.options &&
            state.options.map(({ label, value, ...option }) => (
              <MultiComboBoxItem key={value} text={label} {...option} selected={(selectValue || []).includes(value)} />
            ))}
        </MultiComboBox>
      </FormGroup>
    );
  }

  if (isSearchable) {
    return (
      <FormGroup label={label}>
        <ComboBox
          {...input}
          loading={state.isLoading || isFetching}
          value={
            !selectValue ? state.options.find((option) => !option.value)?.label : state.options.find((option) => option.value === selectValue)?.label
          }
          onInput={(event) => onInputChange(event.target.value)}
          onChange={(event) => onChange(state.options.find((option) => option.label === event.target.value)?.value)}
          {...rest}
          {...validationError(meta, validateOnMount)}
        >
          {state.options && state.options.map(({ label, value, ...option }) => <ComboBoxItem key={value} text={label} {...option} />)}
        </ComboBox>
      </FormGroup>
    );
  }

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
