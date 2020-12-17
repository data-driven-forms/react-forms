import React from 'react';
import PropTypes from 'prop-types';
import { DualListSelector } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash/isEqual';

import './dual-list-select.scss';
import FormGroup from '../common/form-group';

const DualList = (props) => {
  const { label, isRequired, helperText, meta, description, hideLabel, id, input, FormGroupProps, options, getValueFromNode, ...rest } = useFieldApi({
    ...props,
    isEqual: (current, initial) => isEqual([...(current || [])].sort(), [...(initial || [])].sort())
  });

  const value = input.value || [];

  let leftOptions;
  let rightOptions;
  let onListChange;
  let filterOption;

  if (!getValueFromNode) {
    leftOptions = options
      .filter((option) => (typeof option === 'object' ? !value.includes(option.value) : !value.includes(option)))
      .map((option) => option.label || option);

    rightOptions = options
      .filter((option) => (typeof option === 'object' ? value.includes(option.value) : value.includes(option)))
      .map((option) => option.label || option);

    onListChange = (_newLeft, newRight) => input.onChange(newRight);

    filterOption = (option, input) => (option.value ? option.value.includes(input) : option.includes(input));
  } else {
    leftOptions = options
      .filter((option) => (option.value ? !value.includes(option.value) : !value.includes(getValueFromNode(option))))
      .map((option) => option.label || option);

    rightOptions = options
      .filter((option) => (option.value ? value.includes(option.value) : value.includes(getValueFromNode(option))))
      .map((option) => option.label || option);

    onListChange = (_newLeft, newRight) => input.onChange(newRight?.map(getValueFromNode));

    filterOption = (option, input) => (option.value ? option.value.includes(input) : getValueFromNode(option).includes(input));
  }

  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <DualListSelector
        availableOptions={leftOptions}
        chosenOptions={rightOptions}
        onListChange={onListChange}
        id={id || input.name}
        isSearchable
        {...(getValueFromNode && {
          addAll: onListChange,
          addSelected: onListChange,
          filterOption,
          onOptionSelect: onListChange,
          removeAll: onListChange,
          removeSelected: onListChange
        })}
        {...rest}
      />
      {JSON.stringify(input.value, null, 2)}
    </FormGroup>
  );
};

DualList.propTypes = {
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  getValueFromNode: PropTypes.func
};

export default DualList;
