import React from 'react';
import { FormControl, FormGroup, FormHelperText, Slider as MUISlider, FormLabel, Grid } from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';

const Slider = (props) => {
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
    FormFieldGridProps,
    FormControlProps,
    FormGroupProps,
    FormLabelProps,
    FormHelperTextProps,
    before,
    after,
    InputGridProps,
    BeforeGridProps,
    SliderGridProps,
    AfterGridProps,
    ...rest
  } = useFieldApi(props);

  const invalid = validationError(meta, validateOnMount);
  const text = invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description;

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
                value={input.value || (rest.max + rest.min) / 2 || 50}
                {...rest}
                disabled={isDisabled || isReadOnly}
                onChange={(_e, value) => input.onChange(value)}
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
