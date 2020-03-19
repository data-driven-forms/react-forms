import React from 'react';
import PropTypes from 'prop-types';
import MUICheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const SingleCheckbox = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta } = useFieldApi({
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
              <MUICheckbox
                {...input}
                disabled={isDisabled || isReadOnly}
                value={input.name}
                inputProps={{
                  readOnly: isReadOnly
                }}
              />
            }
            disabled={isDisabled || isReadOnly}
            label={<FormLabel>{label}</FormLabel>}
          />
          {(invalid || text) && <FormHelperText>{invalid || text}</FormHelperText>}
        </FormGroup>
      </FormControl>
    </FormFieldGrid>
  );
};

SingleCheckbox.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  description: PropTypes.node,
  validateOnMount: PropTypes.bool
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.array
};

export default Checkbox;
