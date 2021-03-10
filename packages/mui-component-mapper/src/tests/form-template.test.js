import React from 'react';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { Typography } from '@material-ui/core';

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
});
