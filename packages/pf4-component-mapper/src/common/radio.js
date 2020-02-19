import React from 'react';
import PropTypes from 'prop-types';

import { Radio } from '@patternfly/react-core/dist/js/components/Radio/Radio';

const RadioGroup = ({ FieldProvider, options, isDisabled, isReadOnly, input, ...props }) =>
  options.map((option) => (
    <FieldProvider
      {...props}
      key={`${input.name}-${option.value}`}
      name={input.name}
      value={option.value}
      type="radio"
      render={({ input }) => (
        <Radio
          {...input}
          isChecked={input.checked}
          label={option.label}
          id={`${input.name}-${option.value}`}
          aria-label={option.label}
          isDisabled={isDisabled || isReadOnly}
          onChange={() => input.onChange(option.value)}
        />
      )}
    />
  ));

RadioGroup.propTypes = {
  FieldProvider: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]), // should not be in props
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node
    })
  ),
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;
