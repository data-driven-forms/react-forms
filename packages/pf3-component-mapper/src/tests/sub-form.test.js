import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SubForm from '../form-fields/sub-form';

describe('<SubForm />', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      formOptions: {
        renderForm: ({ name }) => <div key={ name }>Form item</div>,
      },
      fields: [],
    };
  });

  it('should render sub form with title and description', () => {
    const wrapper = shallow(<SubForm title="Foo" description="Bar" { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render sub form with title', () => {
    const wrapper = shallow(<SubForm title="Foo" { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render sub form with description', () => {
    const wrapper = shallow(<SubForm description="Bar" { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
