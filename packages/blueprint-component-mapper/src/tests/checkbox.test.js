import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';
import { Checkbox } from '@blueprintjs/core';

describe('<Checkbox />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
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
        .props().label
    ).toEqual('option 1');
    expect(
      wrapper
        .find(Checkbox)
        .last()
        .props().label
    ).toEqual('option 2');
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

    expect(
      wrapper
        .find('.bp3-text-muted')
        .last()
        .text()
    ).toEqual('(required)');
  });
});
