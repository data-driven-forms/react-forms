import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TextArea } from '@ui5/webcomponents-react';

import FormGroup from '../form-group/form-group';
import validationError from '../validation-error';
import convertProps from '../convert-props';

const Textarea = (props) => {
  const { input, label, meta, validateOnMount, ...rest } = useFieldApi(convertProps(props));

  return (
    <FormGroup label={label}>
      <TextArea {...input} onChange={undefined} onInput={input.onChange} {...rest} {...validationError(meta, validateOnMount)} />
    </FormGroup>
  );
};

Textarea.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
};

export default Textarea;
