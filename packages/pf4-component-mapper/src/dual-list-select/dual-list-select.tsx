import React, { useState } from 'react';
import { DualListSelector, DualListSelectorProps } from '@patternfly/react-core/deprecated';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash/isEqual';

import DualListTree from '../dual-list-tree-select/dual-list-tree-select';

import FormGroup from '../form-group/form-group';
import DualListContext from '../dual-list-context/dual-list-context';
import { BaseFieldProps, DualListSelectProps } from '../types';

const DualList: React.FC<BaseFieldProps<DualListSelectProps>> = (props) => {
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
    getValueFromNode,
    isSearchable,
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

  let leftOptions: DualListSelectorProps['availableOptions'];
  let rightOptions: DualListSelectorProps['chosenOptions'];
  let onListChange: (event: any, newLeft: any[], newRight: any[]) => void;
  let filterOption: (option: any, input: string) => boolean;

  if (!getValueFromNode) {
    leftOptions = options
      .filter((option: any) => (typeof option === 'object' ? !value.includes(option.value) : !value.includes(option)))
      .map((option: any) => option.label || option);

    rightOptions = options
      .filter((option: any) => (typeof option === 'object' ? value.includes(option.value) : value.includes(option)))
      .map((option: any) => option.label || option);

    onListChange = (_e: any, _newLeft: any[], newRight: any[]) => {
      input.onChange(newRight);
    };

    filterOption = (option: any, inputStr: string) => (option.value ? option.value.includes(inputStr) : option.includes(inputStr));
  } else {
    leftOptions = options
      .filter((option: any) => (option.value ? !value.includes(option.value) : !value.includes(getValueFromNode(option))))
      .map((option: any) => option.label || option);

    rightOptions = options
      .filter((option: any) => (option.value ? value.includes(option.value) : value.includes(getValueFromNode(option))))
      .map((option: any) => option.label || option);

    onListChange = (_e: any, _newLeft: any[], newRight: any[]) => {
      input.onChange(newRight?.map(getValueFromNode));
    };

    filterOption = (option: any, inputStr: string) => (option.value ? option.value.includes(inputStr) : getValueFromNode(option).includes(inputStr));
  }

  if (isSortable) {
    const sort = (direction: string, a: string, b: string) => (direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

    if (!getValueFromNode) {
      leftOptions = leftOptions.sort((a: any, b: any) => sort(sortConfig.left, a.label || a, b.label || b));
      rightOptions = rightOptions.sort((a: any, b: any) => sort(sortConfig.right, a.label || a, b.label || b));
    } else {
      leftOptions = leftOptions.sort((a: any, b: any) => sort(sortConfig.left, getValueFromNode(a.label || a), getValueFromNode(b.label || b)));
      rightOptions = rightOptions.sort((a: any, b: any) => sort(sortConfig.right, getValueFromNode(a.label || a), getValueFromNode(b.label || b)));
    }
  }

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
          availableOptions={leftOptions}
          chosenOptions={rightOptions}
          onListChange={onListChange}
          id={id || input.name}
          isSearchable={isSearchable}
          {...(getValueFromNode && {
            filterOption,
          })}
          {...rest}
        />
      </DualListContext.Provider>
    </FormGroup>
  );
};

const DualListWrapper: React.FC<BaseFieldProps<DualListSelectProps> & { isTree?: boolean }> = (props) =>
  props.isTree ? <DualListTree {...props} /> : <DualList {...props} />;

export default DualListWrapper;
