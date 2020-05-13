import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../common/form-field';

const Textarea = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, helperText, validateOnMount, meta, ...rest } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormFieldGrid helperText={helperText}>
      <FormField
        required={isRequired}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...input}
        error={invalid && { content: meta.error }}
        control={Form.TextArea}
        {...rest}
      />
    </FormFieldGrid>
  );
};

Textarea.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node
};

export default Textarea;
