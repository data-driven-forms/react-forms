import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';

describe('<PlainText />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'check',
          label: 'I am happy text',
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('I am happy text')).toBeInTheDocument();
  });
});
