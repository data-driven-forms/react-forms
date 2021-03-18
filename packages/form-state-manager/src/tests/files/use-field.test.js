/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import FormManagerContext from '../../files/form-manager-context';
import useField, { checkEmpty } from '../../files/use-field';
import createManagerApi, { initialMeta } from '../../utils/manager-api';

const NonInputSpyComponent = ({ changeValue, onChange }) => <button id="fake-change" type="button" onClick={() => onChange(changeValue)}></button>;

const SpyComponent = ({ initialValue, meta, validate, initializeOnMount, ...props }) => <input name="spy-input" id="spy-input" {...props} />;

const SubscribedComponent = ({ fakeComponent, ...props }) => {
  const {
    input: { value, onChange, onFocus, onBlur, checked },
    meta
  } = useField(props);
  return (
    <div>
      {fakeComponent ? (
        <NonInputSpyComponent {...props} value={value} onChange={onChange} meta={meta} />
      ) : (
        <SpyComponent {...props} checked={checked} value={value || ''} onFocus={onFocus} onBlur={onBlur} onChange={onChange} meta={meta} />
      )}
    </div>
  );
};

const DummyComponent = ({ subscriberProps, managerApi }) => (
  <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
    <SubscribedComponent {...subscriberProps} />
  </FormManagerContext.Provider>
);

