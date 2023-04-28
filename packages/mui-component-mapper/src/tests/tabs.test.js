import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormTabs from '../tabs';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import { FormRenderer, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '../index';

describe('tabs', () => {
  const props = {
    fields: [
      {
        title: 'cosiTitle',
        name: 'cosiName',
        fields: [],
      },
      {
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: [],
      },
    ],
  };

  const formOptions = {
    renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
  };

  it('should render tabs correctly', () => {
    render(
      <RenderWithProvider value={{ formOptions }}>
        <FormTabs {...props} />
      </RenderWithProvider>
    );

    expect(screen.getByText('cosiTitle')).toBeInTheDocument();
    expect(screen.getByText('cosiTitle2')).toBeInTheDocument();
  });

  it('should switch tabs correctly', async () => {
    render(
      <RenderWithProvider value={{ formOptions }}>
        <FormTabs {...props} />
      </RenderWithProvider>
    );

    expect(screen.getByText('cosiTitle')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('cosiTitle2')).toHaveAttribute('aria-selected', 'false');

    await userEvent.click(screen.getByText('cosiTitle2'));

    expect(screen.getByText('cosiTitle')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('cosiTitle2')).toHaveAttribute('aria-selected', 'true');
  });

  it('validate all tabs', async () => {
    const onSubmit = jest.fn();
    render(
      <FormRenderer
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate {...props} />}
        onSubmit={(values) => onSubmit(values)}
        schema={{
          fields: [
            {
              component: 'tabs',
              name: 'tabs1',
              title: 'tabs1',
              fields: [
                {
                  name: 'tabitem1',
                  component: 'tab-item',
                  fields: [
                    {
                      component: 'text-field',
                      name: 'name',
                      validate: [{ type: validatorTypes.REQUIRED }],
                      inputProps: { 'aria-label': 'name' },
                    },
                  ],
                },
                {
                  name: 'tabitem2',
                  component: 'tab-item',
                  fields: [
                    {
                      component: 'text-field',
                      name: 'password',
                      validate: [{ type: validatorTypes.REQUIRED }],
                      inputProps: { 'aria-label': 'password' },
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    );

    await userEvent.type(screen.getByLabelText('name'), 'NAME');
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText('password'), 'PASSWORD');
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'NAME', password: 'PASSWORD' });
  });
});
