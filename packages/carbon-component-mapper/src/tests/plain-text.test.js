import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<PlainText />', () => {
  it('renders', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'check',
          label: 'I am happy text',
        },
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'header',
          label: 'header',
          element: 'h1',
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('I am happy text', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('header', { selector: 'h1' })).toBeInTheDocument();
  });
});
