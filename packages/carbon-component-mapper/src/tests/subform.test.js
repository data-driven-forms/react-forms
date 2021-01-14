import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import WrapperTextField from '../text-field';
import WrapperSwitch from '../switch';
import SubForm from '../sub-form';

describe('<SubForm />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'tabs',
          title: 'Title',
          description: 'desc',
          TitleElement: 'h3',
          DescriptionElement: 'small',
          fields: [
            { label: 'label', component: componentTypes.SWITCH, name: 'switch' },
            { label: 'label', component: componentTypes.TEXT_FIELD, name: 'text_field' }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(SubForm)).toHaveLength(1);
    expect(wrapper.find(WrapperTextField)).toHaveLength(1);
    expect(wrapper.find(WrapperSwitch)).toHaveLength(1);
    expect(wrapper.find('h3').text()).toEqual('Title');
    expect(wrapper.find('small').text()).toEqual('desc');
  });
});
