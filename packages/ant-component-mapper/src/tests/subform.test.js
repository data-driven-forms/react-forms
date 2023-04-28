import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<Subform />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'tabs',
          title: 'Title',
          description: 'desc',
          fields: [
            { component: componentTypes.SLIDER, name: 'slider' },
            { component: componentTypes.TEXT_FIELD, name: 'text_field', 'aria-label': 'text-field' },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByLabelText('text-field')).toBeInTheDocument();
  });
});
