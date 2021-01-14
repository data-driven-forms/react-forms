import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { Checkbox } from 'carbon-components-react';

describe('<Checkbox />', () => {
  it('renders multiple checkbox', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'check',
          label: 'Please select on of options',
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
        .props().labelText
    ).toEqual('option 1');
    expect(
      wrapper
        .find(Checkbox)
        .last()
        .props().labelText
    ).toEqual('option 2');
  });
});
