import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import { validationError, validationWarning } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormFieldGrid from '../form-field-grid/form-field-grid';
import FormField from '../form-field/form-field';

const TextField = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    label,
    helperText,
    validateOnMount,
    meta,
    FormFieldGridProps,
    HelpertextProps,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelpertextProps={HelpertextProps} {...FormFieldGridProps}>
      <FormField
        {...rest}
        control={Input}
        label={label}
        required={isRequired}
        disabled={isDisabled}
        readOnly={isReadOnly}
        placeholder={placeholder}
        {...input}
        error={
          invalid && {
            content: meta.error || meta.submitError
          }
        }
      />
    </FormFieldGrid>
  );
};

TextField.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  /** Sub component customization */
  FormFieldGridProps: PropTypes.object,
  HelpertextProps: PropTypes.object
};

TextField.defaultProps = {
  FormFieldGridProps: {},
  HelpertextProps: {}
};

export default TextField;
