import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import { componentMapper, FormTemplate } from '../index';

describe('<FieldArray/>', () => {
  let initialProps;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      componentMapper,
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
    expect(screen.getByLabelText('CUSTOM REMOVE')).toBeInTheDocument();
  });

  it('allow to Add item/remove named fields', async () => {
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

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [{ name: 'enter a name', lastName: 'enter a last name' }],
    });

    onSubmit.mockClear();

    await userEvent.click(screen.getByLabelText('Remove'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('allow to remove all', async () => {
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

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: [
        { name: 'enter a name', lastName: 'enter a last name' },
        { name: 'enter a name', lastName: 'enter a last name' },
        { name: 'enter a name', lastName: 'enter a last name' },
      ],
    });

    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Delete all'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('allow to Add item/remove unnamed (array) fields', async () => {
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

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });

    onSubmit.mockClear();

    await userEvent.click(screen.getByLabelText('Remove'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('allow to Add item/remove within minItems/maxItems range', async () => {
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

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem', 'defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getAllByLabelText('Remove')[0]);
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      nicePeople: ['defaultItem'],
    });
    onSubmit.mockClear();

    await userEvent.click(screen.getAllByLabelText('Remove')[0]);
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

    await userEvent.click(screen.getByText('Add item'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(screen.getByText('Must have at least 3 items.')).toBeInTheDocument();
  });

  it('should render array field correctly with props', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: <label id="label">hello</label>,
            noItemsMessage: <h4 id="message">No items</h4>,
            description: <h3 id="desc">No description</h3>,
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('No description')).toBeInTheDocument();
  });

  it('should render array field correctly with props and initial values', async () => {
    initialProps = {
      ...initialProps,
      initialValues: { foo: ['bar', 'foo'] },
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: <label id="label">hello</label>,
            noItemsMessage: <h4 id="message">No items</h4>,
            description: <h3 id="desc">No description</h3>,
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(() => screen.getByText('No items')).toThrow();
    expect(screen.getByText('No description')).toBeInTheDocument();

    expect(screen.getAllByLabelText('Remove')).toHaveLength(2);
  });

  it('should remove nested field to form', async () => {
    initialProps = {
      ...initialProps,
      initialValues: { foo: ['first value'] },
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo',
                'aria-label': 'foo',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    expect(screen.getByLabelText('foo')).toBeInTheDocument();

    await userEvent.click(screen.getAllByLabelText('Remove')[0]);

    expect(() => screen.getByLabelText('foo')).toThrow();
  });

  it('should extract dynamic field name if it contains custom name', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: 'Title',
            description: 'description',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'nested-component',
                label: 'foo',
                'aria-label': 'foo',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('Add item'));

    expect(screen.getByLabelText('foo')).toHaveAttribute('name', 'foo[0].nested-component');
  });

  it('should extract dynamic field name if it not contains name', async () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            component: componentTypes.FIELD_ARRAY,
            name: 'foo',
            label: 'Title',
            description: 'description',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                label: 'foo',
                'aria-label': 'foo',
              },
            ],
          },
        ],
      },
    };

    render(<FormRenderer {...initialProps} />);

    await userEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText('foo')).toHaveAttribute('name', 'foo[0]');
  });
});
