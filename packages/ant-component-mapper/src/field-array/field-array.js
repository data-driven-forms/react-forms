import React, { memo, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import { useFieldApi, useFormApi, FieldArray } from '@data-driven-forms/react-form-renderer';
import { Row, Col, Button, Typography, Space } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';

import FormGroup from '../form-group';

const ArrayItem = memo(
  ({
    fields,
    fieldIndex,
    name,
    remove,
    length,
    minItems,
    removeLabel,
    ArrayItemProps,
    FieldsContainerProps,
    RemoveContainerProps,
    RemoveButtonProps,
  }) => {
    const { renderForm } = useFormApi();

    const editedFields = fields.map((field, index) => {
      const computedName = field.name ? `${name}.${field.name}` : name;
      return { ...field, name: computedName, key: `${computedName}-${index}` };
    });

    return (
      <Row {...ArrayItemProps}>
        <Col span={24} {...FieldsContainerProps}>
          {renderForm([editedFields])}
        </Col>
        <Col span={24} {...RemoveContainerProps}>
          <Button type="primary" danger {...RemoveButtonProps} onClick={() => remove(fieldIndex)} disabled={length <= minItems}>
            {removeLabel}
          </Button>
        </Col>
      </Row>
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
    FormFieldGridProps,
    FormControlProps,
    buttonLabels,
    validateOnMount,
    isRequired,
    helperText,
    // customization props
    FormItemProps = {},
    ArrayItemProps = {},
    FieldsContainerProps = {},
    RemoveContainerProps = {},
    RemoveButtonProps = {},
    FieldArrayRowProps = {},
    FieldArrayRowCol = {},
    FieldArrayHeaderProps = {},
    FieldArrayLabelProps = {},
    FieldArrayButtonsProps = {},
    UndoButtonProps = {},
    RedoButtonProps = {},
    AddButtonProps = {},
    FieldArrayDescriptionProps = {},
    NoItemsMessageProps = {},
    ErrorMessageProps = {},
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
    <FormGroup
      meta={{ ...meta, error: typeof error === 'object' ? error.name : error }}
      validateOnMount={validateOnMount}
      helperText={helperText}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
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
            <Row gutter={[0, 16]} {...FieldArrayRowProps}>
              <Col span={24} {...FieldArrayRowCol}>
                <Row justify="space-between" {...FieldArrayHeaderProps}>
                  <Col>
                    {label && (
                      <Typography.Title level={4} {...FieldArrayLabelProps}>
                        {label}
                      </Typography.Title>
                    )}
                  </Col>
                  <Col>
                    <Space {...FieldArrayButtonsProps}>
                      <Button type="default" icon={<UndoOutlined />} {...UndoButtonProps} onClick={undo} disabled={state.index === 0} />
                      <Button
                        type="default"
                        icon={<RedoOutlined />}
                        {...RedoButtonProps}
                        onClick={redo}
                        disabled={state.index === state.history.length}
                      />
                      <Button type="primary" {...AddButtonProps} onClick={pushWrapper} disabled={value.length >= maxItems}>
                        {combinedButtonLabels.add}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>
              {description && (
                <Col span={24}>
                  <Typography.Text {...FieldArrayDescriptionProps}>{description}</Typography.Text>
                </Col>
              )}
              <Col span={24}>
                <Row gutter={[0, 16]}>
                  {value.length <= 0 ? (
                    typeof noItemsMessage === 'string' ? (
                      <Typography.Text {...NoItemsMessageProps}>{noItemsMessage}</Typography.Text>
                    ) : (
                      React.cloneElement(noItemsMessage, NoItemsMessageProps)
                    )
                  ) : (
                    map((name, index) => (
                      <Col span={24} key={name}>
                        <ArrayItem
                          fields={formFields}
                          name={name}
                          fieldIndex={index}
                          remove={removeWrapper}
                          length={value.length}
                          minItems={minItems}
                          removeLabel={combinedButtonLabels.remove}
                          ArrayItemProps={ArrayItemProps}
                          FieldsContainerProps={FieldsContainerProps}
                          RemoveContainerProps={RemoveContainerProps}
                          RemoveButtonProps={RemoveButtonProps}
                        />
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
              {(isError || submitError) && (
                <Col span={12}>
                  <Typography.Text type="danger" {...ErrorMessageProps}>
                    {typeof error === 'object' ? error.name : error || submitError}
                  </Typography.Text>
                </Col>
              )}
            </Row>
          );
        }}
      </FieldArray>
    </FormGroup>
  );
};

export default DynamicArray;
