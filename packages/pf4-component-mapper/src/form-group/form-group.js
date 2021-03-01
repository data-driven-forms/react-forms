import React from 'react';
import { FormGroup as Pf4FormGroup, TextContent, Text } from '@patternfly/react-core';
import PropTypes from 'prop-types';

import showError from '../common/show-error';

const FormGroup = ({ label, isRequired, helperText, meta, validateOnMount, description, hideLabel, children, id, FormGroupProps }) => (
  <Pf4FormGroup
    isRequired={isRequired}
    label={!hideLabel && label}
    fieldId={id}
    helperText={(meta.touched && meta.warning) || helperText}
    helperTextInvalid={meta.error || meta.submitError}
    {...showError(meta, validateOnMount)}
    {...FormGroupProps}
  >
    {description && (
      <TextContent>
        <Text component="small">{description}</Text>
      </TextContent>
    )}
    {children}
  </Pf4FormGroup>
);

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
  FormGroupProps: PropTypes.object
};

export default FormGroup;
