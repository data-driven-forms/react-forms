import React from 'react';
import { mount } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormTabs from '../components/tabs';
import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('tabs', () => {
  const props = {
    fields: [
      {
        title: 'cosiTitle',
        name: 'cosiName',
        fields: []
      },
      {
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: []
      }
    ]
  };

  const formOptions = {
    renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>)
  };

  it('should render tabs correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <FormTabs {...props} />
      </RenderWithProvider>
    );

    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(Tab)).toHaveLength(2);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should switch tabs correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <FormTabs {...props} />
      </RenderWithProvider>
    );

    expect(
      wrapper
        .find(Tab)
        .first()
        .props().selected
    ).toEqual(true);
    expect(
      wrapper
        .find(Tab)
        .last()
        .props().selected
    ).toEqual(false);

    const secondTabButton = wrapper.find('button').last();
    secondTabButton.simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(Tab)
        .first()
        .props().selected
    ).toEqual(false);
    expect(
      wrapper
        .find(Tab)
        .last()
        .props().selected
    ).toEqual(true);
  });
});
