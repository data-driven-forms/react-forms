import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import DataDrivenSelect from './select/select';
import { BaseFieldProps, SelectOption } from '../types';

export interface SelectFieldProps extends BaseFieldProps {
  options?: SelectOption[];
  placeholder?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  isFetching?: boolean;
  noResultsMessage?: string;
  noOptionsMessage?: string;
  loadingMessage?: string;
  updatingMessage?: string;
  showMoreLabel?: string;
  showLessLabel?: string;
  simpleValue?: boolean;
  menuIsPortal?: boolean;
  menuPortalTarget?: Element;
  onInputChange?: (value: string) => void;
  originalOptions?: SelectOption[];
  [key: string]: any;
}

const Select: React.FC<SelectFieldProps> = (props) => {
  const { label, isRequired, helperText, meta, validateOnMount, description, hideLabel, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } =
    useFieldApi(props);

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
      <DataDrivenSelect {...input} {...rest} isDisabled={isDisabled || isReadOnly} />
    </FormGroup>
  );
};

export default Select;

export const InternalSelect = DataDrivenSelect;
