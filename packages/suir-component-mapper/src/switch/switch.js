import React from 'react';
import PropTypes from 'prop-types';
import { FormCheckbox } from 'semantic-ui-react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormFieldGrid from '../form-field-grid/form-field-grid';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { validationError, validationWarning } from '../common/helpers';
import FormField from '../form-field/form-field';

const useStyles = createUseStyles({
  root: {
    '&>.field': {
      display: 'inline-block'
    }
  },
  errorLabel: {
    '&:after': {
      content: '"*"',
      color: '#db2828'
    }
  }
});

export const Switch = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    onText,
    offText,
    className,
    FormFieldGridProps,
    HelpertextProps,
    type,
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);
  const classes = useStyles();
  const controlLabel = input.checked ? onText : offText;
  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelpertextProps={HelpertextProps} {...FormFieldGridProps}>
      <FormField
        required={isRequired}
        className={clsx(classes.root, className)}
        error={invalid && { content: meta.error || meta.submitError, pointing: 'left' }}
        {...rest}
        label={
          <FormCheckbox
            className={clsx({
              [classes.errorLabel]: isRequired
            })}
            toggle
            label={controlLabel || label}
            {...input}
            disabled={isDisabled}
            onChange={(event, data) => input.onChange({ target: data })}
          />
        }
      />
    </FormFieldGrid>
  );
};

Switch.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  onText: PropTypes.node,
  offText: PropTypes.node,
  description: PropTypes.node,
  /** Sub components customization API */
  FormFieldGridProps: PropTypes.object,
  HelpertextProps: PropTypes.object
};

Switch.defaultProps = {
  FormFieldGridProps: {},
  HelpertextProps: {}
};

export default Switch;
