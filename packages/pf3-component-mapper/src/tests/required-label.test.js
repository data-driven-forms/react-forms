import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import RequiredLabel from '../form-fields/required-label';

describe('<RequiredLabel />', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      label: 'Foo',
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<RequiredLabel { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
