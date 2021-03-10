import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('<PlainText />', () => {
  it('renders', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'check',
          label: 'I am happy text'
        },
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'header',
          label: 'header',
          element: 'h1'
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find('p').text()).toEqual('I am happy text');
    expect(wrapper.find('h1').text()).toEqual('header');
  });
});
