import React from 'react';
import { mount } from 'enzyme';

import PlainText from '../plain-text';

describe('PlainText component', () => {
  it('renders correctly with three paragraphs', () => {
    const label = 'One \n Two \n Three';
    const name = 'name';

    const wrapper = mount(<PlainText name={name} label={label} />);

    expect(wrapper.find('p')).toHaveLength(3);
  });

  it('renders correctly with one paragraphs', () => {
    const label = 'One';
    const name = 'name';

    const wrapper = mount(<PlainText name={name} label={label} />);

    expect(wrapper.find('p')).toHaveLength(1);
  });
});