import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { Checkbox } from 'antd';

describe('<Checkbox />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      title: 'checkbox',
      description: 'desc',
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
          options: [
            {
              label: 'option 1',
              value: 1
            },
            {
              label: 'option 2',
              value: 2
            }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Checkbox)).toHaveLength(2);
    expect(
      wrapper
        .find(Checkbox)
        .first()
        .props().children
    ).toEqual('option 1');
    expect(
      wrapper
        .find(Checkbox)
        .last()
        .props().children
    ).toEqual('option 2');
    expect(wrapper.find('.ant-form-item-required')).toHaveLength(0);
  });

  it('renders multiple required checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          isRequired: true,
          name: 'check',
          label: 'check',
          options: [
            {
              label: 'option 1',
              value: 1
            },
            {
              label: 'option 2',
              value: 2
            }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find('.ant-form-item-required')).toHaveLength(1);
  });
});
