import React from 'react';
import { FormCheckbox } from 'semantic-ui-react';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError, validationWarning } from '../helpers/helpers';
import MultipleChoiceList from './multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const SingleCheckbox = (props) => {
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
    FormFieldGridProps = {},
    HelperTextProps = {},
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  });
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelperTextProps={HelperTextProps} {...FormFieldGridProps}>
      <FormCheckbox
        {...input}
        required={isRequired}
        onChange={(_event, data) => {
          input.onChange({ target: data, type: 'checkbox' });
        }}
        disabled={isDisabled || isReadOnly}
        {...rest}
        label={label}
        error={
          invalid && {
            content: meta.error || meta.submitError,
            pointing: 'left',
          }
        }
      />
    </FormFieldGrid>
  );
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

export default Checkbox;
