import React from 'react';
import { FormGroup as Pf4FormGroup, TextContent, Text } from '@patternfly/react-core';
import PropTypes from 'prop-types';

import showError from './show-error';

const FormGroup = ({ label, isRequired, helperText, meta, description, hideLabel, children, id }) => (
  <Pf4FormGroup
    isRequired={isRequired}
    label={!hideLabel && label}
    fieldId={id}
    helperText={helperText}
    helperTextInvalid={meta.error}
    {...showError(meta)}
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
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
};

FormGroup.defaultProps = {
  isRequired: false,
  description: undefined
};

export default FormGroup;
