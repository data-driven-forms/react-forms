import React, { useState } from 'react';
import { DualListSelector } from '@patternfly/react-core/deprecated';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash/isEqual';

import FormGroup from '../form-group/form-group';
import DualListContext from '../dual-list-context/dual-list-context';
import { BaseFieldProps, DualListSelectProps } from '../types';

export const convertOptions = (options: any, sort?: string): any => {
  if (Array.isArray(options)) {
    let result = options.map((option: any) => convertOptions(option, sort)).filter(Boolean);

    if (sort) {
      const sortFn = (a: any, b: any) => (sort === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

      result = result.sort((a: any, b: any) => sortFn(a.text || a.label, b.text || b.label));
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

export const selectedOptions = (options: any, value: any[], selected: boolean): any => {
  if (Array.isArray(options)) {
    return options.map((option: any) => selectedOptions(option, value, selected)).filter(Boolean);
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

export const getValueFromSelected = (options: any, newValue: any[] = []): any[] => {
  if (Array.isArray(options)) {
    options.map((option: any) => getValueFromSelected(option, newValue));
  }

  if (options.value) {
    newValue.push(options.value);
  }

  if (options.children) {
    getValueFromSelected(options.children, newValue);
  }

  return newValue;
};

const DualListTreeSelect: React.FC<BaseFieldProps<DualListSelectProps>> = (props) => {
  const {
    label,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    hideLabel,
    id,
    input,
    FormGroupProps,
    options = [],
    isSortable,
    ...rest
  } = useFieldApi({
    ...props,
    FieldProps: {
      isEqual: (current: any, initial: any) => isEqual([...(current || [])].sort(), [...(initial || [])].sort()),
    },
  });

  const [sortConfig, setSortConfig] = useState(() => ({ left: isSortable && 'asc', right: isSortable && 'asc' }));

  const value = input.value || [];

  const leftOptions = selectedOptions(options, value, false);
  const rightOptions = selectedOptions(options, value, true);

  const onListChange = (_e: any, _newLeft: any, newRight: any) => input.onChange(getValueFromSelected(newRight));

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

export default DualListTreeSelect;
