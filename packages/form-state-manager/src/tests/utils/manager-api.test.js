import createManagerApi, { initialMeta } from '../../utils/manager-api';

describe('managerApi', () => {
  it('should create managerApi getter', () => {
    const managerApi = createManagerApi({});
    expect(managerApi).toEqual(expect.any(Function));
  });

  it('should set initialValues', () => {
    const initialValues = {
      field: 'value',
      nested: {
        some: {
          very: {
            'tryingToDestroy.[2][4].name': 'cosi',
            nested: 'value',
            array: ['123', '245'],
            nestedObjects: [{ name: 'john' }, { name: 'jane', lastname: 'smith' }],
            nestier: [
              {
                superNested: [
                  {
                    lastName: 'michael'
                  }
                ]
              }
            ]
          }
        }
      }
    };
    const managerApi = createManagerApi({ initialValues });
    expect(managerApi().initialValues).toEqual(initialValues);
    expect(managerApi().values).toEqual({
      field: 'value',
      'nested.some.very.tryingToDestroy.[2][4].name': 'cosi',
      'nested.some.very.nested': 'value',
      'nested.some.very.array[0]': '123',
      'nested.some.very.array[1]': '245',
      'nested.some.very.nestedObjects[0].name': 'john',
      'nested.some.very.nestedObjects[1].name': 'jane',
      'nested.some.very.nestedObjects[1].lastname': 'smith',
      'nested.some.very.nestier[0].superNested[0].lastName': 'michael'
    });
  });

  it('should change the managerApi state', () => {
    const managerApi = createManagerApi({});
    managerApi().change('foo', 'bar');

    expect(managerApi().values).toEqual({ foo: 'bar' });
    expect(managerApi().visited).toEqual({ foo: true });
    expect(managerApi().modified).toEqual({ foo: true });
    expect(managerApi().modifiedSinceLastSubmit).toEqual(true);
    expect(managerApi().dirtySinceLastSubmit).toEqual(true);
    expect(managerApi().dirtyFields).toEqual({ foo: true });
    expect(managerApi().dirtyFieldsSinceLastSubmit).toEqual({ foo: true });
    expect(managerApi().pristine).toEqual(false);

    managerApi().change('foo', 'bar');
    expect(managerApi().dirtyFields).toEqual({ foo: true });
    expect(managerApi().dirtyFieldsSinceLastSubmit).toEqual({ foo: true });
  });

  it('should change different api instance separatelly', () => {
    const firstManagerApi = createManagerApi({});
    const secondManagerApi = createManagerApi({});
    firstManagerApi().change('foo', 'bar');
    secondManagerApi().change('baz', 'quazz');
    expect(firstManagerApi().values).toEqual({ foo: 'bar' });
    expect(secondManagerApi().values).toEqual({ baz: 'quazz' });
  });

  it('should getState', () => {
    const managerApi = createManagerApi({ initialValues: { some: { nested: 'value' } } });

    expect(managerApi().getState()).toMatchObject({
      active: undefined,
      dirty: false,
      dirtyFields: {},
      dirtyFieldsSinceLastSubmit: {},
      dirtySinceLastSubmit: false,
      error: undefined,
      errors: {},
      hasSubmitErrors: false,
      hasValidationErrors: false,
      initialValues: { some: { nested: 'value' } },
      invalid: false,
      modified: {},
      pristine: true,
      submitError: undefined,
      submitErrors: undefined,
      submitFailed: false,
      submitSucceeded: false,
      submitting: false,
      touched: {},
      valid: true,
      validating: false,
      values: { some: { nested: 'value' } },
      visited: {}
    });
  });

  it('should registerField', () => {
    const managerApi = createManagerApi({});

    const render = jest.fn();
    const internalId = Date.now();

    managerApi().registerField({ name: 'field', render, internalId });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({
      field: {
        asyncWatcher: { registerValidator: expect.any(Function) },
        count: 1,
        state: {
          name: 'field',
          value: undefined,
          meta: initialMeta(undefined)
        },
        fields: { [internalId]: { render, subscription: undefined } }
      }
    });
  });

  it('should registerField 2x', () => {
    const managerApi = createManagerApi({});

    const render = jest.fn();
    const internalId = Date.now();

    const render1 = jest.fn();
    const internalId1 = Date.now() + 123;
    const subscription1 = { valid: true };

    managerApi().registerField({ name: 'field', render, internalId });
    managerApi().registerField({ name: 'field', render: render1, internalId: internalId1, subscription: subscription1 });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({
      field: {
        asyncWatcher: { registerValidator: expect.any(Function) },
        count: 2,
        state: {
          name: 'field',
          value: undefined,
          meta: initialMeta(undefined)
        },
        fields: {
          [internalId]: { render, subscription: undefined },
          [internalId1]: { render: render1, subscription: subscription1 }
        }
      }
    });
  });

  it('should unregisterField', () => {
    const managerApi = createManagerApi({});

    const render = jest.fn();
    const internalId = Date.now();

    managerApi().registerField({ name: 'field', render, internalId });

    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field', fields: { [internalId]: { render } } });

    expect(managerApi().registeredFields).toEqual([]);
  });

  it('should unregisterField multiple times last', () => {
    const managerApi = createManagerApi({});

    const render = jest.fn();
    const internalId = Date.now();

    const render1 = jest.fn();
    const internalId1 = Date.now() + 123;
    const subscription1 = { valid: true };

    managerApi().registerField({ name: 'field', render, internalId });
    managerApi().registerField({ name: 'field', render: render1, internalId: internalId1, subscription: subscription1 });

    expect(managerApi().fieldListeners).toEqual({
      field: {
        asyncWatcher: { registerValidator: expect.any(Function) },
        count: 2,
        state: {
          name: 'field',
          value: undefined,
          meta: initialMeta(undefined)
        },
        fields: {
          [internalId]: { render, subscription: undefined },
          [internalId1]: { render: render1, subscription: subscription1 }
        }
      }
    });
    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field', internalId });

    expect(managerApi().fieldListeners).toEqual({
      field: {
        asyncWatcher: { registerValidator: expect.any(Function) },
        count: 1,
        state: {
          name: 'field',
          value: undefined,
          meta: initialMeta(undefined)
        },
        fields: {
          [internalId1]: { render: render1, subscription: subscription1 }
        }
      }
    });
    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field', internalId: internalId1 });

    expect(managerApi().fieldListeners).toEqual({
      field: {
        count: 0,
        asyncWatcher: { registerValidator: expect.any(Function) },
        state: {
          name: 'field',
          value: undefined,
          meta: initialMeta(undefined)
        },
        fields: {}
      }
    });
    expect(managerApi().registeredFields).toEqual([]);
  });

  describe('reset & restart', () => {
    it('should reset form', () => {
      const managerApi = createManagerApi({ initialValues: { field: '123' } });

      managerApi().registerField({ name: 'field', render: jest.fn(), internalId: Date.now() });
      managerApi().change('field', '345');

      expect(managerApi().values.field).toEqual('345');
      expect(managerApi().dirtyFields).toEqual({ field: true });
      expect(managerApi().dirty).toEqual(true);
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('123'),
        value: '345'
      });
      expect(managerApi().registeredFields).toEqual(['field']);

      managerApi().reset();

      expect(managerApi().values.field).toEqual('123');
      expect(managerApi().dirtyFields).toEqual({ field: false });
      expect(managerApi().dirty).toEqual(false);
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('123'),
        value: '123'
      });
      expect(managerApi().registeredFields).toEqual(['field']);

      managerApi().change('field', '345');
      managerApi().reset({ field: '457' });

      expect(managerApi().values.field).toEqual('457');
      expect(managerApi().dirtyFields).toEqual({ field: false });
      expect(managerApi().dirty).toEqual(false);
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('457'),
        value: '457'
      });
      expect(managerApi().registeredFields).toEqual(['field']);
    });

    it('should restart form with initialValues', () => {
      const managerApi = createManagerApi({ initialValues: { field: '123' } });

      managerApi().registerField({ name: 'field', render: jest.fn(), internalId: Date.now() });
      managerApi().change('field', '345');

      expect(managerApi().values.field).toEqual('345');
      expect(managerApi().dirtyFields).toEqual({ field: true });
      expect(managerApi().dirty).toEqual(true);
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('123'),
        value: '345'
      });
      expect(managerApi().registeredFields).toEqual(['field']);

      managerApi().restart();

      expect(managerApi().values.field).toEqual('123');
      expect(managerApi().dirtyFields).toEqual({ field: false });
      expect(managerApi().dirty).toEqual(false);
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('123'),
        value: '123'
      });
      expect(managerApi().registeredFields).toEqual(['field']);
    });

    it('resetFieldState', () => {
      const managerApi = createManagerApi({ initialValues: { field: '123' } });

      managerApi().registerField({ name: 'field', render: jest.fn(), internalId: Date.now() });
      managerApi().change('field', '345');

      expect(managerApi().values.field).toEqual('345');
      expect(managerApi().dirtyFields).toEqual({ field: true });
      expect(managerApi().dirty).toEqual(true);
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('123'),
        value: '345'
      });
      expect(managerApi().registeredFields).toEqual(['field']);

      managerApi().resetFieldState('field');

      expect(managerApi().values.field).toEqual('123');
      expect(managerApi().dirtyFields).toEqual({ field: false });
      // expect(managerApi().dirty).toEqual(false); TODO: recompute whole state
      expect(managerApi().fieldListeners.field.state).toEqual({
        name: 'field',
        meta: initialMeta('123'),
        value: '123'
      });
      expect(managerApi().registeredFields).toEqual(['field']);
    });
  });

  describe('clearOnUnmount', () => {
    it('should clear on form level', () => {
      const managerApi = createManagerApi({ clearOnUnmount: true });

      managerApi().registerField({ name: 'field', render: jest.fn() });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field' });

      expect(managerApi().values).toEqual({ field: undefined });
    });

    it('should clear on field level', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', render: jest.fn() });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field', clearOnUnmount: true });

      expect(managerApi().values).toEqual({ field: undefined });
    });

    it('should override form level by field', () => {
      const managerApi = createManagerApi({ clearOnUnmount: true });

      managerApi().registerField({ name: 'field', render: jest.fn() });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field', clearOnUnmount: false });

      expect(managerApi().values).toEqual({ field: 'value' });
    });

    it('should clear on field level with cleared value', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', render: jest.fn() });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field', clearOnUnmount: true, value: null });

      expect(managerApi().values).toEqual({ field: null });
    });
  });

  it('should submit nested values', () => {
    const expectedValues = {
      field: 'field',
      nested: {
        name: 'nested.name',
        age: 'nested.age'
      },
      array: [{ name: 'array[0].name', age: 'array[0].age' }]
    };
    const onSubmit = jest.fn();
    const managerApi = createManagerApi({ onSubmit });
    const { registerField, change } = managerApi();
    registerField({ name: 'field', render: jest.fn() });
    registerField({ name: 'nested.name', render: jest.fn() });
    registerField({ name: 'nested.age', render: jest.fn() });
    registerField({ name: 'array[0].name', render: jest.fn() });
    registerField({ name: 'array[0].age', render: jest.fn() });

    managerApi().registeredFields.forEach((key) => {
      change(key, key);
    });
    managerApi().handleSubmit({ preventDefault: jest.fn() });
    expect(onSubmit).toHaveBeenCalledWith(expectedValues);
  });

  it('getField state should return correct field state', () => {
    const expectedValue = {
      value: { foo: 'bar' },
      name: 'field',
      meta: initialMeta({ foo: 'bar' }),
      active: false,
      blur: expect.any(Function),
      change: expect.any(Function),
      data: {},
      dirty: false,
      dirtySinceLastSubmit: false,
      error: undefined,
      focus: expect.any(Function),
      initial: { foo: 'bar' },
      invalid: false,
      // length: undefined, TODO: array
      modified: false,
      pristine: true,
      submitError: undefined,
      submitFailed: false,
      submitSucceeded: false,
      submitting: false,
      touched: false,
      valid: true,
      validating: false,
      visited: false,
      modifiedSinceLastSubmit: false
    };
    const managerApi = createManagerApi({});
    const { registerField } = managerApi();
    registerField({
      name: 'field',
      value: { foo: 'bar' }
    });
    expect(managerApi().getFieldState('field')).toEqual(expectedValue);
  });

  it('should mark active field on focus and delete it on blur', () => {
    const managerApi = createManagerApi({});
    const { focus, blur } = managerApi();
    expect(managerApi().active).toBeUndefined();
    focus('foo');
    expect(managerApi().active).toBe('foo');
    blur('nonsense');
    expect(managerApi().active).toBe('foo');
    blur('foo');
    expect(managerApi().active).toBeUndefined();
  });

  describe('initializeOnMount', () => {
    // not testable here, because we need to compute value in useSubscription
    // TODO: make global storage for field states ?
    it.skip('should initialize on form level using initialValues', () => {
      const managerApi = createManagerApi({ initializeOnMount: true, initialValues: { field: 'second' } });

      managerApi().registerField({ name: 'field', value: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should initialize on form level', () => {
      const managerApi = createManagerApi({ initializeOnMount: true });

      managerApi().registerField({ name: 'field', value: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', value: 'second', render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should initialize on field level', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', value: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', value: 'second', initializeOnMount: true, render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should override form level by field', () => {
      const managerApi = createManagerApi({ initializeOnMount: true });

      managerApi().registerField({ name: 'field', value: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', value: 'second', initializeOnMount: false, render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'first' });
    });

    it('should send initialvalues to submit', () => {
      const onSubmit = jest.fn();
      const initialValues = { field: 'value1', nested: { level: 'value2' } };
      const managerApi = createManagerApi({ onSubmit, initialValues });

      managerApi().handleSubmit({ preventDefault: jest.fn() });

      expect(onSubmit).toHaveBeenCalledWith(initialValues);
    });
  });

  describe('subscription', () => {
    let field1;
    let field2;

    let renderField1;
    let renderField2;

    beforeEach(() => {
      renderField1 = jest.fn();
      renderField2 = jest.fn();

      field1 = { name: 'field1', render: renderField1 };
      field2 = { name: 'field2', render: renderField2 };
    });

    it('render by default', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ ...field1 });
      managerApi().registerField({ ...field2 });

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['values']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();
    });

    it('global subscription', () => {
      const managerApi = createManagerApi({ subscription: { valid: true } });

      managerApi().registerField({ ...field1 });
      managerApi().registerField({ ...field2 });

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['values']);

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['valid']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();
    });

    it('field subscription only on valid', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ ...field1 });
      managerApi().registerField({ ...field2, subscription: { valid: true } });

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['values']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['valid']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();
    });

    it('merge global and field subscription correctly', () => {
      const managerApi = createManagerApi({ subscription: { validating: true } });

      managerApi().registerField({ ...field1 });
      managerApi().registerField({ ...field2, subscription: { valid: true } });

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['validating']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();

      renderField1.mockReset();
      renderField2.mockReset();

      managerApi().rerender(['valid']);

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();
    });
  });

  describe('batch', () => {
    it('should render only once', () => {
      const managerApi = createManagerApi({});

      const render = jest.fn();
      const field = { name: 'field1', internalId: '123', render, subscription: { values: true } };

      const render2 = jest.fn();
      const field2 = { name: 'field2', internalId: '234', render: render2, subscription: { valid: true } };

      const render3 = jest.fn();
      const field3 = { name: 'field3', internalId: '567', render: render3, subscription: { invalid: true } };

      managerApi().registerField(field);
      managerApi().registerField(field2);
      managerApi().registerField(field3);

      managerApi().batch(() => {
        managerApi().rerender(['values']);
        managerApi().rerender(['values']);
        managerApi().rerender(['values']);
        managerApi().rerender(['valid']);
        managerApi().rerender(['valid']);
        managerApi().rerender(['valid']);
        managerApi().rerender(['valid']);
      });

      expect(render.mock.calls.length).toEqual(1);
      expect(render2.mock.calls.length).toEqual(1);
      expect(render3.mock.calls.length).toEqual(0); // it's not subscribed

      render.mockReset();
      render2.mockReset();

      managerApi().rerender(['values']);

      expect(render.mock.calls.length).toEqual(1);
      expect(render2.mock.calls.length).toEqual(0); // clears batched subscription
      expect(render3.mock.calls.length).toEqual(0);
    });

    it('should not render when nothing changed', () => {
      const managerApi = createManagerApi({});

      const render = jest.fn();
      const field = { name: 'field1', internalId: '123', render };

      managerApi().registerField(field);

      managerApi().batch(() => undefined);

      expect(render.mock.calls.length).toEqual(0);
    });

    describe('debug', () => {
      it('debug state on rerender', () => {
        const debug = jest.fn();
        const initialValues = { some: { nested: 'pepa' } };

        const managerApi = createManagerApi({ debug, initialValues });

        expect(debug.mock.calls.length).toEqual(0);

        managerApi().rerender(['validating']);
        managerApi().rerender(['valid']);
        managerApi().rerender(['values']);

        expect(debug.mock.calls.length).toEqual(3);

        expect(debug).toHaveBeenCalledWith(
          expect.objectContaining({
            values: initialValues
          })
        );
      });
    });
  });

  describe('subscribe', () => {
    it('should subscribe with name (no isField flag = no state)', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({});

      managerApi().subscribe({ name: 'field', render, subscription: { valid: true } });

      expect(managerApi().fieldListeners).toEqual({
        field: {
          count: 1,
          fields: {
            field: {
              render,
              subscription: { valid: true }
            }
          }
        }
      });
    });

    it('should subscribe with name and internal id', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({});

      managerApi().subscribe({ name: 'field', internalId: 'id', render, subscription: { valid: true } });

      expect(managerApi().fieldListeners).toEqual({
        field: {
          count: 1,
          fields: {
            id: {
              render,
              subscription: { valid: true }
            }
          }
        }
      });
    });

    it('should unsubscribe with name', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({});

      managerApi().subscribe({ name: 'field', render, subscription: { valid: true } });
      managerApi().unsubscribe({ name: 'field' });

      expect(managerApi().fieldListeners).toEqual({});
    });
  });
});
