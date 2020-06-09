import React from 'react';
import PropTypes from 'prop-types';
import { FormTextArea } from 'semantic-ui-react';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../common/form-field';

const Textarea = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    helperText,
    validateOnMount,
    meta,
    FormFieldGridProps,
    HelpertextProps,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormFieldGrid helperText={helperText} HelpertextProps={HelpertextProps} {...FormFieldGridProps}>
      <FormField
        required={isRequired}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...input}
        error={invalid && { content: meta.error }}
        control={FormTextArea}
        {...rest}
      />
    </FormFieldGrid>
  );
};

Textarea.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node,
  /** Sub components customization API */
  FormFieldGridProps: PropTypes.object,
  HelpertextProps: PropTypes.object
};

Textarea.defaultProps = {
  FormFieldGridProps: {},
  HelpertextProps: {}
};

export default Textarea;
