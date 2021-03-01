import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useFormApi, FieldArray } from '@data-driven-forms/react-form-renderer';

import { Button, Header, ButtonGroup } from 'semantic-ui-react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import FormField from '../form-field/form-field';

const useStyles = createUseStyles({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  arrayItem: {
    marginBottom: '1em'
  },
  arrayItems: {
    marginTop: '1em'
  },
  error: {
    color: '#9f3a38 !important'
  },
  noItems: {
    paddingBottom: '1em'
  },
  noMargin: {
    margin: '0 !important'
  },
  arrayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const ArrayItem = ({
  fields,
  fieldIndex,
  name,
  remove,
  length,
  minItems,
  removeLabel,
  RemoveButtonProps,
  ArrayItemGridProps: { className: arrayItemClassName, ...ArrayItemGridProps },
  ArrayItemFieldsGridProps
}) => {
  const { renderForm } = useFormApi();
  const classes = useStyles();

  const editedFields = fields.map((field, index) => {
    const computedName = field.name ? `${name}.${field.name}` : name;
    return { ...field, name: computedName, key: `${computedName}-${index}` };
  });

  return (
    <div className={clsx(classes.arrayItem, arrayItemClassName)} {...ArrayItemGridProps}>
      <div {...ArrayItemFieldsGridProps}>{renderForm([editedFields])}</div>
      <div>
        <Button
          icon="remove"
          content={removeLabel}
          basic
          color="red"
          {...RemoveButtonProps}
          type="button"
          onClick={() => remove(fieldIndex)}
          disabled={length <= minItems}
        />
      </div>
    </div>
  );
};

ArrayItem.propTypes = {
  name: PropTypes.string,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
  length: PropTypes.number,
  minItems: PropTypes.number,
  removeLabel: PropTypes.node.isRequired,
  RemoveButtonProps: PropTypes.object,
  ArrayItemGridProps: PropTypes.object,
  ArrayItemFieldsGridProps: PropTypes.object
};

ArrayItem.defaultProps = {
  RemoveButtonProps: {},
  ArrayItemGridProps: {},
  ArrayItemFieldsGridProps: {}
};

const defaultButtonLabels = {
  add: 'ADD',
  remove: 'REMOVE'
};

const initialState = {
  index: 0,
  history: []
};

export const reducer = (state, { type, action }) => {
  switch (type) {
    case 'redo':
      return {
        ...state,
        index: state.index + 1
      };
    case 'action':
      return {
        index: state.index + 1,
        history: [...state.history.slice(0, state.index), action]
      };
    case 'undo':
      return {
        ...state,
        index: state.index - 1
      };
    case 'resetHistory':
      return {
        ...state,
        history: state.history.slice(0, state.index)
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
    minItems,
    maxItems,
    noItemsMessage,
    buttonLabels,
    FieldArrayGridProps,
    FieldArrayHeaderProps: { className: arrayHeaderClassName, ...FieldArrayHeaderProps },
    FieldArrayButtonGridProps: { className: arrayButtonGridClassName, ...FieldArrayButtonGridProps },
    ButtonGroupProps,
    UndoButtonProps,
    RedoButtonProps,
    AddButtonProps,
    DescriptionProps: { className: descriptionClassName, ...DescriptionProps },
    ArrayItemsGridProps: { className: arrayItemsClassName, ...ArrayItemsGridProps },
    NoItemsProps: { className: noItemsClassname, ...NoItemsProps },
    RemoveButtonProps,
    ArrayItemGridProps,
    ArrayItemFieldsGridProps,
    ...rest
  } = useFieldApi(props);
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();

  const combinedButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels
  };

  const { dirty, submitFailed, error, submitError } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
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
          <div {...FieldArrayGridProps}>
            <div className={clsx(classes.arrayHeader, arrayHeaderClassName)} {...FieldArrayHeaderProps}>
              {label && (
                <FormField
                  className={classes.noMargin}
                  error={
                    isError && {
                      content: error,
                      color: 'red',
                      pointing: 'left'
                    }
                  }
                  control={() => (
                    <Header
                      floated="left"
                      className={clsx(classes.noMargin, {
                        [classes.error]: isError
                      })}
                      size="large"
                    >
                      {label}
                    </Header>
                  )}
                />
              )}
              <div className={clsx(classes.buttonGroup, arrayButtonGridClassName)} {...FieldArrayButtonGridProps}>
                <ButtonGroup {...ButtonGroupProps}>
                  <Button
                    icon="undo"
                    className="ddorg__suir__mapper__field-array-undo"
                    {...UndoButtonProps}
                    type="button"
                    disabled={state.index === 0}
                    onClick={undo}
                  />
                  <Button
                    icon="redo"
                    className="ddorg__suir__mapper__field-array-redo"
                    {...RedoButtonProps}
                    type="button"
                    disabled={state.index === state.history.length}
                    onClick={redo}
                  />
                  <Button
                    content={combinedButtonLabels.add}
                    icon="add"
                    color="blue"
                    {...AddButtonProps}
                    type="button"
                    onClick={pushWrapper}
                    disabled={value.length >= maxItems}
                  />
                </ButtonGroup>
              </div>
            </div>
            {description && (
              <Header className={clsx(classes.noMargin, descriptionClassName)} sub {...DescriptionProps}>
                {description}
              </Header>
            )}
            <div className={clsx(classes.arrayItems, arrayItemsClassName)} {...ArrayItemsGridProps}>
              {value.length <= 0 ? (
                <p className={clsx(classes.noItems, noItemsClassname)} {...NoItemsProps}>
                  {noItemsMessage}
                </p>
              ) : (
                map((name, index) => (
                  <ArrayItem
                    removeLabel={combinedButtonLabels.remove}
                    fieldIndex={index}
                    fields={formFields}
                    key={name}
                    name={name}
                    length={value.length}
                    minItems={minItems}
                    remove={removeWrapper}
                    RemoveButtonProps={RemoveButtonProps}
                    ArrayItemGridProps={ArrayItemGridProps}
                    ArrayItemFieldsGridProps={ArrayItemFieldsGridProps}
                  />
                ))
              )}
            </div>
            {(isError || submitError) && (
              <div className="ddorg__suir__mapper__field-array-error">
                <p>{error || submitError}</p>
              </div>
            )}
          </div>
        );
      }}
    </FieldArray>
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
  buttonLabels: PropTypes.object,
  /** Sub components customization API */
  FieldArrayGridProps: PropTypes.object,
  FieldArrayHeaderProps: PropTypes.object,
  FieldArrayButtonGridProps: PropTypes.object,
  ButtonGroupProps: PropTypes.object,
  UndoButtonProps: PropTypes.object,
  RedoButtonProps: PropTypes.object,
  AddButtonProps: PropTypes.object,
  DescriptionProps: PropTypes.object,
  ArrayItemsGridProps: PropTypes.object,
  NoItemsProps: PropTypes.object,
  RemoveButtonProps: PropTypes.object,
  ArrayItemGridProps: PropTypes.object,
  ArrayItemFieldsGridProps: PropTypes.object
};

DynamicArray.defaultProps = {
  maxItems: Infinity,
  minItems: 0,
  noItemsMessage: 'No items added',
  FieldArrayGridProps: {},
  FieldArrayHeaderProps: {},
  FieldArrayButtonGridProps: {},
  ButtonGroupProps: {},
  UndoButtonProps: {},
  RedoButtonProps: {},
  AddButtonProps: {},
  DescriptionProps: {},
  ArrayItemsGridProps: {},
  NoItemsProps: {},
  RemoveButtonProps: {},
  ArrayItemGridProps: {},
  ArrayItemFieldsGridProps: {}
};

export default DynamicArray;
