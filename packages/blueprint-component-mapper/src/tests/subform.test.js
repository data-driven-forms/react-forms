import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';
import WrapperTextField from '../text-field/text-field';
import WrapperSlider from '../slider/slider';
import SubForm from '../sub-form/sub-form';
import { H3, H4 } from '@blueprintjs/core';

describe('<Tabs />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SUB_FORM,
          name: 'tabs',
          title: 'Title',
          description: 'desc',
          fields: [
            { component: componentTypes.SLIDER, name: 'slider' },
            { component: componentTypes.TEXT_FIELD, name: 'text_field' }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(SubForm)).toHaveLength(1);
    expect(wrapper.find(WrapperTextField)).toHaveLength(1);
    expect(wrapper.find(WrapperSlider)).toHaveLength(1);
    expect(wrapper.find(H3).text()).toEqual('Title');
    expect(wrapper.find(H4).text()).toEqual('desc');
  });
});
