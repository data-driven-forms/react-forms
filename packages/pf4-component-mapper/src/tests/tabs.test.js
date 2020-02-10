import React from 'react';
import toJson from 'enzyme-to-json';
import Tabs from '../form-fields/tabs';
import { mount, shallow } from 'enzyme';

describe('Tabs component', () => {
  const props = {
    fields: [
      {
        title: 'cosiTitle',
        name: 'cosiName',
        fields: [],
      },
      {
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: [],
      },
    ],
    formOptions: {
      renderForm: (fields, formOptions) => <div>{ 'Here would be form' }</div>,
    },
  };

  it('should render tabs correctly', () => {
    const wrapper = shallow(
      <Tabs { ...props }>
      </Tabs>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should switch tabs correctly', () => {
    const wrapper = mount(<Tabs { ...props } />);
    expect(wrapper.instance().state.activeTabKey).toEqual(0);

    const secondTabButton = wrapper.find('.pf-c-tabs__button').at(6);
    secondTabButton.simulate('click');

    expect(wrapper.instance().state.activeTabKey).toEqual(1);
  });
});
