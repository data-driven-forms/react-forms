import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';

describe('<Tabs />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'tabs',
          title: 'Title',
          description: 'desc',
          fields: [
            { component: componentTypes.SLIDER, name: 'slider', label: 'slider' },
            { component: componentTypes.TEXT_FIELD, name: 'text_field', label: 'text-field' },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByText('slider')).toBeInTheDocument();
    expect(screen.getByText('text-field')).toBeInTheDocument();
  });
});
