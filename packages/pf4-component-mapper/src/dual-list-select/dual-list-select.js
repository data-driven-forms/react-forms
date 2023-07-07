import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DualListSelector } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash/isEqual';

import DualListTree from '../dual-list-tree-select/dual-list-tree-select';

import FormGroup from '../form-group';
import DualListContext from '../dual-list-context';

const DualList = (props) => {
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
    options,
    getValueFromNode,
    isSearchable,
    isSortable,
    ...rest
  } = useFieldApi({
    ...props,
    FieldProps: {
      isEqual: (current, initial) => isEqual([...(current || [])].sort(), [...(initial || [])].sort()),
    },
  });

  const [sortConfig, setSortConfig] = useState(() => ({ left: isSortable && 'asc', right: isSortable && 'asc' }));

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

    onListChange = (_e, _newLeft, newRight) => {
      input.onChange(newRight);
    };

    filterOption = (option, input) => (option.value ? option.value.includes(input) : option.includes(input));
  } else {
    leftOptions = options
      .filter((option) => (option.value ? !value.includes(option.value) : !value.includes(getValueFromNode(option))))
      .map((option) => option.label || option);

    rightOptions = options
      .filter((option) => (option.value ? value.includes(option.value) : value.includes(getValueFromNode(option))))
      .map((option) => option.label || option);

    onListChange = (_e, _newLeft, newRight) => {
      input.onChange(newRight?.map(getValueFromNode));
    };

    filterOption = (option, input) => (option.value ? option.value.includes(input) : getValueFromNode(option).includes(input));
  }

  if (isSortable) {
    const sort = (direction, a, b) => (direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

    if (!getValueFromNode) {
      leftOptions = leftOptions.sort((a, b) => sort(sortConfig.left, a.label || a, b.label || b));
      rightOptions = rightOptions.sort((a, b) => sort(sortConfig.right, a.label || a, b.label || b));
    } else {
      leftOptions = leftOptions.sort((a, b) => sort(sortConfig.left, getValueFromNode(a.label || a), getValueFromNode(b.label || b)));
      rightOptions = rightOptions.sort((a, b) => sort(sortConfig.right, getValueFromNode(a.label || a), getValueFromNode(b.label || b)));
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
            addAll: onListChange,
            addSelected: onListChange,
            filterOption,
            removeAll: onListChange,
            removeSelected: onListChange,
          })}
          {...rest}
        />
      </DualListContext.Provider>
    </FormGroup>
  );
};

DualList.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  getValueFromNode: PropTypes.func,
  isSearchable: PropTypes.bool,
  isSortable: PropTypes.bool,
};

const DualListWrapper = (props) => (props.isTree ? <DualListTree {...props} /> : <DualList {...props} />);

DualListWrapper.propTypes = {
  isTree: PropTypes.bool,
};

export default DualListWrapper;
