import React, { memo, useReducer } from 'react';
import { styled } from '@mui/material/styles';
import { useFormApi, FieldArray } from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash/isEqual';

import { Grid, Button, Typography, FormControl, FormHelperText, IconButton } from '@mui/material';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import clsx from 'clsx';

const PREFIX = 'DynamicArray';

const classes = {
  formControl: `${PREFIX}-formControl`,
  centerText: `${PREFIX}-centerText`,
  buttonsToEnd: `${PREFIX}-buttonsToEnd`,
  header: `${PREFIX}-header`,
  label: `${PREFIX}-label`,
  fieldArrayGroup: `${PREFIX}-fieldArrayGroup`,
};

const StyledFormFieldGrid = styled(FormFieldGrid)({
  [`& .${classes.formControl}`]: {
    width: '100%',
  },
  [`& .${classes.centerText}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
  [`& .${classes.buttonsToEnd}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  [`& .${classes.header}`]: {
    display: 'flex',
  },
  [`& .${classes.label}`]: {
    flexGrow: 1,
  },
  [`&.${classes.fieldArrayGroup}`]: {
    marginBottom: 32,
  },
});

const ArrayItem = memo(
  ({
    fields,
    fieldIndex,
    name,
    remove,
    length,
    minItems,
    removeLabel,
    FieldContainerProps = {},
    FieldGroupGridProps = {},
    RemoveButtonGridProps = {},
    RemoveButtonProps = {},
  }) => {
    const { renderForm } = useFormApi();

    const editedFields = fields.map((field, index) => {
      const computedName = field.name ? `${name}.${field.name}` : name;
      return { ...field, name: computedName, key: `${computedName}-${index}` };
    });

    return (
      <Grid container spacing={3} {...FieldContainerProps}>
        <Grid item xs={12} {...FieldGroupGridProps}>
          <Grid container spacing={3}>
            {renderForm([editedFields])}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttonsToEnd} {...RemoveButtonGridProps}>
          <Button color="secondary" onClick={() => remove(fieldIndex)} disabled={length <= minItems} {...RemoveButtonProps}>
            {removeLabel}
          </Button>
        </Grid>
      </Grid>
    );
  },
  ({ remove: _prevRemove, ...prev }, { remove: _nextRemove, ...next }) => isEqual(prev, next)
);

const defaultButtonLabels = {
  add: 'ADD',
  remove: 'REMOVE',
};

const initialState = {
  index: 0,
  history: [],
};

export const reducer = (state, { type, action }) => {
  switch (type) {
    case 'redo':
      return {
        ...state,
        index: state.index + 1,
      };
    case 'action':
      return {
        index: state.index + 1,
        history: [...state.history.slice(0, state.index), action],
      };
    case 'undo':
      return {
        ...state,
        index: state.index - 1,
      };
    case 'resetHistory':
      return {
        ...state,
        history: state.history.slice(0, state.index),
      };
    default:
      return state;
  }
};

const DynamicArray = ({ ...props }) => {
  const {
    arrayValidator,
    label,
    description,
    fields: formFields,
    defaultItem,
    meta,
    minItems = 0,
    maxItems = Infinity,
    noItemsMessage = 'No items added',
    FormFieldGridProps = {},
    FormControlProps = {},
    buttonLabels,
    GridContainerProps = {},
    HeaderGridProps = {},
    HeaderProps = {},
    UndoButtonProps = {},
    RedoButtonProps = {},
    AddButtonProps = {},
    DescriptionGridProps = {},
    DescriptionProps = {},
    BodyGridProps = {},
    NoItemsProps = {},
    FormHelperTextGridProps = {},
    FormHelperTextProps = {},
    FieldContainerProps = {},
    FieldGroupGridProps = {},
    RemoveButtonGridProps = {},
    RemoveButtonProps = {},
    ...rest
  } = useFieldApi(props);
  const [state, dispatch] = useReducer(reducer, initialState);

  const combinedButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels,
  };

  const { dirty, submitFailed, error, submitError } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <StyledFormFieldGrid {...FormFieldGridProps} className={clsx(classes.fieldArrayGroup, FormFieldGridProps.classname)}>
      <FormControl
        component="fieldset"
        error={isError || submitError}
        {...FormControlProps}
        className={clsx(classes.formControl, FormControlProps.className)}
      >
        <FieldArray key={rest.input.name} name={rest.input.name} validate={arrayValidator}>
          {({ fields: { map, value = [], push, remove } }) => {
            const pushWrapper = () => {
              dispatch({ type: 'resetHistory' });
              push(defaultItem);
            };

            const removeWrapper = (index) => {
              dispatch({ type: 'action', action: { action: 'remove', value: value[index] } });
              remove(index);
            };

            const undo = () => {
              push(state.history[state.index - 1].value);
              dispatch({ type: 'undo' });
            };

            const redo = () => {
              remove(value.length - 1);
              dispatch({ type: 'redo' });
            };

            return (
              <Grid container spacing={3} {...GridContainerProps}>
                <Grid item xs={12} className={classes.header} {...HeaderGridProps}>
                  {label && (
                    <Typography variant="h6" className={classes.label} {...HeaderProps}>
                      {label}
                    </Typography>
                  )}
                  <IconButton
                    color="primary"
                    aria-label="undo"
                    component="span"
                    disabled={state.index === 0}
                    onClick={undo}
                    {...UndoButtonProps}
                    size="large"
                  >
                    <UndoIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="redo"
                    component="span"
                    disabled={state.index === state.history.length}
                    onClick={redo}
                    {...RedoButtonProps}
                    size="large"
                  >
                    <RedoIcon />
                  </IconButton>
                  <Button color="primary" onClick={pushWrapper} disabled={value.length >= maxItems} {...AddButtonProps}>
                    {combinedButtonLabels.add}
                  </Button>
                </Grid>
                {description && (
                  <Grid item xs={12} {...DescriptionGridProps}>
                    <Typography variant="subtitle1" {...DescriptionProps}>
                      {description}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} {...BodyGridProps}>
                  {value.length <= 0 ? (
                    <Typography variant="body1" gutterBottom className={classes.centerText} {...NoItemsProps}>
                      {noItemsMessage}
                    </Typography>
                  ) : (
                    map((name, index) => (
                      <ArrayItem
                        key={name}
                        fields={formFields}
                        name={name}
                        fieldIndex={index}
                        remove={removeWrapper}
                        length={value.length}
                        minItems={minItems}
                        removeLabel={combinedButtonLabels.remove}
                        FieldContainerProps={FieldContainerProps}
                        FieldGroupGridProps={FieldGroupGridProps}
                        RemoveButtonGridProps={RemoveButtonGridProps}
                        RemoveButtonProps={RemoveButtonProps}
                      />
                    ))
                  )}
                </Grid>
                {(isError || submitError) && (
                  <Grid item xs={12} {...FormHelperTextGridProps}>
                    <FormHelperText {...FormHelperTextProps}>{error || submitError}</FormHelperText>
                  </Grid>
                )}
              </Grid>
            );
          }}
        </FieldArray>
      </FormControl>
    </StyledFormFieldGrid>
  );
};

export default DynamicArray;
