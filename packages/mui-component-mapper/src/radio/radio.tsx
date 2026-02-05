import React from 'react';
import { styled } from '@mui/material/styles';
import { Radio as MUIRadio, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@mui/material';
import type { FormControlLabelProps, FormControlProps, FormLabelProps, FormHelperTextProps } from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';
import type { SelectOption, OptionValue } from '@data-driven-forms/common';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

const PREFIX = 'Radio';

const classes = {
  grid: `${PREFIX}-grid`,
};

const StyledFormFieldGrid = styled(FormFieldGrid)(() => ({
  [`&.${classes.grid}`]: {
    '&:first-of-type': {
      marginTop: 8,
    },
  },
}));

interface RadioOptionProps<T = OptionValue> {
  name: string;
  option: SelectOption<T>;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  FormControlLabelProps?: FormControlLabelProps;
  RadioProps?: {
    inputProps?: Record<string, any>;
    [key: string]: any;
  };
  [key: string]: any;
}

function RadioOption<T = OptionValue>({
  name,
  option,
  isDisabled,
  isReadOnly,
  FormControlLabelProps,
  RadioProps: { inputProps, ...RadioProps } = {},
  ...props
}: RadioOptionProps<T>) {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });

  return (
    <FormControlLabel
      key={`${name}-${String(option.value)}`}
      control={
        <MUIRadio
          {...input}
          name={name}
          disabled={isDisabled || isReadOnly}
          onChange={() => input.onChange(option.value)}
          inputProps={{
            readOnly: isReadOnly,
            ...inputProps,
          }}
          {...RadioProps}
        />
      }
      label={option.label}
      {...FormControlLabelProps}
      {...props}
    />
  );
}

export interface RadioProps<T = OptionValue> extends BaseFieldProps {
  options: SelectOption<T>[];
  FormFieldGridProps?: FormFieldGridProps;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  FormControlLabelProps?: FormControlLabelProps;
  RadioProps?: {
    inputProps?: Record<string, any>;
    [key: string]: any;
  };
  [key: string]: any;
}

function Radio<T = OptionValue>({ name, ...props }: RadioProps<T>) {
  const {
    options = [],
    isDisabled,
    label,
    isRequired,
    helperText,
    description,
    isReadOnly,
    meta,
    validateOnMount,
    FormFieldGridProps = {},
    FormControlProps = {},
    FormLabelProps = {},
    FormHelperTextProps = {},
    FormControlLabelProps = {},
    RadioProps = {},
    ...rest
  } = useFieldApi({
    ...props,
    name,
    type: 'radio',
  });

  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);
  const text = invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description;

  return (
    <StyledFormFieldGrid className={classes.grid} {...FormFieldGridProps}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormLabel component="legend" {...FormLabelProps}>
          {label}
        </FormLabel>
        {options.map((option) => (
          <RadioOption<T>
            key={String(option.value)}
            name={name || ''}
            option={option}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            FormControlLabelProps={FormControlLabelProps}
            RadioProps={RadioProps}
            {...rest}
          />
        ))}
        {text && <FormHelperText {...FormHelperTextProps}>{text}</FormHelperText>}
      </FormControl>
    </StyledFormFieldGrid>
  );
}

export default Radio;
