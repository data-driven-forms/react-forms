import React from 'react';
import PropTypes from 'prop-types';
import { Radio as MUIRadio, FormControlLabel, FormControl, FormLabel, FormHelperText } from '@material-ui/core';
import { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import { makeStyles } from '@material-ui/core/styles';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const useStyles = makeStyles(() => ({
  grid: {
    '&:first-child': {
      marginTop: 8
    }
  }
}));

const RadioOption = ({ name, option, isDisabled, isReadOnly }) => {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });
  return (
    <FormControlLabel
      key={`${name}-${option.value}`}
      control={
        <MUIRadio
          {...input}
          name={name}
          disabled={isDisabled || isReadOnly}
          onChange={() => input.onChange(option.value)}
          inputProps={{
            readOnly: isReadOnly
          }}
        />
      }
      label={option.label}
    />
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.any.isRequired }).isRequired,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool
};

const Radio = ({ name, ...props }) => {
  const { options, isDisabled, label, isRequired, helperText, description, isReadOnly, meta, validateOnMount } = useFieldApi({
    ...props,
    name,
    type: 'radio'
  });
  const classes = useStyles();
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  return (
    <FormFieldGrid className={classes.grid}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        {options.map((option) => (
          <RadioOption key={option.value} name={name} option={option} isDisabled={isDisabled} isReadOnly={isReadOnly} />
        ))}
        {(invalid || text) && <FormHelperText>{invalid || text}</FormHelperText>}
      </FormControl>
    </FormFieldGrid>
  );
};

Radio.propTypes = {
  ...wrapperProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.any,
  description: PropTypes.node
};

Radio.defaultProps = {
  options: []
};

export default Radio;
