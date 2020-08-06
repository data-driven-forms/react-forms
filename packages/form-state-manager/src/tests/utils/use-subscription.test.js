/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import FormManagerContext from '../../files/form-manager-context';
import useSubscription from '../../utils/use-subscription';

const NonInputSpyComponent = ({ changeValue, onChange }) => <button id="fake-change" type="button" onClick={() => onChange(changeValue)}></button>;

const SpyComponent = ({ initialValue, ...props }) => <input name="spy-input" id="spy-input" {...props} />;

const SubscribedComponent = ({ fakeComponent, ...props }) => {
  const [value, onChange] = useSubscription(props);
  return (
    <div>
      {fakeComponent ? (
        <NonInputSpyComponent {...props} value={value} onChange={onChange} />
      ) : (
        <SpyComponent {...props} value={value || ''} onChange={onChange} />
      )}
    </div>
  );
};

const DummyComponent = ({ subscriberProps, contextValue, fakeComponent }) => (
  <FormManagerContext.Provider value={{ registerField: jest.fn(), unRegisterField: jest.fn(), dispatch: jest.fn(), ...contextValue }}>
    <SubscribedComponent {...subscriberProps} />
  </FormManagerContext.Provider>
);

describe('useSubscription', () => {
  it('should assing value and onChange handlers to SpyComponent', () => {
    const spy = mount(<DummyComponent subscriberProps={{ name: 'spy' }} />).find(SpyComponent);
    expect(spy.prop('value')).toEqual('');
    expect(spy.prop('name')).toEqual('spy');
    expect(spy.prop('onChange')).toEqual(expect.any(Function));
  });

  it('should call register field on mount and unregister on unmount', () => {
    const contextValue = {
      registerField: jest.fn(),
      unRegisterField: jest.fn()
    };
    const registerArguments = {
      fieldState: {
        getFieldState: expect.any(Function),
        setValue: expect.any(Function),
        value: 'foo'
      },
      getFieldState: expect.any(Function),
      name: 'spy',
      value: 'foo'
    };
    const unregisterArguments = {
      fieldState: {
        getFieldState: expect.any(Function),
        setValue: expect.any(Function),
        value: 'foo'
      },
      name: 'spy',
      value: 'foo'
    };
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'foo' }} contextValue={contextValue} />);
    expect(contextValue.registerField).toHaveBeenCalledWith(expect.any(Function), registerArguments);
    wrapper.unmount();
    expect(contextValue.unRegisterField).toHaveBeenCalledWith(expect.any(Function), unregisterArguments);
  });

  it('should set correct value on input type text', () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy' }} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'foo' } });
    wrapper.update();
    expect(wrapper.find(SpyComponent).prop('value')).toEqual('foo');
  });

  it('should set correct value on input type checkbox', () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy', type: 'checkbox' }} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { checked: true, type: 'checkbox' } });
    wrapper.update();
    expect(wrapper.find(SpyComponent).prop('value')).toEqual(true);
  });

  it('should set correct array value', () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: [] }} />);
    const input = wrapper.find('button#fake-change');
    input.simulate('click');
    wrapper.update();
    expect(wrapper.find(NonInputSpyComponent).prop('value')).toEqual([]);
  });

  it('should set correct on non event object value', () => {
    const nonEventObject = { value: 1, label: 'bar' };
    const wrapper = mount(<DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: nonEventObject }} />);
    const input = wrapper.find('button#fake-change');
    input.simulate('click');
    wrapper.update();
    expect(wrapper.find(NonInputSpyComponent).prop('value')).toEqual(nonEventObject);
  });

  it('getFieldState should return subscriber value', () => {
    let fieldRegistry;
    const contextValue = {
      registerField: (_dispatch, state) => {
        fieldRegistry = state;
      }
    };
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'foo' }} contextValue={contextValue} />);
    expect(fieldRegistry.fieldState.getFieldState()).toEqual({ value: 'foo' });
    wrapper.find('input').simulate('change', { target: { value: 'bar' } });
    expect(fieldRegistry.fieldState.getFieldState()).toEqual({ value: 'bar' });
  });
});