describe('useField', () => {
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
      initialValue: 'foo',
      render: expect.any(Function),
      internalId: expect.any(Number),
      silent: true
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

  it('should set correct value on input type text', async () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);
    const input = wrapper.find('input');
    await act(async () => {
      input.simulate('change', { target: { value: 'foo' } });
    });
    wrapper.update();
    expect(wrapper.find(SpyComponent).prop('value')).toEqual('foo');
  });

  it('should set correct value on input type checkbox', async () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy', type: 'checkbox' }} managerApi={managerApi} />);
    const input = wrapper.find('input');
    await act(async () => {
      input.simulate('change', { target: { checked: true, type: 'checkbox' } });
    });
    wrapper.update();
    expect(wrapper.find(SpyComponent).prop('checked')).toEqual(true);
  });

  it('should set correct array value', async () => {
    const wrapper = mount(<DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: [] }} managerApi={managerApi} />);
    const input = wrapper.find('button#fake-change');
    await act(async () => {
      input.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(NonInputSpyComponent).prop('value')).toEqual([]);
  });

  it('should set correct on non event object value', async () => {
    const nonEventObject = { value: 1, label: 'bar' };
    const wrapper = mount(
      <DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: nonEventObject }} managerApi={managerApi} />
    );
    const input = wrapper.find('button#fake-change');
    await act(async () => {
      input.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(NonInputSpyComponent).prop('value')).toEqual(nonEventObject);
  });

  it('should call focus callback on focus event', async () => {
    const managerApi = createManagerApi(jest.fn());
    const api = managerApi();
    const focusSpy = jest.spyOn(api, 'focus');
    const blurSpy = jest.spyOn(api, 'blur');
    const spy = mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />).find('input');

    await act(async () => {
      spy.prop('onFocus')();
    });
    spy.update();
    expect(focusSpy).toHaveBeenCalledWith('spy');
    await act(async () => {
      spy.prop('onBlur')();
    });
    spy.update();
    expect(blurSpy).toHaveBeenCalledWith('spy');
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it('should get nested value from', () => {
    const managerApi = createManagerApi({});
    managerApi().change('foo[0]', 'bar');

    const wrapper = mount(<DummyComponent subscriberProps={{ name: 'foo[0]' }} managerApi={managerApi} />);

    expect(wrapper.find('input[name="foo[0]"]').prop('value')).toEqual('bar');
  });

  describe('initialValues', () => {
    it('should set value from initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: 'value1' } });

      mount(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

      expect(managerApi().values.spy).toEqual('value1');
    });

    it('should set value from initialValue over initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: 'value1' } });

      mount(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'value2' }} managerApi={managerApi} />);

      expect(managerApi().values.spy).toEqual('value2');
    });

    it('should set nested value from initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } } });

      mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');
    });

    it('should set value from initialValues only on first registration', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } } });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('different value');
    });

    it('should set value from initialValues when form.initializeOnTrue = true', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');
    });

    it('should set value from initialValues when field.initializeOnTrue = true', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested', initializeOnMount: true }} managerApi={managerApi} />);
      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');
    });

    it('field.initializeOnMount has higher priority than form.initializeOnMount', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });

      let wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });
      wrapper.update();

      wrapper.unmount();

      wrapper = mount(<DummyComponent subscriberProps={{ name: 'spy.nested', initializeOnMount: false }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('different value');
    });
  });

  describe('subcription', () => {
    let renderCount;
    let RenderWatch;

    beforeEach(() => {
      renderCount = 0;

      RenderWatch = (props) => {
        useField(props);

        useEffect(() => {
          renderCount++;
        });

        return null;
      };
    });

    it('should rerender from the manager api', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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

    it('should set form level error key on sync validation', async () => {
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'sync-validate',
        validate: fooValidator
      };
      const wrapper = mount(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      const input = wrapper.find('input');
      expect(managerApi().errors).toEqual({});

      await act(async () => {
        input.simulate('change', { target: { value: 'foo' } });
      });
      expect(managerApi().errors).toEqual({
        'sync-validate': 'error'
      });

      await act(async () => {
        input.simulate('change', { target: { value: 'bar' } });
      });
      expect(managerApi().errors).toEqual({
        'sync-validate': undefined
      });
    });

    it('should correctly set validaintg flag on multiple validate calls', async () => {
      expect.assertions(5);
      jest.useFakeTimers();
      const asyncValidator = jest
        .fn()
        .mockImplementationOnce(() => new Promise((res) => setTimeout(() => res('slow'), 500)))
        .mockImplementationOnce(() => new Promise((res) => setTimeout(() => res('slow'), 500)))
        .mockImplementationOnce(() => new Promise((res) => setTimeout(() => res('fast'), 250)));
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'async-validate',
        validate: asyncValidator
      };

      const wrapper = mount(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      const input = wrapper.find('input');
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ validating: true, valid: true }));

      await act(async () => {
        jest.runAllTimers(); // skip initial validation
      });
      wrapper.update();

      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ validating: false, valid: true }));

      await act(async () => {
        input.simulate('change', { target: { value: 'foo' } });
      });
      /**
       * All validations are pending
       */
      await act(async () => {
        jest.advanceTimersByTime(10);
      });
      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ validating: true, valid: true }));
      /**
       * Second faster async validation has finished
       */
      await act(async () => {
        jest.advanceTimersByTime(290);
      });
      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ validating: true, valid: true }));
      /**
       * First slow async validation has finished
       */
      await act(async () => {
        jest.advanceTimersByTime(200);
      });
      wrapper.update();
      expect(wrapper.find(SpyComponent).prop('meta')).toEqual(expect.objectContaining({ validating: false, valid: true }));
    });
  });

  describe('clearedValue', () => {
    let CleanButton;

    beforeEach(() => {
      CleanButton = (props) => {
        const {
          input: { onChange }
        } = useField(props);

        return <button onClick={() => onChange(undefined)}>clear</button>;
      };
    });

    it('should clearValue on field level', async () => {
      const managerApi = createManagerApi({});

      const wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi(), clearedValue: null }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi(), clearedValue: null }}>
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
    expect(checkEmpty(new Date())).toEqual(false);

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
        const {
          input: { onChange }
        } = useField(props);

        return <input onChange={(e) => onChange(props.value || e)} />;
      };
    });

    it('should parse string', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
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
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="number" value={['1', '2', '45']} />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('change');
      });
      wrapper.update();

      expect(managerApi().values.field).toEqual([1, 2, 45]);
    });

    it('should parse initialValue - float', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" initialValue="12.34" />
        </FormManagerContext.Provider>
      );

      expect(managerApi().values.field).toEqual(12.34);
    });

    it('should parse defaultValue - float', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" defaultValue="12.34" />
        </FormManagerContext.Provider>
      );

      expect(managerApi().values.field).toEqual(12.34);
    });

    it('should parse defaultValue - objects', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" defaultValue={[{ value: '23.67' }, { value: '123.34' }]} />
        </FormManagerContext.Provider>
      );

      expect(managerApi().values.field).toEqual([{ value: 23.67 }, { value: 123.34 }]);
    });
  });

  describe('type', () => {
    let Typper;
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = jest.fn();
      managerApi = createManagerApi({});

      Typper = ({ spy, ...props }) => {
        const { input } = useField(props);

        spy(input);

        return <input {...input} />;
      };
    });

    it('checkbox with no value', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Typper name="field" type="checkbox" spy={spy} />
        </FormManagerContext.Provider>
      );

      expect(spy).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: ''
      });
      spy.mockReset();

      // >>>>>>>>>>>>>>>> SELECT
      await act(async () => {
        wrapper.find('input').simulate('change', { target: { checked: true, type: 'checkbox' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: true });

      expect(spy).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: ''
      });

      // >>>>>>>>>>>>>>>> DESELECT
      await act(async () => {
        wrapper.find('input').simulate('change', { target: { checked: false, type: 'checkbox' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: false });

      expect(spy).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: ''
      });
    });

    it('checkbox with values', async () => {
      const spyDog = jest.fn();
      const spyCat = jest.fn();
      const spyHamster = jest.fn();

      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Typper name="field" value="dog" type="checkbox" spy={spyDog} />
          <Typper name="field" value="cat" type="checkbox" spy={spyCat} />
          <Typper name="field" value="hamster" type="checkbox" spy={spyHamster} />
        </FormManagerContext.Provider>
      );

      // >>>>>>>>>>>>>>>> INITIAL RENDER
      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster'
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      // >>>>>>>>>>>>>>>> SELECT CATS
      await act(async () => {
        wrapper
          .find('input')
          .at(1)
          .simulate('change', { target: { checked: true, type: 'checkbox' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: ['cat'] });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster'
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      // >>>>>>>>>>>>>>>> SELECT HAMSTERS
      await act(async () => {
        wrapper
          .find('input')
          .at(2)
          .simulate('change', { target: { checked: true, type: 'checkbox' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: ['cat', 'hamster'] });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster'
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      // >>>>>>>>>>>>>>>> DESELECT HAMSTERS
      await act(async () => {
        wrapper
          .find('input')
          .at(2)
          .simulate('change', { target: { checked: false, type: 'checkbox' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: ['cat'] });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster'
      });
    });

    it('radio', async () => {
      const spyDog = jest.fn();
      const spyCat = jest.fn();
      const spyHamster = jest.fn();

      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Typper name="field" value="dog" type="radio" spy={spyDog} />
          <Typper name="field" value="cat" type="radio" spy={spyCat} />
          <Typper name="field" value="hamster" type="radio" spy={spyHamster} />
        </FormManagerContext.Provider>
      );

      // >>>>>>>>>>>>>>>> INITIAL RENDER
      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster'
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      // >>>>>>>>>>>>>>>> SELECT CATS
      await act(async () => {
        wrapper
          .find('input')
          .at(1)
          .simulate('change', { target: { value: 'cat' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: 'cat' });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster'
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      // >>>>>>>>>>>>>>>> SELECT HAMSTER
      await act(async () => {
        wrapper
          .find('input')
          .at(2)
          .simulate('change', { target: { value: 'hamster' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: 'hamster' });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster'
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      // >>>>>>>>>>>>>>>> SELECT HAMSTER - AGAIN
      await act(async () => {
        wrapper
          .find('input')
          .at(2)
          .simulate('change', { target: { value: 'hamster' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: 'hamster' });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'dog'
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat'
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster'
      });
    });
  });

  describe('format & parse', () => {
    let Dummy;
    let wrapper;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Dummy = (props) => {
        const { input } = useField(props);
        return <input {...input} />;
      };
    });

    it('parse value on change', async () => {
      const parse = jest.fn().mockImplementation((value, name) => value * 2);
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" parse={parse} />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: '2' } });
      });
      wrapper.update();

      expect(parse).toHaveBeenCalledWith('2', 'field');
      expect(managerApi().values).toEqual({ field: 4 });
    });

    it('format value', async () => {
      const format = jest.fn().mockImplementation((value, name) => value * 2);
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" format={format} />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: '2' } });
      });
      wrapper.update();

      expect(format).toHaveBeenCalledWith('2', 'field');
      expect(managerApi().values).toEqual({ field: '2' });
      expect(wrapper.find('input').props().value).toEqual(4);
    });

    it('format value on blur', async () => {
      const format = jest.fn().mockImplementation((value, name) => value * 2);
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" format={format} formatOnBlur />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('focus');
      });
      wrapper.update();

      format.mockClear(); // initialFormat

      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: '2' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: '2' });
      expect(format).not.toHaveBeenCalled();
      expect(wrapper.find('input').props().value).toEqual('2');

      await act(async () => {
        wrapper.find('input').simulate('blur');
      });
      wrapper.update();

      expect(format).toHaveBeenCalledWith('2', 'field');
      expect(wrapper.find('input').props().value).toEqual(4);
    });

    it('default parse and format handles undefined/empty string', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" />
        </FormManagerContext.Provider>
      );

      // set undefined
      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: undefined } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: undefined });
      expect(wrapper.find('input').props().value).toEqual(''); // it's controlled

      // set '' empty string
      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: '' } });
      });
      wrapper.update();

      expect(managerApi().values).toEqual({ field: undefined });
      expect(wrapper.find('input').props().value).toEqual(''); // it's controlled
    });
  });

  describe('allowNull', () => {
    let Dummy;
    let wrapper;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Dummy = (props) => {
        const { input } = useField(props);
        return <input {...input} />;
      };
    });

    it('by default converts null to empty string', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: null } });
      });
      wrapper.update();

      expect(wrapper.find('input').props().value).toEqual('');
    });

    it('allows null', async () => {
      // disable console errors:
      // expected:
      //      1. input cannot be null
      //      2. controlled to uncontrolled

      // eslint-disable-next-line no-console
      const _consoleError = console.error;
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" allowNull />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper.find('input').simulate('change', { target: { value: null } });
      });
      wrapper.update();

      expect(wrapper.find('input').props().value).toEqual(null);

      // eslint-disable-next-line no-console
      console.error = _consoleError;
    });
  });

  describe('multiple', () => {
    let Select;
    let wrapper;

    beforeEach(() => {
      Select = (props) => {
        const { input } = useField(props);
        return (
          <select {...input}>
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
            <option value="hamsters">Hamsters</option>
          </select>
        );
      };
    });

    it('select and deselect multiple', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Select name="field" multiple />
        </FormManagerContext.Provider>
      );

      expect(wrapper.find('select').props().value).toEqual([]);

      await act(async () => {
        wrapper
          .find('option')
          .first()
          .simulate('change');
      });
      wrapper.update();

      expect(wrapper.find('select').props().value).toEqual(['dogs']);

      await act(async () => {
        wrapper
          .find('option')
          .last()
          .simulate('change');
      });
      wrapper.update();

      expect(wrapper.find('select').props().value).toEqual(['dogs', 'hamsters']);

      await act(async () => {
        wrapper
          .find('option')
          .first()
          .simulate('change');
      });
      wrapper.update();

      expect(wrapper.find('select').props().value).toEqual(['hamsters']);
    });
  });

  describe('fileInput', () => {
    let Dummy;
    let wrapper;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Dummy = (props) => {
        const {
          input: { value, ...rest }
        } = useField(props);
        return (
          <React.Fragment>
            <input {...rest} />
            <span>{value}</span>
          </React.Fragment>
        );
      };
    });

    it('register inputFile name and uregister', async () => {
      expect(managerApi().fileInputs).toEqual([]);
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" type="file" />
        </FormManagerContext.Provider>
      );
      expect(managerApi().fileInputs).toEqual(['field']);

      await act(async () => {
        wrapper.unmount();
      });
      wrapper.update();

      expect(managerApi().fileInputs).toEqual([]);
    });

    it('sanitize value', async () => {
      wrapper = mount(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" type="file" />
        </FormManagerContext.Provider>
      );

      await act(async () => {
        wrapper
          .find('input')
          .first()
          .simulate('change', {
            target: {
              value: '/path/',
              files: ['blabla'],
              type: 'file'
            }
          });
      });
      wrapper.update();

      expect(managerApi().getState().values).toEqual({
        field: {
          inputFiles: ['blabla'],
          inputValue: '/path/'
        }
      });
      expect(wrapper.find('span').text()).toEqual('/path/');
    });
  });
});
