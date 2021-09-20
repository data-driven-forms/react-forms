import React from 'react';
import { mount } from 'enzyme';
import SchemaErrorComponent from '../../form-renderer/schema-error-component';

describe('schemaErrorComponent', () => {
  it('renders correctly', () => {
    const message = 'Error message';
    const name = 'Invalid schema :(';

    const wrapper = mount(<SchemaErrorComponent message={message} name={name} />);

    expect(wrapper.find('h1')).toHaveLength(1);

    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('h2').text().includes(name)).toEqual(true);

    expect(wrapper.find('p')).toHaveLength(2);
    expect(wrapper.find('p').first().text().includes(message)).toEqual(true);
  });
});
