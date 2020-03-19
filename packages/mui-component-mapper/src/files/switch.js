import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MUISwitch from '@material-ui/core/Switch';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const Switch = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, onText, offText, ...rest } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;

  return (
    <FormFieldGrid>
      <FormControl required={isRequired} error={!!invalid} component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <MUISwitch
                {...rest}
                {...input}
                readOnly={isReadOnly}
                disabled={isDisabled || isReadOnly}
                onChange={({ target: { checked } }) => input.onChange(checked)}
              />
            }
            label={<FormLabel>{input.checked ? onText || label : offText || label}</FormLabel>}
          />
          {(invalid || text) && <FormHelperText>{invalid || text}</FormHelperText>}
        </FormGroup>
      </FormControl>
    </FormFieldGrid>
  );
};

Switch.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  onText: PropTypes.node,
  offText: PropTypes.node,
  description: PropTypes.node
};

export default Switch;
