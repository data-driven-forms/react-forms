import React from 'react';
import PropTypes from 'prop-types';

import CommonSelect from '@data-driven-forms/common/src/select';
import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Dropdown, Form } from 'semantic-ui-react';

const SuirSelect = ({
  onChange,
  value,
  meta,
  helperText,
  validateOnMount,
  isReadonly,
  isDisabled,
  isClearable,
  isSearchable,
  options,
  label,
  isMulti,
  isRequired,
  classNamePrefix,
  onInputChange,
  isFetching,
  noOptionsMessage,
  hideSelectedOptions,
  closeMenuOnSelect,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormFieldGrid helperText={helperText}>
      <Form.Field
        disabled={isDisabled}
        readOnly={isReadonly}
        required={isRequired}
        clearable={isClearable}
        search={isSearchable}
        loading={isFetching}
        noResultsMessage={isFetching ? 'Loading' : noOptionsMessage()}
        onSearchChange={({ target: { value } }) => onInputChange(value)}
        options={options.map(({ label, value, ...rest }) => ({
          key: value,
          text: label,
          value,
          ...rest
        }))}
        onChange={(_event, { value }) => {
          if (isMulti) {
            return onChange(Array.isArray(value) && value.map((value) => ({ value })));
          }

          return onChange(value && { value });
        }}
        selection
        fluid
        multiple={isMulti}
        label={label}
        error={invalid && { content: meta.error }}
        control={Dropdown}
        {...rest}
      />
    </FormFieldGrid>
  );
};

SuirSelect.propTypes = {
  input,
  meta,
  placeholder: PropTypes.node,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired })),
  description: PropTypes.node,
  isReadonly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  noOptionsMessage: PropTypes.func
};

SuirSelect.defaultProps = {
  placeholder: 'Please choose',
  noOptionsMessage: 'No option found',
  options: []
};

const Select = (props) => {
  const { input, ...formProps } = useFieldApi(props);
  return <CommonSelect simpleValue {...input} {...formProps} Component={SuirSelect} />;
};

export default Select;

export const InternalSelect = SuirSelect;
