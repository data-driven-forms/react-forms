import React from 'react';
import { Checkbox } from '@patternfly/react-core';
import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group/form-group';
import { SelectOption, FieldMeta } from '../types';

interface FinalCheckboxProps {
  value: any;
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (value: any) => void;
  'aria-label'?: string;
  id?: string;
  isDisabled?: boolean;
  option?: SelectOption;
  [key: string]: any;
}

const FinalCheckbox: React.FC<FinalCheckboxProps> = ({ value, label, name, checked, onChange, option, ...props }) => (
  <Checkbox
    isChecked={checked}
    {...props}
    onChange={(e, _value) => onChange?.(value)}
    label={label}
    name={name}
    id={props.id || `checkbox-${value || label}`}
  />
);

interface WrapperProps {
  meta: FieldMeta;
  children: React.ReactNode;
  name?: string;
  id?: string;
  [key: string]: any;
}

const Wrapper: React.FC<WrapperProps> = ({ meta, children, ...rest }) => (
  <FormGroup {...rest} id={rest.name || rest.id} meta={meta}>
    {children}
  </FormGroup>
);

export interface MultipleChoiceListProps {
  options: SelectOption[];
  name?: string;
  component?: string;
  [key: string]: any;
}

const MultipleChoiceList: React.FC<MultipleChoiceListProps> = ({ options, name, component, ...rest }) => (
  <MultipleChoiceListCommon {...rest} options={options} name={name} component={component} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
);

export default MultipleChoiceList;
