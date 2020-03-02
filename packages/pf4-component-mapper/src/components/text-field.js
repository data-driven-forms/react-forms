import React from 'react';
import FormGroup from '../common/form-group';
import { TextInput } from '@patternfly/react-core/dist/js/components/TextInput/TextInput';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TextField = (props) => {
  const { label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest } = useFieldApi(props);
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
    >
      <TextInput {...input} {...rest} id={id || input.name} isReadOnly={isReadOnly} isDisabled={isDisabled} />
    </FormGroup>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

export default TextField;
