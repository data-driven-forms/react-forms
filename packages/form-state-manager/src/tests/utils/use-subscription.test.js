/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import FormManagerContext from '../../files/form-manager-context';
import useSubscription, { initialMeta, checkEmpty } from '../../utils/use-subscription';
import createManagerApi from '../../utils/manager-api';

const NonInputSpyComponent = ({ changeValue, onChange }) => <button id="fake-change" type="button" onClick={() => onChange(changeValue)}></button>;

const SpyComponent = ({ initialValue, meta, validate, initializeOnMount, ...props }) => <input name="spy-input" id="spy-input" {...props} />;

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

const DummyComponent = ({ subscriberProps, managerApi }) => (
  <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
    <SubscribedComponent {...subscriberProps} />
  </FormManagerContext.Provider>
);

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
      getFieldState: expect.any(Function),
      render: expect.any(Function),
      internalId: expect.any(Number)
    };
    const unregisterArguments = {
      name: 'spy',
      internalId: expect.any(Number)
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

  describe('initialValues', () => {
    it('should set value from initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: 'value1' } });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy',
        value: 'value1'
      });

      mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

      expect(registerSpy).toHaveBeenCalledWith(registerArguments);
    });

    it('should set value from initialValue over initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: 'value1' } });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy',
        value: 'value2'
      });

      mount(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'value2' }} managerApi={managerApi} />);

      expect(registerSpy).toHaveBeenCalledWith(registerArguments);
    });

    it('should set nested value from initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } } });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy.nested',
        value: 'value123'
      });

      mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(registerSpy).toHaveBeenCalledWith(registerArguments);
    });

    it('should set value from initialValues only on first registration', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } } });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy.nested',
        value: 'value123'
      });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(registerSpy).toHaveBeenCalledWith(registerArguments);

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values).toEqual({ 'spy.nested': 'different value' });
    });

    it('should set value from initialValues when form.initializeOnTrue = true', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy.nested',
        value: 'value123'
      });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(registerSpy).toHaveBeenCalledWith(registerArguments);

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values).toEqual({ 'spy.nested': 'value123' });
    });

    it('should set value from initialValues when field.initializeOnTrue = true', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy.nested',
        value: 'value123'
      });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested', initializeOnMount: true }} managerApi={managerApi} />);
      expect(registerSpy).toHaveBeenCalledWith(registerArguments);

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values).toEqual({ 'spy.nested': 'value123' });
    });

    it('field.initializeOnMount has higher priority than form.initializeOnMount', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });
      const api = managerApi();
      const registerSpy = jest.spyOn(api, 'registerField');
      const registerArguments = expect.objectContaining({
        name: 'spy.nested',
        value: 'value123'
      });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(registerSpy).toHaveBeenCalledWith(registerArguments);

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested', initializeOnMount: false }} managerApi={managerApi} />);

      expect(managerApi().values).toEqual({ 'spy.nested': 'different value' });
    });
  });

  describe('subcription', () => {
    let renderCount;
    let RenderWatch;

    beforeEach(() => {
      renderCount = 0;

      RenderWatch = (props) => {
        useSubscription(props);

        useEffect(() => {
          renderCount++;
        });

        return null;
      };
    });

    it('should rerender from the manager api', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <RenderWatch name="field" />
        </FormManagerContext.Provider>
      );

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['valid']);
      });
      wrapper.update();

      expect(renderCount).toEqual(2);
    });

    it('should rerender only on subscription', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <RenderWatch name="field" subscription={{ valid: true }} />
        </FormManagerContext.Provider>
      );

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['values']);
      });
      wrapper.update();

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['valid']);
      });
      wrapper.update();

      expect(renderCount).toEqual(2);
    });

    it('should rerender only on global subscription', async () => {
      const managerApi = createManagerApi({ subscription: { valid: true } });

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <RenderWatch name="field" subscription={{ valid: true }} />
        </FormManagerContext.Provider>
      );

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['values']);
      });
      wrapper.update();

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['valid']);
      });
      wrapper.update();

      expect(renderCount).toEqual(2);
    });
  });

  describe('validation', () => {
    const fooValidator = (value) => (value === 'foo' ? 'error' : undefined);
    const asyncValidator = (value) => new Promise((res, rej) => setTimeout(() => (fooValidator(value) ? rej('error') : res()), 100));

    it('should correct set meta data on sync validation', async () => {
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'sync-validate',
        validate: fooValidator
      };
      const wrapper = mount(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      const spy = wrapper.find(SpyComponent);
      const input = wrapper.find('input');
      expect(spy.prop('meta')).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));
      await act(async () => {
        input.simulate('change', { target: { value: 'foo' } });
      });

      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ error: 'error', valid: false, invalid: true }));

      await act(async () => {
        input.simulate('change', { target: { value: 'bar' } });
      });

      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));
    });

    it('should correct set meta data on assync validation', async () => {
      expect.assertions(4);
      jest.useFakeTimers();
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'sync-validate',
        validate: asyncValidator
      };
      const wrapper = mount(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      const spy = wrapper.find(SpyComponent);
      const input = wrapper.find('input');
      expect(spy.prop('meta')).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));

      input.simulate('change', { target: { value: 'foo' } });
      jest.advanceTimersByTime(10);

      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(
        expect.objectContaining({ error: undefined, validating: true, valid: true, invalid: false })
      );

      await act(async () => {
        jest.advanceTimersByTime(91);
      });

      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(
        expect.objectContaining({ error: 'error', validating: false, valid: false, invalid: true })
      );

      input.simulate('change', { target: { value: 'bar' } });

      await act(async () => {
        jest.advanceTimersByTime(101);
      });

      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));
    });
  });

  describe('clearedValue', () => {
    let CleanButton;

    beforeEach(() => {
      CleanButton = (props) => {
        const [, onChange] = useSubscription(props);

        return <button onClick={() => onChange(undefined)}>clear</button>;
      };
    });

    it('should clearValue on field level', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <CleanButton name="field" value="some value" clearedValue={null} />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('button').simulate('click');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual(null);
    });

    it('should clearValue on form level', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi, clearedValue: null }}>
          <CleanButton name="field" value="some value" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('button').simulate('click');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual(null);
    });

    it('field cleared value has higher priority', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi, clearedValue: null }}>
          <CleanButton name="field" value="some value" clearedValue="cleared" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('button').simulate('click');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual('cleared');
    });
  });

  it('#checkEmpty - edge cases', () => {
    expect(checkEmpty(false)).toEqual(false);
    expect(checkEmpty('A')).toEqual(false);
    expect(checkEmpty(0)).toEqual(false);

    expect(checkEmpty([])).toEqual(true);
    expect(checkEmpty('')).toEqual(true);
    expect(checkEmpty(undefined)).toEqual(true);
  });

  describe('dataType', () => {
    let Setter;
    let managerApi;
    let wrapper;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Setter = (props) => {
        const [, onChange] = useSubscription(props);

        return <input onChange={(e) => onChange(props.value || e)} />;
      };
    });

    it('should parse string', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <Setter name="field" dataType="string" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        const input = wrapper.find('input');
        input.instance().value = 123;
        input.simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual('123');
    });

    it('should parse float', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <Setter name="field" dataType="float" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        const input = wrapper.find('input');
        input.instance().value = '12.34';
        input.simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual(12.34);
    });

    it('should parse number', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <Setter name="field" dataType="number" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        const input = wrapper.find('input');
        input.instance().value = '243242.809';
        input.simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual(243242.809);
    });

    it('should parse boolean', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <Setter name="field" dataType="boolean" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        const input = wrapper.find('input');
        input.instance().value = 'true';
        input.simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual(true);
    });

    it('should parse integer', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <Setter name="field" dataType="integer" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        const input = wrapper.find('input');
        input.instance().value = '12.34';
        input.simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual(12);
    });

    it('should parse array of numbers', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
          <Setter name="field" dataType="number" value={['1', '2', '45']} />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual([1, 2, 45]);
    });
  });
});
