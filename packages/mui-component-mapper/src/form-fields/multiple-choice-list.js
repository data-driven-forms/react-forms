import React from 'react';
import { composeValidators } from '@data-driven-forms/react-form-renderer';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const MultipleChoiceList = ({ validate, FieldProvider, ...props }) => (
  <FieldProvider { ...props } validate={ composeValidators(props.validate || []) }>
    { ({
      label,
      isRequired,
      helperText,
      meta,
      options,
      isDisabled,
      formOptions,
      componentType,
      ...rest
    }) => {
      const { error, touched } = meta;
      const showError = touched && error;
      const groupValues = Array.isArray(rest.input.value) ? rest.input.value : [];
      return (
        <Grid container >
          <FormControl component="fieldset" >
            <FormLabel>{ label }</FormLabel>
            <FormGroup>
              { options.map(option =>
                (<FieldProvider
                  { ...rest }
                  id={ `${rest.id}-${option.value}` }
                  key={ option.value }
                  { ...option }
                  name={ props.name }
                  type="checkbox"
                  render={ ({ input, meta, value, formOptions, ...rest }) => {
                    const indexValue = groupValues.indexOf(option.value);
                    return (
                      <FormControlLabel
                        control={ <Checkbox
                          label={ rest.label }
                          aria-label={ option['aria-label'] || option.label }
                          { ...input }
                          { ...rest }
                          checked={ indexValue !== -1 }
                          disabled={ isDisabled }
                          onChange={ () => {
                            return (indexValue === -1
                              ? input.onChange([ ...groupValues, option.value ])
                              : input.onChange([ ...groupValues.slice(0, indexValue), ...groupValues.slice(indexValue + 1) ]));} }
                        >
                          { option.label }
                        </Checkbox> }
                        label={ option.label }
                      />
                    );
                  } }
                />)) }
            </FormGroup>
            <FormHelperText>{ showError ? error : null }</FormHelperText>
          </FormControl>
        </Grid>
      );
    } }
  </FieldProvider>
);

export default MultipleChoiceList;
