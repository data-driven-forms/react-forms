import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { Tabs as BTabs } from '@blueprintjs/core';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import Tabs from '../files/tabs';
import WrapperTextField from '../files/text-field';
import WrapperSlider from '../files/slider';

describe('<Tabs />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TABS,
          name: 'tabs',
          fields: [
            {
              component: componentTypes.TAB_ITEM,
              title: 'title 1',
              name: 'tab1',
              description: 'desc 1',
              fields: [{ component: componentTypes.SLIDER, name: 'slider' }]
            },
            {
              component: componentTypes.TAB_ITEM,
              title: 'title 2',
              name: 'tab2',
              description: 'desc 2',
              fields: [{ component: componentTypes.TEXT_FIELD, name: 'text_field' }]
            }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(BTabs)).toHaveLength(1);
    expect(wrapper.find('.bp3-tab-panel')).toHaveLength(2);
    expect(wrapper.find(WrapperTextField)).toHaveLength(1);
    expect(wrapper.find(WrapperSlider)).toHaveLength(1);
  });
});
