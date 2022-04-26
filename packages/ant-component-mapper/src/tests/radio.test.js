import React from 'react';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentMapper, FormTemplate } from '../index';

describe('<Radio />', () => {
  let initialProps;
  let onSubmit;

  const schema = {
    fields: [
      {
        component: 'radio',
        label: 'Radio',
        name: 'radio',
        initialValue: '2',
        options: [
          {
            label: 'Dogs',
            value: '1',
          },
          {
            label: 'Cats',
            value: '2',
          },
          {
            label: 'Hamsters',
            value: '3',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      onSubmit: (values) => onSubmit(values),
      componentMapper,
      FormTemplate: (props) => <FormTemplate {...props} />,
      schema,
    };
  });

  it('initialValues work', async () => {
    render(<FormRenderer {...initialProps} initialValues={{ radio: '2' }} />);

    expect([...screen.getAllByRole('radio')].map((r) => [r.name, r.value, r.checked])).toEqual([
      ['radio', '1', false],
      ['radio', '2', true],
      ['radio', '3', false],
    ]);

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenLastCalledWith({ radio: '2' });

    await userEvent.click(screen.getByText('Hamsters'));

    expect([...screen.getAllByRole('radio')].map((r) => [r.name, r.value, r.checked])).toEqual([
      ['radio', '1', false],
      ['radio', '2', false],
      ['radio', '3', true],
    ]);

    await act(async () => {
      await userEvent.click(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenLastCalledWith({ radio: '3' });
  });
});
