import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<Tabs />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TABS,
          name: 'tabs',
          fields: [
            {
              component: componentTypes.TAB_ITEM,
              title: 'title 1',
              name: 'tab1',
              description: 'desc 1',
              fields: [{ component: componentTypes.SLIDER, name: 'slider', 'aria-label': 'slider' }],
            },
            {
              component: componentTypes.TAB_ITEM,
              title: 'title 2',
              name: 'tab2',
              description: 'desc 2',
              fields: [{ component: componentTypes.TEXT_FIELD, name: 'text_field', 'aria-label': 'text-field' }],
            },
          ],
        },
      ],
    };

    render(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(screen.getByText('title 1')).toBeInTheDocument();
    expect(screen.getByText('title 2')).toBeInTheDocument();

    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(() => screen.getByLabelText('text-area')).toThrow();
  });
});
