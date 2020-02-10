import React from 'react';
import SelectField from '../form-fields/select-field';
import { mount } from 'enzyme';
import Select from 'react-select';

describe('SelectField component', () => {
  it('renders correctly', () => {
    const wrapper = mount(<SelectField />);

    expect(wrapper.find(Select)).toHaveLength(1);
  });
});
