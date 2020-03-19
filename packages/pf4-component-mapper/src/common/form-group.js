import React from 'react';
import { FormGroup, TextContent, Text } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const Pf4FormGroup = ({ label, isRequired, helperText, meta, description, hideLabel, children, id }) => {
  const { error, touched } = meta;
  const showError = touched && error;
  return (
    <FormGroup
      isRequired={isRequired}
      label={!hideLabel && label}
      fieldId={id}
      isValid={!showError}
      helperText={helperText}
      helperTextInvalid={meta.error}
    >
      {description && (
        <TextContent>
          <Text component="small">{description}</Text>
        </TextContent>
      )}
      {children}
    </FormGroup>
  );
};

Pf4FormGroup.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  meta: PropTypes.object.isRequired,
  description: PropTypes.string,
  hideLabel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
};

Pf4FormGroup.defaultProps = {
  isRequired: false,
  description: undefined
};

export default Pf4FormGroup;
