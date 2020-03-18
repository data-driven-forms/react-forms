import React from 'react';
import { TextArea as Pf4TextArea } from '@patternfly/react-core/dist/js/components/TextArea/TextArea';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import PropTypes from 'prop-types';
import FormGroup from '../common/form-group';

const TextArea = (props) => {
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
      <Pf4TextArea disabled={isDisabled || isReadOnly} {...input} id={id || input.name} {...rest} />
    </FormGroup>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  hideLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

export default TextArea;
