import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../common/form-wrapper';
import DataDrivenSelect from './select/select';
import { validationError } from '../form-fields/helpers';
import { useFieldProviderApi } from '@data-driven-forms/react-form-renderer';

const Select = (props) => {
  const { meta, validateOnMount, label, hideLabel, isRequired, helperText, description, ...rest } = useFieldProviderApi(props);
  return (
    <FormGroup
      meta={meta}
      validateOnMount={validateOnMount}
      label={label}
      hideLabel={hideLabel}
      isRequired={isRequired}
      helperText={helperText}
      description={description}
    >
      <div>
        <DataDrivenSelect classNamePrefix="ddorg__pf3-component-mapper__select" invalid={validationError(meta, validateOnMount)} {...rest} />
      </div>
    </FormGroup>
  );
};

Select.propTypes = {
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default Select;
