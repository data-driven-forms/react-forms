import React from 'react';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(() => screen.getByText(noItemsMessage)).toThrow();
    expect(screen.getByText('CUSTOM REMOVE')).toBeInTheDocument();
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
              },
              {
                component: componentTypes.TEXT_FIELD,
                name: 'lastName',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Add'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }],
    });

    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Remove'));
    await userEvent.click(screen.getByText('Submit'));

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

    await userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Add'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });

    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Remove'));
    await userEvent.click(screen.getByText('Submit'));

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

    await userEvent.click(screen.getByText('Add'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Add'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Add'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getAllByText('Remove')[0]);
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getAllByText('Remove')[0]);
    await userEvent.click(screen.getByText('Submit'));

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

    await userEvent.click(screen.getByText('Add'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(screen.getByText('Must have at least 3 items.')).toBeInTheDocument();
  });
});
