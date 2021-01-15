import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../form-field/form-field';

const TimePicker = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, helperText, validateOnMount, meta, FormFieldGridProps, HelpertextProps, ...rest } = useFieldApi(
    props
  );
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelpertextProps={HelpertextProps} {...FormFieldGridProps}>
      <FormField
        required={isRequired}
        readOnly={isReadOnly}
        disabled={isDisabled}
        error={
          invalid && {
            content: meta.error || meta.submitError
          }
        }
        control={(props) => <input {...props} readOnly={isReadOnly} disabled={isDisabled} />}
        {...input}
        {...rest}
        type="time"
      />
    </FormFieldGrid>
  );
};

TimePicker.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  locale: PropTypes.string,
  description: PropTypes.node,
  /** Sub component customization API */
  FormFieldGridProps: PropTypes.object,
  HelpertextProps: PropTypes.object
};

TimePicker.defaultProps = {
  FormFieldGridProps: {},
  HelpertextProps: {}
};

export default TimePicker;
