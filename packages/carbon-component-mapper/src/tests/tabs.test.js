import React from 'react';
import { mount } from 'enzyme';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { Tabs as CarbonTabs, Tab } from 'carbon-components-react';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import Tabs from '../tabs';
import WrapperTextField from '../text-field';
import WrapperSwitch from '../switch';

describe('<Tabs />', () => {
  it('renders correctly', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.TABS,
          name: 'tabs',
          fields: [
            {
              title: 'title 1',
              name: 'tab1',
              fields: [{ label: 'some-label', component: componentTypes.SWITCH, name: 'switch' }]
            },
            {
              title: 'title 2',
              name: 'tab2',
              fields: [{ label: 'some-label', component: componentTypes.TEXT_FIELD, name: 'text_field' }]
            }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(CarbonTabs)).toHaveLength(1);
    expect(wrapper.find(Tab)).toHaveLength(2);
    expect(wrapper.find(WrapperTextField)).toHaveLength(1);
    expect(wrapper.find(WrapperSwitch)).toHaveLength(1);
  });
});
