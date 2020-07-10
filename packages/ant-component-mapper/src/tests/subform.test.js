import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import WrapperTextField from '../files/text-field';
import WrapperSlider from '../files/slider';
import SubForm from '../files/sub-form';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

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
    expect(wrapper.find(Title).text()).toEqual('Title');
    expect(wrapper.find(Paragraph).text()).toEqual('desc');
  });
});
