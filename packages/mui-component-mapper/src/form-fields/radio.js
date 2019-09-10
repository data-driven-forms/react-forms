import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioGroup = ({ FieldProvider, options, isDisabled, input, label }) => (
  <div  className="mui-ddform-radio-group">
    <FormControl component="fieldset">
      <FormLabel component="legend">{ label }</FormLabel>
      { options.map(option => (
        <FieldProvider
          key={ `${input.name}-${option.value}` }
          name={ input.name }
          value={ option.value }
          type="radio"
          render={ ({ input }) => (
            <FormControlLabel
              control={ <Radio
                { ...input }
                disabled={ isDisabled }
                onChange={ () => input.onChange(option.value) }/> }
              label={ option.label }
            />
          ) }
        />
      )) }
    </FormControl>
  </div>
);

RadioGroup.propTypes = {
  FieldProvider: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.node,
  })),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
};

RadioGroup.defaultProps = {
  options: [],
};

export default RadioGroup;
