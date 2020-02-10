import React from 'react';
import PropTypes from 'prop-types';
import { composeValidators } from '@data-driven-forms/react-form-renderer';

import { formGroup } from './prop-types-templates';

const MultipleChoiceList = ({ validate, FieldProvider, Wrapper, Checkbox, ...props }) => (
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
      description,
      ...rest
    }) => {
      const { error, touched } = meta;
      const showError = touched && error;
      const groupValues = rest.input.value || [];
      return (
        <Wrapper
          showError={ showError }
          isRequired={ isRequired }
          label={ label }
          helperText={ helperText }
          meta={ meta }
          description={ description }
          rest={ rest }
          error={ error }
        >
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
                    isDisabled={ isDisabled || isReadOnly }
                    onChange={ () => (indexValue === -1
                      ? input.onChange([ ...groupValues, input.value ])
                      : input.onChange([ ...groupValues.slice(0, indexValue), ...groupValues.slice(indexValue + 1) ])) }
                    label={ rest.label }
                  />
                );
              } }
            />)) }
        </Wrapper>);
    } }
  />
);

MultipleChoiceList.propTypes = {
  validate: PropTypes.func,
  FieldProvider: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  name: PropTypes.string.isRequired,
  Wrapper: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  Checkbox: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
};

export default MultipleChoiceList;

export const wrapperProps = {
  ...formGroup,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
