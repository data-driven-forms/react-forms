import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup } from '@patternfly/react-core';
import { composeValidators } from '@data-driven-forms/react-form-renderer';

const propTypes = {
  validate: PropTypes.oneOfType([ PropTypes.array, PropTypes.func ]),
  FieldProvider: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
};

const MultipleChoiceList = ({ validate, FieldProvider, ...props }) => (
  <FieldProvider
    { ...props }
    validate={ composeValidators(props.validate || []) }
    render={ ({
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
        <FormGroup label={ label } fieldId={ rest.id || rest.key || rest.name } isValid={ showError } >
          { options.map(option =>
            (<FieldProvider
              {...rest}
              id={ `${rest.id}-${option.value}` }
              key={ option.value }
              { ...option }
              name={ props.name }
              type="checkbox"
              render={ ({ input, meta, formOptions, componentType, ...rest }) => {
                const indexValue = groupValues.indexOf(input.value);
                return (
                  <Checkbox
                    label={ rest.label }
                    aria-label={ option['aria-label'] || option.label }
                    { ...input }
                    { ...rest }
                    isDisabled={ isDisabled || isReadOnly }
                    onChange={ () => (indexValue === -1
                      ? input.onChange([ ...groupValues, input.value ])
                      : input.onChange([ ...groupValues.slice(0, indexValue), ...groupValues.slice(indexValue + 1) ])) }
                  />
                );
              } }
            />)) }
        </FormGroup>
      );
    } }
  />
);

MultipleChoiceList.propTypes = propTypes;

export default MultipleChoiceList;
