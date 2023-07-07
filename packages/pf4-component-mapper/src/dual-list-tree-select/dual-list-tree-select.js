import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DualListSelector } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash/isEqual';

import FormGroup from '../form-group';
import DualListContext from '../dual-list-context';

export const convertOptions = (options, sort) => {
  if (Array.isArray(options)) {
    let result = options.map((option) => convertOptions(option, sort)).filter(Boolean);

    if (sort) {
      const sortFn = (a, b) => (sort === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

      result = result.sort((a, b) => sortFn(a.text || a.label, b.text || b.label));
    }

    return result;
  }

  return {
    text: options.label,
    id: options.value || options.key || options.label || options.text,
    isChecked: false,
    ...options,
    ...(options.children && { children: convertOptions(options.children, sort).filter(Boolean) }),
  };
};

export const selectedOptions = (options, value, selected) => {
  if (Array.isArray(options)) {
    return options.map((option) => selectedOptions(option, value, selected)).filter(Boolean);
  }

  if (options.value) {
    if (selected ? value.includes(options.value) : !value.includes(options.value)) {
      return options;
    }
  }

  if (options.children) {
    const someSelected = selectedOptions(options.children, value, selected).filter(Boolean);

    if (someSelected.length) {
      return {
        ...options,
        children: someSelected,
      };
    }
  }
};

export const getValueFromSelected = (options, newValue = []) => {
  if (Array.isArray(options)) {
    options.map((option) => getValueFromSelected(option, newValue));
  }

  if (options.value) {
    newValue.push(options.value);
  }

  if (options.children) {
    getValueFromSelected(options.children, newValue);
  }

  return newValue;
};

const DualListTreeSelect = (props) => {
  const { label, isRequired, helperText, meta, validateOnMount, description, hideLabel, id, input, FormGroupProps, options, isSortable, ...rest } =
    useFieldApi({
      ...props,
      FieldProps: {
        isEqual: (current, initial) => isEqual([...(current || [])].sort(), [...(initial || [])].sort()),
      },
    });

  const [sortConfig, setSortConfig] = useState(() => ({ left: isSortable && 'asc', right: isSortable && 'asc' }));

  const value = input.value || [];

  const leftOptions = selectedOptions(options, value, false);
  const rightOptions = selectedOptions(options, value, true);

  const onListChange = (_e, _newLeft, newRight) => input.onChange(getValueFromSelected(newRight));

  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <DualListContext.Provider value={{ sortConfig, setSortConfig }}>
        <DualListSelector
          availableOptions={convertOptions(leftOptions, sortConfig.left)}
          chosenOptions={convertOptions(rightOptions, sortConfig.right)}
          onListChange={onListChange}
          id={id || input.name}
          isTree
          {...rest}
        />
      </DualListContext.Provider>
    </FormGroup>
  );
};

DualListTreeSelect.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  isSearchable: PropTypes.bool,
  isSortable: PropTypes.bool,
};

export default DualListTreeSelect;
