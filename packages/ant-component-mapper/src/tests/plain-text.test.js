import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { Typography } from 'antd';

describe('<PlainText />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'check',
          label: 'I am happy text'
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Typography.Paragraph).text()).toEqual('I am happy text');
  });
});
