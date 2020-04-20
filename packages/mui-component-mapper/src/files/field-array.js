import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi, FieldArray } from '@data-driven-forms/react-form-renderer';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../common/form-field-grid';
import clsx from 'clsx';

const useFielArrayStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  centerText: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonsToEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    display: 'flex'
  },
  label: {
    flexGrow: 1
  },
  fieldArrayGroup: {
    marginBottom: 32
  }
});

const ArrayItem = ({ fields, fieldIndex, name, remove, length, minItems, removeLabel }) => {
  const { renderForm } = useFormApi();
  const classes = useFielArrayStyles();

  const editedFields = fields.map((field, index) => {
    const computedName = field.name ? `${name}.${field.name}` : name;
    return { ...field, name: computedName, key: `${computedName}-${index}` };
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {renderForm([editedFields])}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.buttonsToEnd}>
        <Button color="secondary" onClick={() => remove(fieldIndex)} disabled={length <= minItems}>
          {removeLabel}
        </Button>
      </Grid>
    </Grid>
  );
};

ArrayItem.propTypes = {
  name: PropTypes.string,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
  length: PropTypes.number,
  minItems: PropTypes.number,
  removeLabel: PropTypes.node.isRequired
};

const defaultButtonLabels = {
  add: 'ADD',
  remove: 'REMOVE'
};

const DynamicArray = ({ ...props }) => {
  const {
    arrayValidator,
    label,
    description,
    fields: formFields,
    defaultItem,
    meta,
    minItems,
    maxItems,
    noItemsMessage,
    FormFieldGridProps,
    FormControlProps,
    buttonLabels,
    ...rest
  } = useFieldApi(props);

  const combinedButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels
  };

  const classes = useFielArrayStyles();

  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <FormFieldGrid {...FormFieldGridProps} className={clsx(classes.fieldArrayGroup, FormFieldGridProps.classname)}>
      <FormControl component="fieldset" error={isError} {...FormControlProps} className={clsx(classes.formControl, FormControlProps.className)}>
        <FieldArray key={rest.input.name} name={rest.input.name} validate={arrayValidator}>
          {({ fields: { map, value = [], push, remove } }) => (
            <Grid container spacing={3}>
              {label && (
                <Grid item xs={12} className={classes.header}>
                  <Typography variant="h6" className={classes.label}>
                    {label}
                  </Typography>
                  <Button color="primary" onClick={() => push(defaultItem)} disabled={value.length >= maxItems}>
                    {combinedButtonLabels.add}
                  </Button>
                </Grid>
              )}
              {description && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{description}</Typography>
                </Grid>
              )}
              {value.length <= 0 && (
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom className={classes.centerText}>
                    {noItemsMessage}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                {map((name, index) => (
                  <ArrayItem
                    key={`${name}-${index}`}
                    fields={formFields}
                    name={name}
                    fieldIndex={index}
                    remove={remove}
                    length={value.length}
                    minItems={minItems}
                    removeLabel={combinedButtonLabels.remove}
                  />
                ))}
                {isError && (
                  <Grid item xs={12}>
                    <FormHelperText>{error}</FormHelperText>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </FieldArray>
      </FormControl>
    </FormFieldGrid>
  );
};

DynamicArray.propTypes = {
  label: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultItem: PropTypes.any,
  minItems: PropTypes.number,
  maxItems: PropTypes.number,
  noItemsMessage: PropTypes.node,
  FormControlProps: PropTypes.object,
  FormFieldGridProps: PropTypes.object,
  buttonLabels: PropTypes.object
};

DynamicArray.defaultProps = {
  maxItems: Infinity,
  minItems: 0,
  noItemsMessage: 'No items added',
  FormControlProps: {},
  FormFieldGridProps: {}
};

export default DynamicArray;
