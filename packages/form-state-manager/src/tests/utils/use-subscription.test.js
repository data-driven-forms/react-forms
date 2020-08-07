/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import FormManagerContext from '../../files/form-manager-context';
import useSubscription, { initialMeta } from '../../utils/use-subscription';
import createManagerApi from '../../utils/manager-api';

const NonInputSpyComponent = ({ changeValue, onChange }) => <button id="fake-change" type="button" onClick={() => onChange(changeValue)}></button>;

const SpyComponent = ({ initialValue, meta, ...props }) => <input name="spy-input" id="spy-input" {...props} />;

const SubscribedComponent = ({ fakeComponent, ...props }) => {
  const [value, onChange, onFocus, onBlur, meta] = useSubscription(props);
  return (
    <div>
      {fakeComponent ? (
        <NonInputSpyComponent {...props} value={value} onChange={onChange} meta={meta} />
      ) : (
        <SpyComponent {...props} value={value || ''} onFocus={onFocus} onBlur={onBlur} onChange={onChange} meta={meta} />
      )}
    </div>
  );
};

const DummyComponent = ({ subscriberProps, managerApi }) => {
  const api = managerApi();

  return (
    <FormManagerContext.Provider value={{ ...api, formOptions: managerApi }}>
      <SubscribedComponent {...subscriberProps} />
    </FormManagerContext.Provider>
  );
};

describe('useSubscription', () => {
  let managerApi;
  beforeEach(() => {
    managerApi = createManagerApi(jest.fn());
  });
  it('should assing value and onChange handlers to SpyComponent', () => {
    const spy = mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />).find(SpyComponent);
    expect(spy.prop('value')).toEqual('');
    expect(spy.prop('name')).toEqual('spy');
    expect(spy.prop('onChange')).toEqual(expect.any(Function));
  });

  it('should assing meta SpyComponent', () => {
    const spy = mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />).find(SpyComponent);
    expect(spy.prop('meta')).toEqual(initialMeta());
  });

  it('should call register field on mount and unregister on unmount', () => {
    const managerApi = createManagerApi(jest.fn());
    const api = managerApi();
    const registerSpy = jest.spyOn(api, 'registerField');
    const unregisterSpy = jest.spyOn(api, 'unregisterField');
    const registerArguments = {
      name: 'spy',
      value: 'foo',
      getFieldState: expect.any(Function)
    };
    const unregisterArguments = {
      name: 'spy'
    };
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'foo' }} managerApi={managerApi} />);
    expect(registerSpy).toHaveBeenCalledWith(registerArguments);
    wrapper.unmount();
    expect(unregisterSpy).toHaveBeenCalledWith(unregisterArguments);
  });

  it('should set correct value on input type text', () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'foo' } });
    wrapper.update();
    expect(wrapper.find(SpyComponent).prop('value')).toEqual('foo');
  });

  it('should set correct value on input type checkbox', () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy', type: 'checkbox' }} managerApi={managerApi} />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { checked: true, type: 'checkbox' } });
    wrapper.update();
    expect(wrapper.find(SpyComponent).prop('value')).toEqual(true);
  });

  it('should set correct array value', () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: [] }} managerApi={managerApi} />);
    const input = wrapper.find('button#fake-change');
    input.simulate('click');
    wrapper.update();
    expect(wrapper.find(NonInputSpyComponent).prop('value')).toEqual([]);
  });

  it('should set correct on non event object value', () => {
    const nonEventObject = { value: 1, label: 'bar' };
    const wrapper = mount(
      <DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: nonEventObject }} managerApi={managerApi} />
    );
    const input = wrapper.find('button#fake-change');
    input.simulate('click');
    wrapper.update();
    expect(wrapper.find(NonInputSpyComponent).prop('value')).toEqual(nonEventObject);
  });

  it('should call focus callback on focus event', () => {
    const managerApi = createManagerApi(jest.fn());
    const api = managerApi();
    const focusSpy = jest.spyOn(api, 'focus');
    const blurSpy = jest.spyOn(api, 'blur');
    const spy = mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />).find('input');

    spy.prop('onFocus')();
    expect(focusSpy).toHaveBeenCalledWith('spy');
    spy.prop('onBlur')();
    expect(blurSpy).toHaveBeenCalledWith('spy');
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });
});
