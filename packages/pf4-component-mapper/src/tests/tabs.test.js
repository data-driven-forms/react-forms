import React from 'react';
import Tabs from '../files/tabs';
import { mount } from 'enzyme';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import { Tabs as PF4Tabs } from '@patternfly/react-core';

describe('Tabs component', () => {
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

  it('should render tabs correctly', () => {
    const wrapper = mount(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: (fields, formOptions) => <span className="content">Here would be form</span>
          }
        }}
      >
        <Tabs {...props}></Tabs>
      </RenderWithProvider>
    );
    expect(wrapper.find(PF4Tabs)).toHaveLength(1);
    expect(wrapper.find('.content')).toHaveLength(2);
  });

  it('should switch tabs correctly', () => {
    const wrapper = mount(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: (fields, formOptions) => <div>{'Here would be form'}</div>
          }
        }}
      >
        <Tabs {...props}></Tabs>
      </RenderWithProvider>
    );

    expect(wrapper.find(PF4Tabs).props().activeKey).toEqual(0);

    const secondTabButton = wrapper.find('.pf-c-tabs__link').last();
    secondTabButton.simulate('click');

    expect(wrapper.find(PF4Tabs).props().activeKey).toEqual(1);
  });
});
