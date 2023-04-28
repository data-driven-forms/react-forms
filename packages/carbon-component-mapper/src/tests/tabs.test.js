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
              title: 'title 1',
              name: 'tab1',
              fields: [{ label: 'some-label-1', component: componentTypes.SWITCH, name: 'switch' }],
            },
            {
              title: 'title 2',
              name: 'tab2',
              fields: [{ label: 'some-label-2', component: componentTypes.TEXT_FIELD, name: 'text_field' }],
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

    expect(screen.getByText('some-label-1')).toBeInTheDocument();
    expect(screen.getByText('some-label-2')).toBeInTheDocument();
  });
});
