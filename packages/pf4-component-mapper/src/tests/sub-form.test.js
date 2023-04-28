import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('SubForm component', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      componentMapper,
      FormTemplate,
      onSubmit: jest.fn(),
    };
  });

  it('should render SubForm correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'subform',
          title: 'some title',
          description: 'some description',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'some input',
              label: 'some input',
            },
          ],
        },
      ],
    };
    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('some title')).toBeInTheDocument();
    expect(screen.getByText('some description')).toBeInTheDocument();
    expect(screen.getByText('some input')).toBeInTheDocument();
  });

  it('should render SubForm without description correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'subform',
          title: 'some title',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'some input',
              label: 'some input',
            },
          ],
        },
      ],
    };
    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('some title')).toBeInTheDocument();
    expect(screen.getByText('some input')).toBeInTheDocument();
  });

  it('should render SubForm without title correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'subform',
          description: 'some description',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'some input',
              label: 'some input',
            },
          ],
        },
      ],
    };
    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('some description')).toBeInTheDocument();
    expect(screen.getByText('some input')).toBeInTheDocument();
  });
});
