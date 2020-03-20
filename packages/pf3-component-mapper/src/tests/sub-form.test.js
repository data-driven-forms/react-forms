import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SubForm from '../files/sub-form';
import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('<SubForm />', () => {
  let initialProps;
  let formOptions;

  beforeEach(() => {
    formOptions = {
      renderForm: ({ name }) => <div key={name}>Form item</div>
    };
    initialProps = {
      fields: []
    };
  });

  it('should render sub form with title and description', () => {
    const wrapper = shallow(
      <RenderWithProvider value={{ formOptions }}>
        <SubForm title="Foo" description="Bar" {...initialProps} />
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render sub form with title', () => {
    const wrapper = shallow(
      <RenderWithProvider value={{ formOptions }}>
        <SubForm title="Foo" {...initialProps} />{' '}
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render sub form with description', () => {
    const wrapper = shallow(
      <RenderWithProvider value={{ formOptions }}>
        <SubForm description="Bar" {...initialProps} />{' '}
      </RenderWithProvider>
    ).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
