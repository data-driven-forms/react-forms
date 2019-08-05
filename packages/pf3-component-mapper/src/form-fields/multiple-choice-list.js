import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox,  FormGroup, ControlLabel } from 'patternfly-react';
import { composeValidators } from '@data-driven-forms/react-form-renderer';

import RequiredLabel from './required-label';

const MultipleChoiceList = ({ validate, FieldProvider, ...props }) => (
  <FieldProvider { ...props } validate={ composeValidators(props.validate || []) }>
    { ({
      label,
      isRequired,
      helperText,
      meta,
      options,
      isDisabled,
      isReadOnly,
      ...rest
    }) => {
      const { error, touched } = meta;
      const showError = touched && error;
      const groupValues = rest.input.value;
      return (
        <FormGroup validationState={ showError ? 'error' : null }>
          <ControlLabel>
            { (isRequired ? <RequiredLabel label={ label } /> : label) }
          </ControlLabel>
          <div>
            { options.map(option =>
              (<FieldProvider
                formOptions={ rest.formOptions }
                id={ `${rest.id}-${option.value}` }
                key={ option.value }
                { ...option }
                name={ props.name }
                type="checkbox"
                render={ ({ input, meta, formOptions, componentType, ...rest }) => {
                  const indexValue = groupValues.indexOf(input.value);
                  return (
                    <Checkbox
                      aria-label={ option['aria-label'] || option.label }
                      { ...input }
                      { ...rest }
                      disabled={ isDisabled || isReadOnly }
                      onChange={ () => (indexValue === -1
                        ? input.onChange([ ...groupValues, input.value ])
                        : input.onChange([ ...groupValues.slice(0, indexValue), ...groupValues.slice(indexValue + 1) ])) }
                    >
                      { rest.label }
                    </Checkbox>
                  );
                } }
              />)) }
          </div>
        </FormGroup>
      );
    } }
  </FieldProvider>
);

MultipleChoiceList.propTypes = {
  validate: PropTypes.func,
  FieldProvider: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  name: PropTypes.string.isRequired,
};

export default MultipleChoiceList;
