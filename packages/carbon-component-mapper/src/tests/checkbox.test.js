import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<Checkbox />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
          label: 'Please select on of options',
          options: [
            {
              label: 'option 1',
              value: 1,
            },
            {
              label: 'option 2',
              value: 2,
            },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });

  it('selects item in multiple checkbox', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
          label: 'Please select on of options',
          options: [
            {
              label: 'option 1',
              value: 'option-1',
            },
            {
              label: 'option 2',
              value: 'option-2',
            },
          ],
        },
      ],
    };

    const submitSpy = jest.fn();

    render(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    await userEvent.click(screen.getByText('option 1'));
    await userEvent.click(screen.getByText('Submit'));
    expect(submitSpy).toHaveBeenLastCalledWith({ check: ['option-1'] });

    await userEvent.click(screen.getByText('option 2'));
    await userEvent.click(screen.getByText('Submit'));

    expect(submitSpy).toHaveBeenLastCalledWith({ check: ['option-1', 'option-2'] });

    await userEvent.click(screen.getByText('option 1'));
    await userEvent.click(screen.getByText('Submit'));

    expect(submitSpy).toHaveBeenLastCalledWith({ check: ['option-2'] });
  });
});
