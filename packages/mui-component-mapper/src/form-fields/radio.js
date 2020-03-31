import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';

const RadioGroup = ({
  FieldProvider,
  options,
  isDisabled,
  input,
  label,
  isRequired,
  helperText,
  invalid,
  isReadOnly,
}) => (
  <div  className="mui-ddform-radio-group">
    <FormControl required={ isRequired } error={ !!invalid } component="fieldset">
      <FormLabel component="legend">{ label }</FormLabel>
      { options.map(option => (
        <FieldProvider
          key={ `${input.name}-${option.key || option.value}` }
          name={ input.name }
          value={ option.value }
          type="radio"
          render={ ({ input }) => (
            <FormControlLabel
              control={ <Radio
                { ...input }
                disabled={ isDisabled }
                onChange={ () => input.onChange(option.value) }
                inputProps={{
                  readOnly: isReadOnly,
                }}
              /> }
              label={ option.label }
            />
          ) }
        />
      )) }
      { (invalid || helperText) && <FormHelperText>{ invalid || helperText }</FormHelperText> }
    </FormControl>
  </div>
);

RadioGroup.propTypes = {
  ...wrapperProps,
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
  children: PropTypes.any,
};

RadioGroup.defaultProps = {
  options: [],
};

export default RadioGroup;
