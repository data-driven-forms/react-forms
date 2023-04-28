import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentMapper, FormTemplate } from '../index';

describe('DualListSelect', () => {
  let onSubmit;
  let initialProps;
  let schema;

  beforeEach(() => {
    onSubmit = jest.fn();

    schema = {
      fields: [
        {
          component: componentTypes.DUAL_LIST_SELECT,
          name: 'dual-Menu',
          options: [
            {
              value: 'cats',
              label: 'cats',
            },
            {
              value: 'cats_1',
              label: 'cats_1',
            },
            {
              value: 'cats_2',
              label: 'cats_2',
            },
            {
              value: 'zebras',
              label: 'zebras',
            },
            {
              value: 'pigeons',
              label: 'pigeons',
            },
          ],
        },
      ],
    };

    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
      FormTemplate: (props) => <FormTemplate {...props} />,
      schema,
    };
  });

  it('renders correctly', async () => {
    await act(async () => {
      render(<FormRenderer {...initialProps} />);
    });

    expect(screen.getByText('cats')).toBeInTheDocument();
    expect(screen.getByText('cats_1')).toBeInTheDocument();
    expect(screen.getByText('cats_2')).toBeInTheDocument();
    expect(screen.getByText('zebras')).toBeInTheDocument();
    expect(screen.getByText('pigeons')).toBeInTheDocument();
  });

  it('switch left option', async () => {
    await act(async () => {
      render(<FormRenderer {...initialProps} />);
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('cats'));
    await userEvent.click(screen.getByLabelText('right'));

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-Menu': ['cats'] });
  });

  it('switch right option', async () => {
    await act(async () => {
      render(<FormRenderer {...initialProps} initialValues={{ 'dual-Menu': ['cats'] }} />);
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({ 'dual-Menu': ['cats'] });
    onSubmit.mockClear();

    await userEvent.click(screen.getByText('cats'));
    await userEvent.click(screen.getByLabelText('left'));

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({});
  });
});
