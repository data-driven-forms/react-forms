import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<SubForm />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'tabs',
          title: 'Title',
          description: 'desc',
          TitleElement: 'h3',
          DescriptionElement: 'small',
          fields: [
            { label: 'label switch', component: componentTypes.SWITCH, name: 'switch' },
            { label: 'label text', component: componentTypes.TEXT_FIELD, name: 'text_field' },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('Title', { selector: 'h3' })).toBeInTheDocument();
    expect(screen.getByText('desc', { selector: 'small' })).toBeInTheDocument();

    expect(screen.getByText('label switch')).toBeInTheDocument();
    expect(screen.getByText('label text')).toBeInTheDocument();
  });
});
