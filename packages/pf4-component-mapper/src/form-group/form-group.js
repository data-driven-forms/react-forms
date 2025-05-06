import React from 'react';
import { FormGroup as Pf4FormGroup, Content, FormHelperText, HelperText, HelperTextItem } from '@patternfly/react-core';

import showError from '../show-error/show-error';

const FormGroup = ({ label, isRequired, helperText, meta, validateOnMount, description, hideLabel, children, id, FormGroupProps }) => {
  const { validated } = showError(meta, validateOnMount);
  const validationInternal = (meta.touched || validateOnMount) && (meta.error || meta.submitError || meta.warning);
  return (
    <Pf4FormGroup isRequired={isRequired} label={!hideLabel && label} fieldId={id} aria-label={meta.error || meta.submitError} {...FormGroupProps}>
      {description && (
        <Content>
          <Content component="small">{description}</Content>
        </Content>
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

export default FormGroup;
