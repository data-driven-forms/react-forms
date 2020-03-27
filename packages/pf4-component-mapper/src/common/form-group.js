import React from 'react';
import { FormGroup as Pf4FormGroup, TextContent, Text } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const FormGroup = ({ label, isRequired, helperText, meta, description, hideLabel, children, id }) => {
  const { error, touched } = meta;
  const showError = touched && error;
  return (
    <Pf4FormGroup
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
    </Pf4FormGroup>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  meta: PropTypes.object.isRequired,
  description: PropTypes.string,
  hideLabel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired
};

FormGroup.defaultProps = {
  isRequired: false,
  description: undefined
};

export default FormGroup;
