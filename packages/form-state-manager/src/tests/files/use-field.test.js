/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { cleanup, render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormManagerContext from '../../form-manager-context';
import useField, { checkEmpty } from '../../use-field';
import createManagerApi, { initialMeta } from '../../manager-api';

let NonInputSpyComponentValue;

const NonInputSpyComponent = ({ changeValue, onChange, value }) => {
  NonInputSpyComponentValue = value;

  return <button id="fake-change" type="button" onClick={() => onChange(changeValue)}></button>;
};

let spyProps;

const SpyComponent = ({ initialValue, meta, validate, initializeOnMount, ...props }) => {
  spyProps = { meta, ...props };

  return <input name="spy-input" id="spy-input" {...props} />;
};

const SubscribedComponent = ({ fakeComponent, ...props }) => {
  const {
    input: { value, onChange, onFocus, onBlur, checked },
    meta,
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
  it('should assing value and onChange handlers to SpyComponent', async () => {
    render(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'spy');
  });

  it('should assing meta SpyComponent', () => {
    render(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

    expect(spyProps.meta).toEqual(initialMeta());
  });

  it('should call register field on render and unregister on unrender', async () => {
    const managerApi = createManagerApi(jest.fn());
    const api = managerApi();
    const registerSpy = jest.spyOn(api, 'registerField');
    const unregisterSpy = jest.spyOn(api, 'unregisterField');
    const registerArguments = {
      name: 'spy',
      initialValue: 'foo',
      render: expect.any(Function),
      internalId: expect.any(Number),
      silent: true,
    };
    const unregisterArguments = {
      name: 'spy',
      internalId: expect.any(Number),
    };
    render(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'foo' }} managerApi={managerApi} />);

    expect(registerSpy).toHaveBeenCalledWith(registerArguments);

    await cleanup();

    expect(unregisterSpy).toHaveBeenCalledWith(unregisterArguments);
  });

  it('should set correct value on input type text', async () => {
    render(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

    await userEvent.type(screen.getByRole('textbox'), 'foo');

    expect(screen.getByRole('textbox')).toHaveValue('foo');
  });

  it('should set correct value on input type checkbox', async () => {
    render(<DummyComponent subscriberProps={{ name: 'spy', type: 'checkbox' }} managerApi={managerApi} />);

    await userEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should set correct array value', async () => {
    render(<DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: [] }} managerApi={managerApi} />);

    await userEvent.click(screen.getByRole('button'));

    expect(NonInputSpyComponentValue).toEqual([]);
  });

  it('should set correct on non event object value', async () => {
    const nonEventObject = { value: 1, label: 'bar' };
    render(<DummyComponent subscriberProps={{ fakeComponent: true, name: 'spy', changeValue: nonEventObject }} managerApi={managerApi} />);

    await userEvent.click(screen.getByRole('button'));

    expect(NonInputSpyComponentValue).toEqual(nonEventObject);
  });

  it('should call focus callback on focus event', async () => {
    const managerApi = createManagerApi(jest.fn());
    const api = managerApi();
    const focusSpy = jest.spyOn(api, 'focus');
    const blurSpy = jest.spyOn(api, 'blur');
    render(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

    await act(async () => {
      screen.getByRole('textbox').focus();
    });
    expect(focusSpy).toHaveBeenCalledWith('spy');
    await act(async () => {
      screen.getByRole('textbox').blur();
    });
    expect(blurSpy).toHaveBeenCalledWith('spy');
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it('should get nested value from', () => {
    const managerApi = createManagerApi({});
    managerApi().change('foo[0]', 'bar');

    render(<DummyComponent subscriberProps={{ name: 'foo[0]' }} managerApi={managerApi} />);

    expect(screen.getByRole('textbox')).toHaveValue('bar');
  });

  describe('initialValues', () => {
    it('should set value from initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: 'value1' } });

      render(<DummyComponent subscriberProps={{ name: 'spy' }} managerApi={managerApi} />);

      expect(managerApi().values.spy).toEqual('value1');
    });

    it('should set value from initialValues over initialValue', () => {
      const managerApi = createManagerApi({ initialValues: { spy: 'value1' } });

      render(<DummyComponent subscriberProps={{ name: 'spy', initialValue: 'value2' }} managerApi={managerApi} />);

      expect(managerApi().values.spy).toEqual('value1');
    });

    it('should set nested value from initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } } });

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');
    });

    it('should set value from initialValues only on first registration', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } } });

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });

      await cleanup();

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('different value');
    });

    it('should set value from initialValues when form.initializeOnTrue = true', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });

      await cleanup();

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');
    });

    it('should set value from initialValues when field.initializeOnTrue = true', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });

      render(<DummyComponent subscriberProps={{ name: 'spy.nested', initializeOnMount: true }} managerApi={managerApi} />);
      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });

      await cleanup();

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);

      expect(managerApi().values.spy.nested).toEqual('value123');
    });

    it('field.initializeOnMount has higher priority than form.initializeOnMount', async () => {
      const managerApi = createManagerApi({ initialValues: { spy: { nested: 'value123' } }, initializeOnMount: true });

      render(<DummyComponent subscriberProps={{ name: 'spy.nested' }} managerApi={managerApi} />);
      expect(managerApi().values.spy.nested).toEqual('value123');

      await act(async () => {
        managerApi().change('spy.nested', 'different value');
      });

      await cleanup();

      render(<DummyComponent subscriberProps={{ name: 'spy.nested', initializeOnMount: false }} managerApi={managerApi} />);

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

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <RenderWatch name="field" />
        </FormManagerContext.Provider>
      );

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['valid']);
      });

      expect(renderCount).toEqual(2);
    });

    it('should rerender only on subscription', async () => {
      const managerApi = createManagerApi({});

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <RenderWatch name="field" subscription={{ valid: true }} />
        </FormManagerContext.Provider>
      );

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['values']);
      });

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['valid']);
      });

      expect(renderCount).toEqual(2);
    });

    it('should rerender only on global subscription', async () => {
      const managerApi = createManagerApi({ subscription: { valid: true } });

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <RenderWatch name="field" subscription={{ valid: true }} />
        </FormManagerContext.Provider>
      );

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['values']);
      });

      expect(renderCount).toEqual(1);

      await act(async () => {
        managerApi().rerender(['valid']);
      });

      expect(renderCount).toEqual(2);
    });

    it('should only render field that changed its validation status', async () => {
      const managerApi = createManagerApi({ subscription: { valid: true } });
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <RenderWatch validate={() => 'Error'} name="field-1" subscription={{ valid: true }} />
          <RenderWatch validate={() => 'Error'} name="field-2" subscription={{ valid: true }} />
        </FormManagerContext.Provider>
      );

      /**
       * We have four renders after render, two per each component
       * One is after render and the scond after initial validation
       */
      expect(renderCount).toEqual(4);
      await act(async () => {
        managerApi().change('field-1', 'foo');
      });
      /**
       * Both fields should trigger render because they are subscribed to the "valid" event
       */
      expect(renderCount).toEqual(5);
    });
  });

  describe('validation', () => {
    const fooValidator = (value) => (value === 'foo' ? 'error' : undefined);

    let resolveAsync;

    const asyncValidator = (value) =>
      new Promise((res, rej) => {
        resolveAsync = fooValidator(value) ? () => rej('error') : () => res();
      });

    it('should correct set meta data on sync validation', async () => {
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'sync-validate',
        validate: fooValidator,
      };
      render(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);

      expect(spyProps.meta).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));

      await userEvent.type(screen.getByRole('textbox'), 'foo');

      expect(spyProps.meta).toEqual(expect.objectContaining({ error: 'error', valid: false, invalid: true }));

      await userEvent.clear(screen.getByRole('textbox'));
      await userEvent.type(screen.getByRole('textbox'), 'bar');

      expect(spyProps.meta).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));
    });

    it('should correct set meta data on assync validation', async () => {
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'sync-validate',
        validate: asyncValidator,
      };
      render(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      expect(spyProps.meta).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false }));

      await userEvent.type(screen.getByRole('textbox'), 'foo');

      expect(spyProps.meta).toEqual(expect.objectContaining({ error: undefined, validating: true, valid: true, invalid: false }));

      resolveAsync();

      await waitFor(() => expect(spyProps.meta).toEqual(expect.objectContaining({ error: 'error', validating: false, valid: false, invalid: true })));

      await userEvent.clear(screen.getByRole('textbox'));
      await userEvent.type(screen.getByRole('textbox'), 'bar');

      resolveAsync();

      await waitFor(() => expect(spyProps.meta).toEqual(expect.objectContaining({ error: undefined, valid: true, invalid: false })));
    });

    it('should set form level error key on sync validation', async () => {
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'sync-validate',
        validate: fooValidator,
      };
      render(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      expect(managerApi().errors).toEqual({});

      await userEvent.type(screen.getByRole('textbox'), 'foo');

      expect(managerApi().errors).toEqual({
        'sync-validate': 'error',
      });

      await userEvent.clear(screen.getByRole('textbox'));
      await userEvent.type(screen.getByRole('textbox'), 'bar');

      expect(managerApi().errors).toEqual({
        'sync-validate': undefined,
      });
    });

    it('should correctly set validaintg flag on multiple validate calls', async () => {
      let resSlow1;
      let resSlow2;
      let resFast;

      const asyncValidator = jest
        .fn()
        .mockImplementationOnce(
          () =>
            new Promise((res) => {
              resSlow1 = res;
            })
        )
        .mockImplementationOnce(
          () =>
            new Promise((res) => {
              resSlow2 = res;
            })
        )
        .mockImplementationOnce(
          () =>
            new Promise((res) => {
              resFast = res;
            })
        );
      const managerApi = createManagerApi({});
      const subscriberProps = {
        name: 'async-validate',
        validate: asyncValidator,
      };

      render(<DummyComponent managerApi={managerApi} subscriberProps={subscriberProps} />);
      expect(spyProps.meta).toEqual(expect.objectContaining({ validating: true, valid: true }));

      await act(async () => {
        resSlow1('ok');
      });

      expect(spyProps.meta).toEqual(expect.objectContaining({ validating: false, valid: true }));

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'f' } });
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'fo' } });

      await waitFor(() => expect(spyProps.meta).toEqual(expect.objectContaining({ validating: true, valid: true })));

      resSlow2('ok');

      await waitFor(() => expect(spyProps.meta).toEqual(expect.objectContaining({ validating: true, valid: true })));

      resFast('ok');

      await waitFor(() => expect(spyProps.meta).toEqual(expect.objectContaining({ validating: false, valid: true })));
    });
  });

  describe('clearedValue', () => {
    let CleanButton;

    beforeEach(() => {
      CleanButton = (props) => {
        const {
          input: { onChange },
        } = useField(props);

        return (
          <button type="button" onClick={() => onChange(undefined)}>
            clear
          </button>
        );
      };
    });

    it('should clearValue on field level', async () => {
      const managerApi = createManagerApi({});

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <CleanButton name="field" value="some value" clearedValue={null} />
        </FormManagerContext.Provider>
      );

      await userEvent.click(screen.getByText('clear'));

      expect(managerApi().values.field).toEqual(null);
    });

    it('should clearValue on form level', async () => {
      const managerApi = createManagerApi({});

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi(), clearedValue: null }}>
          <CleanButton name="field" value="some value" />
        </FormManagerContext.Provider>
      );

      await userEvent.click(screen.getByText('clear'));

      expect(managerApi().values.field).toEqual(null);
    });

    it('field cleared value has higher priority', async () => {
      const managerApi = createManagerApi({});

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi(), clearedValue: null }}>
          <CleanButton name="field" value="some value" clearedValue="cleared" />
        </FormManagerContext.Provider>
      );

      await userEvent.click(screen.getByText('clear'));

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

    beforeEach(() => {
      managerApi = createManagerApi({});

      Setter = (props) => {
        const {
          input: { onChange },
        } = useField(props);

        return <input onChange={(e) => onChange(props.value || e)} />;
      };
    });

    it('should parse string', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="string" />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), '123');

      expect(managerApi().values.field).toEqual('123');
    });

    it('should parse float', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), '12.34');

      expect(managerApi().values.field).toEqual(12.34);
    });

    it('should parse number', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="number" />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), '243242.809');

      expect(managerApi().values.field).toEqual(243242.809);
    });

    it('should parse boolean', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="boolean" />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), 'true');

      expect(managerApi().values.field).toEqual(true);
    });

    it('should parse integer', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="integer" />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), '12.809');

      expect(managerApi().values.field).toEqual(12);
    });

    it('should parse array of numbers', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="number" value={['1', '2', '45']} />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), ' ');

      expect(managerApi().values.field).toEqual([1, 2, 45]);
    });

    it('should parse initialValue - float', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" initialValue="12.34" />
        </FormManagerContext.Provider>
      );

      expect(managerApi().values.field).toEqual(12.34);
    });

    it('should parse defaultValue - float', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" defaultValue="12.34" />
        </FormManagerContext.Provider>
      );

      expect(managerApi().values.field).toEqual(12.34);
    });

    it('should parse defaultValue - objects', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Setter name="field" dataType="float" defaultValue={[{ value: '23.67' }, { value: '123.34' }]} />
        </FormManagerContext.Provider>
      );

      expect(managerApi().values.field).toEqual([{ value: 23.67 }, { value: 123.34 }]);
    });
  });

  describe('type', () => {
    let Typper;

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
      render(
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
        value: '',
      });
      spy.mockReset();

      await userEvent.click(screen.getByRole('checkbox'));

      expect(managerApi().values).toEqual({ field: true });

      expect(spy).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: '',
      });

      await userEvent.click(screen.getByRole('checkbox'));

      expect(managerApi().values).toEqual({ field: false });

      expect(spy).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: '',
      });
    });

    it('checkbox with values', async () => {
      const spyDog = jest.fn();
      const spyCat = jest.fn();
      const spyHamster = jest.fn();

      render(
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
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster',
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      await userEvent.click(screen.getAllByRole('checkbox')[1]);

      expect(managerApi().values).toEqual({ field: ['cat'] });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster',
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      await userEvent.click(screen.getAllByRole('checkbox')[2]);

      expect(managerApi().values).toEqual({ field: ['cat', 'hamster'] });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster',
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      await userEvent.click(screen.getAllByRole('checkbox')[2]);

      expect(managerApi().values).toEqual({ field: ['cat'] });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'checkbox',
        value: 'hamster',
      });
    });

    it('radio', async () => {
      const spyDog = jest.fn();
      const spyCat = jest.fn();
      const spyHamster = jest.fn();

      render(
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
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster',
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      await userEvent.click(screen.getAllByRole('radio')[1]);

      expect(managerApi().values).toEqual({ field: 'cat' });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster',
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      await userEvent.click(screen.getAllByRole('radio')[2]);

      expect(managerApi().values).toEqual({ field: 'hamster' });

      expect(spyDog).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'dog',
      });
      expect(spyCat).toHaveBeenCalledWith({
        checked: false,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'cat',
      });
      expect(spyHamster).toHaveBeenCalledWith({
        checked: true,
        multiple: undefined,
        name: 'field',
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        onFocus: expect.any(Function),
        type: 'radio',
        value: 'hamster',
      });
      spyDog.mockReset();
      spyCat.mockReset();
      spyHamster.mockReset();

      await userEvent.click(screen.getAllByRole('radio')[2]);

      expect(managerApi().values).toEqual({ field: 'hamster' });

      expect(spyDog).not.toHaveBeenCalledWith();
      expect(spyCat).not.toHaveBeenCalledWith();
      expect(spyHamster).not.toHaveBeenCalledWith();
    });
  });

  describe('format & parse', () => {
    let Dummy;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Dummy = (props) => {
        const { input } = useField(props);
        return <input {...input} />;
      };
    });

    it('parse value on change', async () => {
      const parse = jest.fn().mockImplementation((value, name) => value * 2);
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" parse={parse} />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), '2');

      expect(parse).toHaveBeenCalledWith('2', 'field');
      expect(managerApi().values).toEqual({ field: 4 });
    });

    it('format value', async () => {
      const format = jest.fn().mockImplementation((value, name) => value * 2);
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" format={format} />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), '2');

      expect(format).toHaveBeenCalledWith('2', 'field');
      expect(managerApi().values).toEqual({ field: '2' });
      expect(screen.getByRole('textbox')).toHaveValue('4');
    });

    it('format value on blur', async () => {
      const format = jest.fn().mockImplementation((value, name) => value * 2);
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" format={format} formatOnBlur />
        </FormManagerContext.Provider>
      );

      await userEvent.click(screen.getByRole('textbox'));

      format.mockClear(); // initialFormat

      await userEvent.type(screen.getByRole('textbox'), '2');

      expect(managerApi().values).toEqual({ field: '2' });
      expect(format).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox')).toHaveValue('2');

      await act(async () => {
        screen.getByRole('textbox').blur();
      });

      expect(format).toHaveBeenCalledWith('2', 'field');
      expect(screen.getByRole('textbox')).toHaveValue('4');
    });

    it('default parse and format handles undefined/empty string', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" />
        </FormManagerContext.Provider>
      );

      await fireEvent.change(screen.getByRole('textbox'), { target: { value: undefined } });

      expect(managerApi().values).toEqual({ field: undefined });
      expect(screen.getByRole('textbox')).toHaveValue('');

      await userEvent.type(screen.getByRole('textbox'), ' ');
      await userEvent.clear(screen.getByRole('textbox'));

      expect(managerApi().values).toEqual({ field: undefined });
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('allowNull', () => {
    let Dummy;
    let dummyProps;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Dummy = (props) => {
        const { input } = useField(props);

        dummyProps = { input };

        return <input {...input} onChange={() => input.onChange({ target: { value: null } })} />;
      };
    });

    it('by default converts null to empty string', async () => {
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), ' ');

      expect(screen.getByRole('textbox')).toHaveValue('');
      expect(dummyProps.input.value).toEqual('');
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

      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" allowNull />
        </FormManagerContext.Provider>
      );

      await userEvent.type(screen.getByRole('textbox'), ' ');

      expect(screen.getByRole('textbox')).toHaveValue('');
      expect(dummyProps.input.value).toEqual(null);

      // eslint-disable-next-line no-console
      console.error = _consoleError;
    });
  });

  describe('multiple', () => {
    let Select;
    let value;

    beforeEach(() => {
      Select = (props) => {
        const { input } = useField(props);

        value = input.value;

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
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Select name="field" multiple />
        </FormManagerContext.Provider>
      );

      expect(value).toEqual([]);

      fireEvent.change(screen.getByRole('listbox'), { target: { value: 'dogs' } });

      await waitFor(() => expect(value).toEqual(['dogs']));

      fireEvent.change(screen.getByRole('listbox'), { target: { value: 'hamsters' } });

      await waitFor(() => expect(value).toEqual(['dogs', 'hamsters']));

      fireEvent.change(screen.getByRole('listbox'), { target: { value: 'dogs' } });

      await waitFor(() => expect(value).toEqual(['hamsters']));
    });
  });

  describe('fileInput', () => {
    let Dummy;

    beforeEach(() => {
      managerApi = createManagerApi({});

      Dummy = (props) => {
        const {
          input: { value, ...rest },
        } = useField(props);
        return (
          <React.Fragment>
            <input {...rest} placeholder={rest.name} />
            <span>{value}</span>
          </React.Fragment>
        );
      };
    });

    it('register inputFile name and uregister', async () => {
      expect(managerApi().fileInputs).toEqual([]);
      render(
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" type="file" />
        </FormManagerContext.Provider>
      );
      expect(managerApi().fileInputs).toEqual(['field']);

      await cleanup();

      expect(managerApi().fileInputs).toEqual([]);
    });

    it('sanitize value', async () => {
      Dummy = (props) => {
        const {
          input: { value, ...rest },
        } = useField(props);
        return (
          <React.Fragment>
            <button
              type="button"
              onClick={() =>
                rest.onChange({
                  target: {
                    value: '/path/',
                    files: ['blabla'],
                    type: 'file',
                  },
                })
              }
            >
              upload
            </button>
            <span>{value}</span>
          </React.Fragment>
        );
      };

      const Component = () => (
        <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi() }}>
          <Dummy name="field" type="file" />
        </FormManagerContext.Provider>
      );

      render(<Component />);

      await userEvent.click(screen.getByText('upload'));
      expect(managerApi().getState().values).toEqual({
        field: {
          inputFiles: ['blabla'],
          inputValue: '/path/',
        },
      });

      const spanElement = await screen.findByText('/path/');
      expect(spanElement).toBeInTheDocument();
    });
  });
});
