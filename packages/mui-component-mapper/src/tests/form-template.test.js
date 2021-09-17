import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, FormError } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { componentMapper, FormTemplate } from '../';

describe('<FormTemplate />', () => {
  it('<Description /> renders correctly', () => {
    const wrapper = mount(
      <FormRenderer
        onSubmit={jest.fn()}
        componentMapper={componentMapper}
        FormTemplate={FormTemplate}
        schema={{ description: 'Some description', fields: [] }}
      />
    );

    expect(wrapper.find(Typography).text()).toEqual('Some description');
  });

  it('<Title /> renders correctly', () => {
    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} componentMapper={componentMapper} FormTemplate={FormTemplate} schema={{ title: 'Some title', fields: [] }} />
    );

    expect(wrapper.find(Typography).text()).toEqual('Some title');
  });

  it('show form alert message', async () => {
    const wrapper = mount(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
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

    expect(wrapper.find(Alert)).toHaveLength(0);

    await act(async () => {
      wrapper.find('input').first().instance().value = 'cats';
      wrapper.find('input').first().simulate('change');
    });
    wrapper.update();

    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).text()).toEqual('some error title');
  });

  it('show form alert message as object', async () => {
    const wrapper = mount(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
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

    expect(wrapper.find(Alert)).toHaveLength(0);

    await act(async () => {
      wrapper.find('input').first().instance().value = 'cats';
      wrapper.find('input').first().simulate('change');
    });
    wrapper.update();

    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(AlertTitle).text()).toEqual('some error title');
    expect(wrapper.find(Alert).text()).toEqual('some error titlesome description');
  });
});
