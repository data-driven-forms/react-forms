import React from 'react';
import toJson from 'enzyme-to-json';
import SubForm from '../components/sub-form';
import { shallow } from 'enzyme';
import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('SubForm component', () => {
  const props = {
    title: 'cosiTitle',
    name: 'cosiName',
    fields: []
  };

  const formOptions = {
    renderForm: () => <div>Here would be form</div>
  };

  it('should render SubForm correctly', () => {
    const wrapper = shallow(
      <RenderWithProvider value={{ formOptions }}>
        <SubForm {...props} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render SubForm with description correctly', () => {
    const propsDescription = { ...props, description: 'description here!' };
    const wrapper = shallow(
      <RenderWithProvider value={{ formOptions }}>
        <SubForm {...propsDescription} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render SubForm without title correctly', () => {
    const { name, fields, formOptions } = props;
    const propsWithoutTitle = { name, fields, formOptions };
    const wrapper = shallow(
      <RenderWithProvider value={{ formOptions }}>
        <SubForm {...propsWithoutTitle} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
