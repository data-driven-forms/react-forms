import React from 'react';
import { mount } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormTabs from '../form-fields/tabs';

describe('tabs', () => {
  const props = {
    fields: [
      {
        key: 'cosiKey',
        title: 'cosiTitle',
        name: 'cosiName',
        fields: [],
      },
      {
        key: 'cosiKey2',
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: [],
      },
    ],
    formOptions: {
      renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
    },
  };

  it('should render tabs correctly', () => {
    const wrapper = mount(<FormTabs { ...props } />);

    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(Tab)).toHaveLength(2);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should switch tabs correctly', () => {
    const wrapper = mount(<FormTabs { ...props } />);
    expect(wrapper.instance().state.activeTab).toEqual(0);

    const secondTabButton = wrapper.find('button').last();
    secondTabButton.simulate('click');

    expect(wrapper.instance().state.activeTab).toEqual(1);
  });
});
