import React from 'react';
import PropTypes from 'prop-types';

import CommonSelect from '@data-driven-forms/common/select';
import parseInternalValue from '@data-driven-forms/common/select/parse-internal-value';
import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Dropdown } from 'semantic-ui-react';
import FormField from '../form-field/form-field';

const SuirSelect = ({
  onChange,
  value,
  meta,
  helperText,
  validateOnMount,
  isReadOnly,
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
  FormFieldGridProps,
  HelpertextProps,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  const internalValue = parseInternalValue(value, isMulti);

  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelpertextProps={HelpertextProps} {...FormFieldGridProps}>
      <FormField
        disabled={isDisabled}
        readOnly={isReadOnly}
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
        error={invalid && { content: meta.error || meta.submitError }}
        control={Dropdown}
        value={internalValue}
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
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  isRequired: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  onInputChange: PropTypes.func,
  isFetching: PropTypes.bool,
  hideSelectedOptions: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  /** Sub components customization API */
  FormFieldGridProps: PropTypes.object,
  HelpertextProps: PropTypes.object
};

SuirSelect.defaultProps = {
  placeholder: 'Please choose',
  noOptionsMessage: 'No option found',
  options: [],
  FormFieldGridProps: {},
  HelpertextProps: {}
};

const Select = (props) => {
  const { input, ...formProps } = useFieldApi(props);
  return <CommonSelect simpleValue {...input} {...formProps} SelectComponent={SuirSelect} />;
};

export default Select;

export const InternalSelect = SuirSelect;
