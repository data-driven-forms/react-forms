import React from 'react';
import { FormGroup as Pf4FormGroup } from '@patternfly/react-core/dist/js/components/Form/FormGroup';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';
import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
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
          <Text component={TextVariants.small}>{description}</Text>
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
