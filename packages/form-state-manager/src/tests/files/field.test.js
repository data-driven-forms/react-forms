import React from 'react';
import { mount } from 'enzyme';

import FormStateManager from '../../files/form-state-manager';
import Field from '../../files/field';

describe('<Field />', () => {
  let wrapper;

  const initialProps = { name: 'some-field', initialValue: 'some-value' };

  it('renders with children', () => {
    wrapper = mount(<FormStateManager>{() => <Field {...initialProps}>{(props) => <input {...props.input} />}</Field>}</FormStateManager>);

    expect(wrapper.find('input').props()).toEqual({
      name: initialProps.name,
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      onFocus: expect.any(Function),
      value: initialProps.initialValue
    });
  });

  it('renders with string component', () => {
    const ref = React.createRef();

    wrapper = mount(<FormStateManager>{() => <Field {...initialProps} component="input" ref={ref} />}</FormStateManager>);

    expect(wrapper.find('input').props()).toEqual({
      name: initialProps.name,
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      onFocus: expect.any(Function),
      value: initialProps.initialValue
    });
  });

  it('renders with component as ComponentType', () => {
    const ref = React.createRef();
    const Component = ({ input }) => <input {...input} />;

    wrapper = mount(<FormStateManager>{() => <Field {...initialProps} component={Component} />}</FormStateManager>);

    expect(wrapper.find('input').props()).toEqual({
      name: initialProps.name,
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      onFocus: expect.any(Function),
      value: initialProps.initialValue
    });
  });

  it('renders with render function', () => {
    wrapper = mount(<FormStateManager>{() => <Field {...initialProps} render={(props) => <input {...props.input} />} />}</FormStateManager>);

    expect(wrapper.find('input').props()).toEqual({
      name: initialProps.name,
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      onFocus: expect.any(Function),
      value: initialProps.initialValue
    });
  });
});
