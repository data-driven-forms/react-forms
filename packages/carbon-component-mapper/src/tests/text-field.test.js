import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<TextInput and NumberInput />', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('renders NumberInput', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          type: 'number',
          step: 1,
          initialValue: 1,
        },
      ],
    };

    render(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(screen.getByLabelText('Please enter a value')).toHaveAttribute('type', 'number');
  });

  it('NumberInput - click on increment button', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          type: 'number',
          step: 1,
          initialValue: 1,
        },
      ],
    };

    render(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );
    await userEvent.click(screen.getByLabelText('Increment number'));
    await userEvent.click(screen.getByText('Submit'));

    expect(submitSpy).toHaveBeenCalledWith({ input: '2' });
  });

  it('NumberInput - click on decrement button ', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          type: 'number',
          step: 1,
          initialValue: 5,
        },
      ],
    };

    render(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );
    await userEvent.click(screen.getByLabelText('Decrement number'));
    await userEvent.click(screen.getByText('Submit'));

    expect(submitSpy).toHaveBeenCalledWith({ input: '4' });
  });

  it('renders TextInput', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'input',
          label: 'Please enter a value',
          initialValue: 'test',
        },
      ],
    };

    render(
      <FormRenderer
        onSubmit={(values) => submitSpy(values)}
        FormTemplate={(props) => <FormTemplate {...props} />}
        schema={schema}
        componentMapper={componentMapper}
      />
    );

    expect(screen.getByLabelText('Please enter a value')).toHaveAttribute('type', 'text');
  });
});
