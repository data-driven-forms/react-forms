import React from 'react';
import { FormRenderer, FormError } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentMapper, FormTemplate } from '../';

describe('<FormTemplate />', () => {
  it('<Description /> renders correctly', () => {
    render(
      <FormRenderer
        onSubmit={jest.fn()}
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        schema={{ description: 'Some description', fields: [] }}
      />
    );

    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('<Title /> renders correctly', () => {
    render(
      <FormRenderer onSubmit={jest.fn()} componentMapper={componentMapper} FormTemplate={FormTemplate} schema={{ title: 'Some title', fields: [] }} />
    );

    expect(screen.getByText('Some title')).toBeInTheDocument();
  });

  it('show form alert message', async () => {
    render(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
              inputProps: { 'aria-label': 'field' },
            },
          ],
        }}
        validate={({ field }) => {
          if (field) {
            return { [FormError]: 'some error title' };
          }
        }}
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
      />
    );

    await userEvent.type(screen.getByLabelText('field'), 'something');

    expect(screen.getByText('some error title')).toBeInTheDocument();
  });

  it('show form alert message as object', async () => {
    render(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
              inputProps: { 'aria-label': 'field' },
            },
          ],
        }}
        validate={({ field }) => {
          if (field) {
            return { [FormError]: { title: 'some error title', description: 'some description' } };
          }
        }}
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
      />
    );

    await userEvent.type(screen.getByLabelText('field'), 'something');

    expect(screen.getByText('some error title')).toBeInTheDocument();
    expect(screen.getByText('some description')).toBeInTheDocument();
  });
});
