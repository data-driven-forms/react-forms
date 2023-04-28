import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';

describe('<Checkbox />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
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

  it('renders multiple required checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          isRequired: true,
          name: 'check',
          label: 'check',
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

    expect(screen.getByText('(required)')).toBeInTheDocument();
  });
});
