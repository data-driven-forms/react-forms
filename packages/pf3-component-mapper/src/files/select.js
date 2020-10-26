import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../common/form-wrapper';
import DataDrivenSelect from './select/select';
import { validationError } from '../form-fields/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const Select = (props) => {
  const { meta, validateOnMount, label, hideLabel, isRequired, helperText, description, inputAddon, ...rest } = useFieldApi(props);
  return (
    <FormGroup
      meta={meta}
      validateOnMount={validateOnMount}
      label={label}
      hideLabel={hideLabel}
      isRequired={isRequired}
      helperText={helperText}
      description={description}
      inputAddon={inputAddon}
    >
      <div>
        <DataDrivenSelect classNamePrefix="ddorg__pf3-component-mapper__select" invalid={!!validationError(meta, validateOnMount)} {...rest} />
      </div>
    </FormGroup>
  );
};

Select.propTypes = {
  validateOnMount: PropTypes.bool,
  label: PropTypes.node,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  inputAddon: PropTypes.shape({ fields: PropTypes.array }),
  allowNull: PropTypes.bool
};

Select.defaultProps = {
  allowNull: true
};

export default Select;

export const InternalSelect = DataDrivenSelect;
