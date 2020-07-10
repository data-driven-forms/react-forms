import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { Select } from 'antd';

describe('<Select />', () => {
  it('renders select', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('renders multi select', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          isMulti: true,
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Select).props().mode).toEqual('multiple');
  });
});
