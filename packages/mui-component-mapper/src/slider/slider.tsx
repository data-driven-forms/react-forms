import React from 'react';
import { FormControl, FormGroup, FormHelperText, Slider as MUISlider, FormLabel, Grid } from '@mui/material';
import type { FormControlProps, FormGroupProps, FormHelperTextProps, SliderProps as MUISliderProps, FormLabelProps, GridProps } from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

export interface SliderProps extends BaseFieldProps {
  FormFieldGridProps?: FormFieldGridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  before?: React.ReactNode;
  after?: React.ReactNode;
  InputGridProps?: GridProps;
  BeforeGridProps?: GridProps;
  SliderGridProps?: GridProps;
  AfterGridProps?: GridProps;
  min?: number;
  max?: number;
  step?: number;
  SliderProps?: Omit<MUISliderProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'onFocus'>;
  [key: string]: any;
}

const Slider: React.FC<SliderProps> = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    FormFieldGridProps = {},
    FormControlProps = {},
    FormGroupProps = {},
    FormLabelProps = {},
    FormHelperTextProps = {},
    before,
    after,
    InputGridProps = {},
    BeforeGridProps = {},
    SliderGridProps = {},
    AfterGridProps = {},
    min = 0,
    max = 100,
    SliderProps = {},
    ...rest
  } = useFieldApi(props);

  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);
  const text = invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description;

  const defaultValue = (max + min) / 2;

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <FormControl fullWidth required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormGroup {...FormGroupProps}>
          <FormLabel component="legend" {...FormLabelProps}>
            {label}
          </FormLabel>
          <Grid container spacing={2} alignItems="center" {...InputGridProps}>
            {before && (
              <Grid item {...BeforeGridProps}>
                {before}
              </Grid>
            )}
            <Grid item xs {...SliderGridProps}>
              <MUISlider
                {...input}
                value={input.value || defaultValue}
                min={min}
                max={max}
                disabled={isDisabled || isReadOnly}
                onChange={(_e, value) => input.onChange(value)}
                {...SliderProps}
                {...rest}
              />
            </Grid>
            {after && (
              <Grid item {...AfterGridProps}>
                {after}
              </Grid>
            )}
          </Grid>
          {text && <FormHelperText {...FormHelperTextProps}>{text}</FormHelperText>}
        </FormGroup>
      </FormControl>
    </FormFieldGrid>
  );
};

export default Slider;
