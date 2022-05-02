import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<Switch />', () => {
  it('initialValue works', async () => {
    const spy = jest.fn();
    const schema = {
      fields: [
        {
          component: componentTypes.SWITCH,
          name: 'switch',
          label: 'Switch',
          initialValue: true,
          'data-testid': 'Switch',
        },
      ],
    };

    render(
      <FormRenderer
        onSubmit={(values) => spy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(screen.getByTestId('Switch')).toBeChecked();

    await userEvent.click(screen.getByText('Submit'));

    expect(spy).toHaveBeenCalledWith({ switch: true });
    spy.mockClear();

    await userEvent.click(screen.getByText('Switch'));

    expect(screen.getByTestId('Switch')).not.toBeChecked();

    await userEvent.click(screen.getByText('Submit'));

    expect(spy).toHaveBeenCalledWith({ switch: false });
  });
});
