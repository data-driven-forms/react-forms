import React from 'react';
import PropTypes from 'prop-types';

import FormGroupWrapper from '../form-group/form-group';

import { Select as BSelect, MultiSelect } from '@blueprintjs/select';
import propsCatcher from '../props-catcher/props-catcher';
import { MenuItem, Button } from '@blueprintjs/core';

export const itemRenderer = (item, { handleClick }, value) => (
  <MenuItem
    key={item.value}
    {...item}
    {...(!item.text && { label: '', text: item.label })}
    onClick={handleClick}
    icon={item.value === value || (Array.isArray(value) && value.includes(item.value)) ? 'tick' : 'blank'}
  />
);

export const multiOnChange = (item, input) =>
  input.value && !input.value.includes(item.value)
    ? input.onChange([...input.value, item.value])
    : input.onChange(input.value ? input.value.filter((v) => v !== item.value) : [item.value]);

export const tagRenderer = (item, options) => {
  const option = options.find(({ value }) => value === item);

  if (option) {
    return option.text || option.label;
  }
};

export const itemPredicate = (query, item) => {
  if (!query) {
    return item;
  }

  if (item.label.toLowerCase().includes(query.toLowerCase())) {
    return item;
  }
};

const Select = ({ input, options, placeholder, isSearchable, noOptionsMessage, isMulti, ...props }) => {
  const Component = isMulti ? MultiSelect : BSelect;

  const selectedOption = options.find(({ value }) => value === input.value);

  return (
    <Component
      itemPredicate={itemPredicate}
      onItemSelect={({ value }) => input.onChange(value)}
      noResults={<MenuItem disabled={true} text={noOptionsMessage} />}
      items={options}
      itemRenderer={(item, args) => itemRenderer(item, args, input.value)}
      filterable={isSearchable}
      {...propsCatcher(props)}
      {...(isMulti && {
        selectedItems: input.value || [],
        tagRenderer: (item) => tagRenderer(item, options),
        onItemSelect: (item) => multiOnChange(item, input),
        tagInputProps: {
          ...props.tagInputProps,
          onRemove: (item) => multiOnChange({ value: item }, input)
        }
      })}
      {...input}
    >
      {!isMulti && <Button text={selectedOption ? selectedOption.label : placeholder} rightIcon="caret-down" disabled={props.disabled} />}
    </Component>
  );
};

Select.propTypes = {
  input: PropTypes.object,
  options: PropTypes.array,
  placeholder: PropTypes.node,
  isSearchable: PropTypes.bool,
  noOptionsMessage: PropTypes.node,
  tagInputProps: PropTypes.object,
  isMulti: PropTypes.bool,
  disabled: PropTypes.bool
};

Select.defaultProps = {
  noOptionsMessage: 'No options found',
  placeholder: 'Please select',
  isSearchable: false
};

const WrapperSelect = (props) => <FormGroupWrapper {...props} Component={Select} />;

export default WrapperSelect;
