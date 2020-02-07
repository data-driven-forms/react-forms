import React from 'react';
import toJson from 'enzyme-to-json';
import SubForm from '../form-fields/sub-form';
import { shallow } from 'enzyme';

describe('SubForm component', () => {
  const props = {
    title: 'cosiTitle',
    name: 'cosiName',
    fields: [],
    formOptions: {
      renderForm: (fields, formOptions) => <div>{ 'Here would be form' }</div>,
    },
  };

  it('should render SubForm correctly', () => {
    const wrapper = shallow(
      <SubForm { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render SubForm with description correctly', () => {
    const propsDescription = { ...props, description: 'description here!' };
    const wrapper = shallow(
      <SubForm { ...propsDescription } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render SubForm without title correctly', () => {
    const { key, name, fields, formOptions } = props;
    const propsWithoutTitle = { key, name, fields, formOptions };
    const wrapper = shallow(
      <SubForm { ...propsWithoutTitle } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
