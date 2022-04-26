import React from 'react';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { reducer } from '../field-array';

import { componentMapper, FormTemplate } from '../index';

describe('<FieldArray/>', () => {
  let initialProps;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      componentMapper: {
        ...componentMapper,
        [componentTypes.FIELD_ARRAY]: {
          component: componentMapper[componentTypes.FIELD_ARRAY],
          AddButtonProps: { id: 'add-button' },
          RemoveButtonProps: { id: 'remove-button' },
        },
      },
      FormTemplate,
      onSubmit: (values) => onSubmit(values),
    };
  });

  it('renders with label and description + custom labels', async () => {
    const label = 'some title';
    const description = 'some description';
    const noItemsMessage = 'no items';

    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            label,
            description,
            noItemsMessage,
            buttonLabels: {
              add: 'CUSTOM ADD',
              remove: 'CUSTOM REMOVE',
            },
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'name',
                'aria-label': 'name',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(noItemsMessage)).toBeInTheDocument();
    expect(() => screen.getByLabelText('name')).toThrow();

    await userEvent.click(screen.getByText('CUSTOM ADD'));

    expect(() => screen.getByText(noItemsMessage)).toThrow();
    expect(screen.getByText('CUSTOM REMOVE')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });

  it('allow to add/remove named fields', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: { name: 'enter a name', lastName: 'enter a last name' },
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'name',
                'aria-label': 'name',
              },
              {
                component: componentTypes.TEXT_FIELD,
                name: 'lastName',
                'aria-label': 'lastName',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }],
    });
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('REMOVE'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [],
    });
  });

  it('allow to add/remove unnamed (array) fields', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: 'defaultItem',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });

    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('REMOVE'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [],
    });
  });

  it('allow to add/remove within minItems/maxItems range', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: 'defaultItem',
            minItems: 1,
            maxItems: 2,
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem'],
    });
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem'],
    });
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getAllByText('REMOVE')[0]);
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getAllByText('REMOVE')[0]);
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
  });

  it('shows error', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            validate: [{ type: validatorTypes.MIN_ITEMS, threshold: 3 }],
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    expect(() => screen.getByText('Must have at least 3 items.')).toThrow();

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(screen.getAllByText('Must have at least 3 items.')).toBeTruthy();
  });

  it('allow to revert removal', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'nicePeople',
            defaultItem: { name: 'enter a name', lastName: 'enter a last name' },
            UndoButtonProps: { 'aria-label': 'undo-button' },
            RedoButtonProps: { 'aria-label': 'redo-button' },
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }],
    });

    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByText('REMOVE'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [],
    });

    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByLabelText('undo-button'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }],
    });

    onSubmit.mockClear();

    await act(async () => {
      await userEvent.click(screen.getByLabelText('redo-button'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [],
    });

    await act(async () => {
      await userEvent.click(screen.getByLabelText('undo-button'));
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }],
    });

    await act(async () => {
      await userEvent.click(screen.getByText('ADD'));
    });

    expect(screen.getByLabelText('redo-button')).toBeDisabled();
  });

  it('reducer - default state', () => {
    const initialState = { aa: 'aa' };

    expect(reducer(initialState, { type: 'nonsense' })).toEqual(initialState);
  });
});
