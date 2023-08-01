import React from 'react';
import { FormGroup as Pf4FormGroup, TextContent, Text, FormHelperText, HelperText, HelperTextItem } from '@patternfly/react-core';
import PropTypes from 'prop-types';

import showError from '../show-error/show-error';

const FormGroup = ({ label, isRequired, helperText, meta, validateOnMount, description, hideLabel, children, id, FormGroupProps }) => {
  const { validated } = showError(meta, validateOnMount);
  const validationInternal = (meta.touched || validateOnMount) && (meta.error || meta.submitError || meta.warning);
  return (
    <Pf4FormGroup isRequired={isRequired} label={!hideLabel && label} fieldId={id} aria-label={meta.error || meta.submitError} {...FormGroupProps}>
      {description && (
        <TextContent>
          <Text component="small">{description}</Text>
        </TextContent>
      )}
      {children}
      {(helperText || ['error', 'warning'].includes(validated)) && (
        <FormHelperText>
          <HelperText>
            <HelperTextItem variant={validated}>{validationInternal || helperText}</HelperTextItem>
          </HelperText>
        </FormHelperText>
      )}
    </Pf4FormGroup>
  );
};

FormGroup.propTypes = {
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  meta: PropTypes.object.isRequired,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  validateOnMount: PropTypes.bool,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  FormGroupProps: PropTypes.object,
};

export default FormGroup;
