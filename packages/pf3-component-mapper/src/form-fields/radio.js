import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'patternfly-react';

const RadioGroup = ({ FieldProvider, options, isDisabled, isReadOnly, input }) => options.map(option => (
  <FieldProvider
    key={ `${input.name}-${option.key || option.value}` }
    name={ input.name }
    value={ option.value }
    type="radio"
    render={ ({ input }) => (
      <Radio { ...input } onChange={ () => { input.onChange(option.value); } } disabled={ isDisabled || isReadOnly }>{ option.label }</Radio>) }
  />
));

RadioGroup.propTypes = {
  FieldProvider: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.node,
  })),
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

RadioGroup.defaultProps = {
  options: [],
};

export default RadioGroup;
