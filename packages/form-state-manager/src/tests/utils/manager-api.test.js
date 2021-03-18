import createManagerApi, { initialMeta, flatObject } from '../../utils/manager-api';
import FORM_ERROR from '../../files/form-error';
import * as focusError from '../../utils/focus-error';

describe('managerApi', () => {
  let focusErrorSpy;

  beforeEach(() => {
    focusErrorSpy = jest.spyOn(focusError, 'default');
  });

  afterEach(() => {
    focusErrorSpy.mockClear();
  });

  it('should create managerApi getter', () => {
    const managerApi = createManagerApi({});
    expect(managerApi).toEqual(expect.any(Function));
  });

  it('should set initialValues', () => {
    const initialValues = {
      field: 'value',
      nested: {
        some: 'nested_value'
      }
    };
    const managerApi = createManagerApi({ initialValues });
    expect(managerApi().initialValues).toEqual(initialValues);
    expect(managerApi().values).toEqual(initialValues);
  });

  it('un/flatObject should un/flatObject', () => {
    const values = {
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

    const result = {
      field: 'value',
      'nested.some.very.tryingToDestroy.[2][4].name': 'cosi',
      'nested.some.very.nested': 'value',
      'nested.some.very.array[0]': '123',
      'nested.some.very.array[1]': '245',
      'nested.some.very.nestedObjects[0].name': 'john',
      'nested.some.very.nestedObjects[1].name': 'jane',
      'nested.some.very.nestedObjects[1].lastname': 'smith',
      'nested.some.very.nestier[0].superNested[0].lastName': 'michael'
    };

    expect(flatObject(values)).toEqual(result);
  });

  describe('change', () => {
    it('should change the managerApi state', () => {
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'foo', render, internalId: '1' });

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

    it('should validateFields when change', () => {
      const managerApi = createManagerApi({});

      const render = jest.fn();

      const validate1 = jest.fn();
      const validate2 = jest.fn();

      managerApi().registerField({ name: 'field1', render, validateFields: ['field2'] });
      managerApi().registerField({ name: 'field2', render, validate: validate1 });
      managerApi().registerField({ name: 'field3', render, validate: validate2 });

      // initial validate
      expect(validate1).toHaveBeenCalled();
      expect(validate2).toHaveBeenCalled();
      validate1.mockClear();
      validate2.mockClear();

      managerApi().change('field1', 'cosi');

      expect(validate1).toHaveBeenCalled();
      expect(validate2).not.toHaveBeenCalled();

      validate1.mockReset();

      managerApi().change('field2', 'cosi');

      expect(validate1).toHaveBeenCalled();
      expect(validate2).toHaveBeenCalled();
    });

    it('empty validateFields', () => {
      const managerApi = createManagerApi({});

      const render = jest.fn();

      const validate1 = jest.fn();
      const validate2 = jest.fn();

      managerApi().registerField({ name: 'field1', render, validate: validate1, validateFields: [] });
      managerApi().registerField({ name: 'field2', render, validate: validate2 });

      // initial validate
      expect(validate1).toHaveBeenCalled();
      expect(validate2).toHaveBeenCalled();
      validate1.mockClear();
      validate2.mockClear();

      managerApi().change('field1', 'cosi');

      expect(validate1).toHaveBeenCalled();
      expect(validate2).not.toHaveBeenCalled();

      validate1.mockReset();

      managerApi().change('field2', 'cosi');

      expect(validate1).toHaveBeenCalled();
      expect(validate2).toHaveBeenCalled();
    });

    it('should compute value using isEqual', () => {
      const managerApi = createManagerApi({});

      const render = jest.fn();
      const isEqual = jest.fn().mockImplementation(() => true);

      managerApi().registerField({ name: 'field1', render, isEqual });

      managerApi().change('field1', 'cosi');

      expect(isEqual).toHaveBeenCalledWith('cosi', undefined);

      managerApi().registerField({ name: 'field2', render, isEqual, initialValue: 'initial' });

      managerApi().change('field2', 'cosi');

      expect(isEqual).toHaveBeenCalledWith('cosi', 'initial');
    });

    it('should compute value using isEqual - multiple functions - false result', () => {
      const managerApi = createManagerApi({ initialValues: { field1: 'initial' } });

      const render = jest.fn();
      const isEqual = jest.fn().mockImplementation(() => true);
      const isEqual2 = jest.fn().mockImplementation(() => false);

      managerApi().registerField({ name: 'field1', internalId: 1, render, isEqual });
      managerApi().registerField({ name: 'field1', internalId: 2, render, isEqual: isEqual2 });

      managerApi().change('field1', 'cosi');

      expect(isEqual).toHaveBeenCalledWith('cosi', 'initial');
      expect(isEqual2).toHaveBeenCalledWith('cosi', 'initial');

      expect(managerApi().getFieldState('field1').pristine).toEqual(false);
    });

    it('should compute value using isEqual - multiple functions - true result', () => {
      const managerApi = createManagerApi({ initialValues: { field1: 'initial' } });

      const render = jest.fn();
      const isEqual = jest.fn().mockImplementation(() => true);
      const isEqual2 = jest.fn().mockImplementation(() => true);

      managerApi().registerField({ name: 'field1', internalId: 1, render, isEqual });
      managerApi().registerField({ name: 'field1', internalId: 2, render, isEqual: isEqual2 });

      managerApi().change('field1', 'cosi');

      expect(isEqual).toHaveBeenCalledWith('cosi', 'initial');
      expect(isEqual2).toHaveBeenCalledWith('cosi', 'initial');

      expect(managerApi().getFieldState('field1').pristine).toEqual(true);
    });
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
        meta: {
          ...initialMeta('123'),
          dirty: true,
          pristine: false
        },
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
        meta: {
          ...initialMeta('123'),
          dirty: true,
          pristine: false
        },
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
        meta: {
          ...initialMeta('123'),
          dirty: true,
          pristine: false
        },
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

    it('should clear on form level using destroyOnUnregister', () => {
      const managerApi = createManagerApi({ destroyOnUnregister: true });

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
    const managerApi = createManagerApi({ onSubmit: (values) => onSubmit(values) });
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

    expect(managerApi().submitting).toEqual(false);
    expect(managerApi().submitError).toEqual(undefined);
    expect(managerApi().submitFailed).toEqual(false);
    expect(managerApi().submitSucceeded).toEqual(true);
  });

  it('onsubmit receives an error', () => {
    const focusErrorSpy = jest.spyOn(focusError, 'default');
    const error = { field: 'some-error' };
    const onSubmit = jest.fn().mockImplementation(() => error);
    const managerApi = createManagerApi({ onSubmit });
    const { registerField } = managerApi();

    const render = jest.fn();
    registerField({ name: 'field', render });

    expect(render).not.toHaveBeenCalled();

    managerApi().handleSubmit();

    expect(render).toHaveBeenCalled();
    expect(managerApi().submitting).toEqual(false);
    expect(managerApi().submitError).toEqual(undefined);
    expect(managerApi().submitFailed).toEqual(true);
    expect(managerApi().submitSucceeded).toEqual(false);
    expect(managerApi().submitErrors).toEqual(error);
    expect(managerApi().hasSubmitErrors).toEqual(true);
    expect(managerApi().hasValidationErrors).toEqual(false);
    expect(focusErrorSpy).toHaveBeenCalledWith({ field: 'some-error' }, undefined);
  });

  it('onsubmit receives an error - named form', () => {
    const name = 'i-am-form';
    const focusErrorSpy = jest.spyOn(focusError, 'default');
    const error = { field: 'some-error' };
    const onSubmit = jest.fn().mockImplementation(() => error);
    const managerApi = createManagerApi({ onSubmit, name });
    const { registerField } = managerApi();

    const render = jest.fn();
    registerField({ name: 'field', render });

    managerApi().handleSubmit();

    expect(focusErrorSpy).toHaveBeenCalledWith({ field: 'some-error' }, name);
  });

  it('onsubmit receives an error - form level', () => {
    const error = { [FORM_ERROR]: 'some-error' };
    const onSubmit = jest.fn().mockImplementation(() => error);
    const managerApi = createManagerApi({ onSubmit });
    const { registerField } = managerApi();

    const render = jest.fn();
    registerField({ name: 'field', render });

    expect(render).not.toHaveBeenCalled();

    managerApi().handleSubmit();

    expect(render).toHaveBeenCalled();
    expect(managerApi().submitting).toEqual(false);
    expect(managerApi().submitError).toEqual('some-error');
    expect(managerApi().submitFailed).toEqual(true);
    expect(managerApi().submitSucceeded).toEqual(false);
    expect(managerApi().submitErrors).toEqual(error);
    expect(managerApi().hasSubmitErrors).toEqual(true);
    expect(managerApi().hasValidationErrors).toEqual(false);
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
      initialValue: { foo: 'bar' }
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

  it('should set blured field as touched', () => {
    const managerApi = createManagerApi({});

    managerApi().registerField({
      name: 'field',
      render: jest.fn(),
      internalId: 1
    });

    expect(managerApi().fieldListeners.field.state.meta.touched).toEqual(false);

    managerApi().focus('field');
    managerApi().blur('field');

    expect(managerApi().fieldListeners.field.state.meta.touched).toEqual(true);
  });

  describe('initializeOnMount', () => {
    // not testable here, because we need to compute value in useSubscription
    // TODO: make global storage for field states ?
    it.skip('should initialize on form level using initialValues', () => {
      const managerApi = createManagerApi({ initializeOnMount: true, initialValues: { field: 'second' } });

      managerApi().registerField({ name: 'field', initialValue: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should initialize on form level', () => {
      const managerApi = createManagerApi({ initializeOnMount: true });

      managerApi().registerField({ name: 'field', initialValue: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', initialValue: 'second', render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should initialize on field level', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', initialValue: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', initialValue: 'second', initializeOnMount: true, render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should override form level by field', () => {
      const managerApi = createManagerApi({ initializeOnMount: true });

      managerApi().registerField({ name: 'field', initialValue: 'first', render: jest.fn() });
      managerApi().registerField({ name: 'field', initialValue: 'second', initializeOnMount: false, render: jest.fn() });

      expect(managerApi().values).toEqual({ field: 'first' });
    });

    it('should send initialvalues to submit', () => {
      const onSubmit = jest.fn();
      const initialValues = { field: 'value1', nested: { level: 'value2' } };
      const managerApi = createManagerApi({ onSubmit: (values) => onSubmit(values), initialValues });

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

      expect(renderField1).toHaveBeenCalled(); // registeredFields was changed
      expect(renderField2).not.toHaveBeenCalled();

      renderField1.mockReset();

      managerApi().rerender(['values']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();
    });

    it('global subscription', () => {
      const managerApi = createManagerApi({ subscription: { valid: true } });

      managerApi().registerField({ ...field1, subscription: { valid: true } }, false, true);
      managerApi().registerField({ ...field2 });

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['values']);

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['valid']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();
    });

    it('field subscription only on valid', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ ...field1 });
      managerApi().registerField({ ...field2, subscription: { valid: true } });

      expect(renderField1).toHaveBeenCalled(); // registeredFields was changed
      expect(renderField2).not.toHaveBeenCalled();

      renderField1.mockReset();

      managerApi().rerender(['values']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['valid']);

      expect(renderField1).toHaveBeenCalled();
      expect(renderField2).toHaveBeenCalled();
    });

    it('do not render when global subscription is set', () => {
      const managerApi = createManagerApi({ subscription: { validating: true } });

      managerApi().registerField({ ...field1 });
      managerApi().registerField({ ...field2, subscription: { valid: true } });

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

      managerApi().rerender(['validating']);

      expect(renderField1).not.toHaveBeenCalled();
      expect(renderField2).not.toHaveBeenCalled();

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

    it('supports nested batching', () => {
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

        managerApi().batch(() => {
          managerApi().rerender(['values']);
          managerApi().rerender(['values']);
          managerApi().rerender(['values']);
          managerApi().rerender(['valid']);
          managerApi().rerender(['valid']);
          managerApi().rerender(['valid']);
          managerApi().rerender(['valid']);
        });

        expect(render.mock.calls.length).toEqual(0);
        expect(render2.mock.calls.length).toEqual(0);
        expect(render3.mock.calls.length).toEqual(0);

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

  describe('Form level validation', () => {
    const validate = (values) => (values.foo === 'foo' ? { foo: 'error' } : undefined);
    const asyncValidate = (values) =>
      new Promise((res, rej) =>
        setTimeout(() => {
          if (values?.foo === 'foo') {
            rej({ foo: 'error' });
          }

          return res();
        }, 10)
      );

    it('should pass sync level validation', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({ validate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });
      registerField({ name: 'bar', render });

      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(false);

      change('foo', 'ok');
      change('bar', 'baz');

      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(false);
    });

    it('should fail sync level validation', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({ validate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });
      registerField({ name: 'bar', render });

      change('foo', 'foo');
      change('bar', 'baz');

      expect(managerApi().getState().errors).toEqual({ foo: 'error' });
      expect(managerApi().getState().valid).toEqual(false);
      expect(managerApi().getState().invalid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(false);
      expect(managerApi().hasValidationErrors).toEqual(true);
    });

    it('should fail sync level validation and set field error', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({ validate: () => ({ nested: { foo: 'some-very-evil-error' } }) });
      const { registerField } = managerApi();

      registerField({ name: 'nested.foo', render });

      expect(managerApi().getState().errors).toEqual({ nested: { foo: 'some-very-evil-error' } });
      expect(managerApi().getState().valid).toEqual(false);
      expect(managerApi().getState().invalid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(false);
      expect(managerApi().hasValidationErrors).toEqual(true);
      expect(managerApi().getFieldState('nested.foo').meta.error).toEqual('some-very-evil-error');
    });

    it('should fail async level validation and set field error', (done) => {
      const asyncValidateWithError = () => Promise.reject({ nested: { foo: 'some-very-evil-error' } });

      const render = jest.fn();
      const managerApi = createManagerApi({ validate: asyncValidateWithError });
      const { registerField } = managerApi();

      registerField({ name: 'nested.foo', render });

      setImmediate(() => {
        expect(managerApi().getState().valid).toEqual(false);
        expect(managerApi().getState().invalid).toEqual(true);
        expect(managerApi().getState().validating).toEqual(false);
        expect(managerApi().hasValidationErrors).toEqual(true);
        expect(managerApi().getState().errors).toEqual({ nested: { foo: 'some-very-evil-error' } });
        expect(managerApi().getFieldState('nested.foo').meta.error).toEqual('some-very-evil-error');

        done();
      });
    });

    it('should pass async level validation', () => {
      jest.useFakeTimers();
      const render = jest.fn();
      const managerApi = createManagerApi({ validate: asyncValidate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });
      registerField({ name: 'bar', render });

      change('foo', 'ok');
      change('bar', 'baz');

      /**
       * before validation starts
       */
      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(true);

      jest.advanceTimersByTime(5);

      /**
       * While validation in progress
       */
      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(true);

      jest.advanceTimersByTime(5);

      /**
       * After validation finishes
       */
      jest.advanceTimersByTime(6);
      setImmediate(() => {
        expect(managerApi().getState().errors).toEqual({});
        expect(managerApi().getState().valid).toEqual(true);
        expect(managerApi().getState().validating).toEqual(false);
      });
    });

    it('should fail async level validation', () => {
      jest.useFakeTimers();
      const render = jest.fn();
      const managerApi = createManagerApi({ validate: asyncValidate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });
      registerField({ name: 'bar', render });

      change('foo', 'foo');
      change('bar', 'baz');

      /**
       * before validation starts
       */
      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(true);

      jest.advanceTimersByTime(5);

      /**
       * While validation in progress
       */
      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(true);

      jest.advanceTimersByTime(5);

      /**
       * After validation finishes
       */
      jest.advanceTimersByTime(6);
      setImmediate(() => {
        expect(managerApi().getState().errors).toEqual({
          foo: 'error'
        });
        expect(managerApi().getState().valid).toEqual(false);
        expect(managerApi().getState().invalid).toEqual(true);
        expect(managerApi().getState().validating).toEqual(false);
        expect(managerApi().hasValidationErrors).toEqual(true);
      });
    });

    it('should fail and then pass sync validation', () => {
      const render = jest.fn();
      const managerApi = createManagerApi({ validate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });

      change('foo', 'foo');

      expect(managerApi().getState().errors).toEqual({
        foo: 'error'
      });
      expect(managerApi().getState().valid).toEqual(false);
      expect(managerApi().getState().invalid).toEqual(true);
      expect(managerApi().getState().validating).toEqual(false);
      expect(managerApi().hasValidationErrors).toEqual(true);

      change('foo', 'ok');

      expect(managerApi().getState().errors).toEqual({});
      expect(managerApi().getState().valid).toEqual(true);
      expect(managerApi().getState().invalid).toEqual(false);
      expect(managerApi().getState().validating).toEqual(false);
      expect(managerApi().hasValidationErrors).toEqual(false);
    });

    it('should fail and then pass async validation', () => {
      jest.useFakeTimers();
      const render = jest.fn();
      const managerApi = createManagerApi({ validate: asyncValidate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });

      change('foo', 'foo');

      jest.advanceTimersByTime(10);
      setImmediate(() => {
        expect(managerApi().getState().errors).toEqual({
          foo: 'error'
        });
        expect(managerApi().getState().valid).toEqual(false);
        expect(managerApi().getState().invalid).toEqual(true);
        expect(managerApi().getState().validating).toEqual(false);
        expect(managerApi().hasValidationErrors).toEqual(true);

        change('foo', 'ok');
        jest.advanceTimersByTime(10);
        setImmediate(() => {
          expect(managerApi().getState().errors).toEqual({});
          expect(managerApi().getState().valid).toEqual(true);
          expect(managerApi().getState().invalid).toEqual(false);
          expect(managerApi().getState().validating).toEqual(false);
          expect(managerApi().hasValidationErrors).toEqual(false);
        });
      });
    });

    it('should reset error state when revalidated', () => {
      jest.useFakeTimers();
      const render = jest.fn();
      const managerApi = createManagerApi({ validate: asyncValidate });
      const { registerField, change } = managerApi();

      registerField({ name: 'foo', render });

      change('foo', 'foo');

      jest.advanceTimersByTime(10);
      setImmediate(() => {
        expect(managerApi().getState().errors).toEqual({
          foo: 'error'
        });
        expect(managerApi().getState().valid).toEqual(false);
        expect(managerApi().getState().invalid).toEqual(true);
        expect(managerApi().getState().validating).toEqual(false);
        expect(managerApi().hasValidationErrors).toEqual(true);

        change('foo', 'foo');

        expect(managerApi().getState().errors).toEqual({});
        expect(managerApi().getState().valid).toEqual(true);
        expect(managerApi().getState().invalid).toEqual(false);
        expect(managerApi().getState().validating).toEqual(true);
        expect(managerApi().hasValidationErrors).toEqual(false);

        jest.advanceTimersByTime(10);
        setImmediate(() => {
          expect(managerApi().getState().errors).toEqual({
            foo: 'error'
          });
          expect(managerApi().getState().valid).toEqual(false);
          expect(managerApi().getState().invalid).toEqual(true);
          expect(managerApi().getState().validating).toEqual(false);
          expect(managerApi().hasValidationErrors).toEqual(true);
        });
      });
    });
  });

  describe('Combine form and field level validation', () => {
    const formLevelValidate = (values) => (values.foo === 'foo' ? { foo: 'form-error' } : undefined);
    const fieldLevelValidate = (value) => (value === 'bar' ? 'field-error' : undefined);

    it('should fail sync form level, but pass sync field level validation', () => {
      const managerApi = createManagerApi({ validate: formLevelValidate });
      const { change, registerField, getFieldState } = managerApi();
      const getErrorState = () => {
        let { valid, invalid, validating, errors } = managerApi();
        let {
          meta: { error: fieldError, valid: fieldValid, validating: fieldValidating, invalid: fieldInvalid }
        } = getFieldState('foo');

        return { valid, invalid, validating, errors, fieldError, fieldValid, fieldValidating, fieldInvalid };
      };

      registerField({ name: 'foo', validate: fieldLevelValidate, render: jest.fn() });

      change('foo', 'foo');
      let expectedResult = getErrorState();
      expect(expectedResult).toEqual({
        valid: false,
        invalid: true,
        validating: false,
        errors: { foo: 'form-error' },
        fieldError: 'form-error',
        fieldValid: false,
        fieldInvalid: true,
        fieldValidating: false
      });
    });

    it('should initialy fail sync form level, but pass on second run validation', (done) => {
      const managerApi = createManagerApi({ validate: formLevelValidate });
      const { change, registerField } = managerApi();
      const getErrorState = (api) => {
        let { valid, invalid, validating, errors, getFieldState } = api();
        let {
          meta: { error: fieldError, valid: fieldValid, validating: fieldValidating, invalid: fieldInvalid }
        } = getFieldState('foo');

        return { valid, invalid, validating, errors, fieldError, fieldValid, fieldValidating, fieldInvalid };
      };

      registerField({ name: 'foo', validate: fieldLevelValidate, render: jest.fn() });

      change('foo', 'foo');

      let expectedResult = getErrorState(managerApi);
      expect(expectedResult).toEqual({
        valid: false,
        invalid: true,
        validating: false,
        errors: { foo: 'form-error' },
        fieldError: 'form-error',
        fieldValid: false,
        fieldInvalid: true,
        fieldValidating: false
      });

      change('foo', 'ok');

      setImmediate(() => {
        expectedResult = getErrorState(managerApi);
        expect(expectedResult).toEqual({
          valid: true,
          invalid: false,
          validating: false,
          errors: {},
          fieldError: undefined,
          fieldValid: true,
          fieldInvalid: false,
          fieldValidating: false
        });
        done();
      });
    });

    it('should pass sync form level, but fail sync field level validation', (done) => {
      const managerApi = createManagerApi({ validate: formLevelValidate });
      const { change, registerField, getFieldState } = managerApi();
      const getErrorState = () => {
        let { valid, invalid, validating, errors } = managerApi();
        let {
          meta: { error: fieldError, valid: fieldValid, validating: fieldValidating, invalid: fieldInvalid }
        } = getFieldState('foo');

        return { valid, invalid, validating, errors, fieldError, fieldValid, fieldValidating, fieldInvalid };
      };

      registerField({ name: 'foo', validate: fieldLevelValidate, render: jest.fn() });

      change('foo', 'bar');
      setImmediate(() => {
        let expectedResult = getErrorState();
        expect(expectedResult).toEqual({
          valid: false,
          invalid: true,
          validating: false,
          errors: { foo: 'field-error' },
          fieldError: 'field-error',
          fieldValid: false,
          fieldInvalid: true,
          fieldValidating: false
        });
        done();
      });
    });

    it('should fail first sync field level validation, but pass on second round', (done) => {
      const managerApi = createManagerApi({ validate: formLevelValidate });
      const { change, registerField, getFieldState } = managerApi();
      const getErrorState = () => {
        let { valid, invalid, validating, errors } = managerApi();
        let {
          meta: { error: fieldError, valid: fieldValid, validating: fieldValidating, invalid: fieldInvalid }
        } = getFieldState('foo');

        return { valid, invalid, validating, errors, fieldError, fieldValid, fieldValidating, fieldInvalid };
      };

      registerField({ name: 'foo', validate: fieldLevelValidate, render: jest.fn() });

      change('foo', 'bar');
      setImmediate(() => {
        let expectedResult = getErrorState();
        expect(expectedResult).toEqual({
          valid: false,
          invalid: true,
          validating: false,
          errors: { foo: 'field-error' },
          fieldError: 'field-error',
          fieldValid: false,
          fieldInvalid: true,
          fieldValidating: false
        });

        change('foo', 'ok');
        setImmediate(() => {
          expectedResult = getErrorState();
          expect(expectedResult).toEqual({
            valid: true,
            invalid: false,
            validating: false,
            errors: {},
            fieldError: undefined,
            fieldValid: true,
            fieldInvalid: false,
            fieldValidating: false
          });
          done();
        });
      });
    });
  });

  describe('validation of a field with multiple listeners', () => {
    const syncValidate1 = jest.fn().mockImplementation((value) => (value === 'one' ? 'error-one' : undefined));
    const syncValidate2 = jest.fn().mockImplementation((value) => (value === 'two' ? 'error-two' : undefined));
    const asyncValidate1 = jest
      .fn()
      .mockImplementation((value) => new Promise((res, rej) => setTimeout(() => (value === 'one' ? rej('error-one') : res()), 200)));
    const asyncValidate2 = jest
      .fn()
      .mockImplementation((value) => new Promise((res, rej) => setTimeout(() => (value === 'two' ? rej('error-two') : res()), 200)));

    it('should pass first sync validation but fail second sync validation', (done) => {
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: syncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: syncValidate2, render, internalId: 2 });

      managerApi().change('field', 'two');
      setImmediate(() => {
        expect(managerApi().errors).toEqual({ field: 'error-two' });
        done();
      });
    });

    it('should fail first sync validation but pass second sync validation', (done) => {
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: syncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: syncValidate2, render, internalId: 2 });

      managerApi().change('field', 'one');

      setImmediate(() => {
        expect(managerApi().errors).toEqual({ field: 'error-one' });
        done();
      });
    });

    it('should pass both sync validation', () => {
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: syncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: syncValidate2, render, internalId: 2 });

      managerApi().change('field', 'ok');

      expect(managerApi().errors).toEqual({});
    });

    it('should pass first async validation but fail second async validation', (done) => {
      jest.useFakeTimers();
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: asyncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: asyncValidate2, render, internalId: 2 });
      jest.advanceTimersByTime(200);

      managerApi().change('field', 'two');
      jest.advanceTimersByTime(200);

      setImmediate(() => {
        expect(managerApi().errors).toEqual({ field: 'error-two' });
        done();
      });
    });

    it('should pass both async validation', (done) => {
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: asyncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: asyncValidate2, render, internalId: 2 });
      jest.advanceTimersByTime(200);

      managerApi().change('field', 'ok');
      jest.advanceTimersByTime(200);

      setImmediate(() => {
        expect(managerApi().errors).toEqual({});
        done();
      });
    });

    it('should pass first sync validation but fail second async validation', (done) => {
      jest.useFakeTimers();
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: syncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: asyncValidate2, render, internalId: 2 });
      jest.advanceTimersByTime(200);

      managerApi().change('field', 'two');
      jest.advanceTimersByTime(200);

      setImmediate(() => {
        expect(managerApi().errors).toEqual({ field: 'error-two' });
        done();
      });
    });

    it('should fail sync validation but pass second async validation', (done) => {
      jest.useFakeTimers();
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: syncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: asyncValidate2, render, internalId: 2 });
      jest.advanceTimersByTime(200);
      setImmediate(() => {
        managerApi().change('field', 'one');
        jest.advanceTimersByTime(200);

        setImmediate(() => {
          expect(managerApi().errors).toEqual({ field: 'error-one' });
          done();
        });
      });
    });

    it('should set form.validating when fields are validating', async (done) => {
      expect.assertions(8);
      jest.useFakeTimers();
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: asyncValidate1, render, internalId: 1 });
      managerApi().registerField({ name: 'field', validate: asyncValidate2, render, internalId: 2 });

      expect(managerApi().getFieldState('field').validating).toEqual(true);
      expect(managerApi().getState().validating).toEqual(true);

      jest.runAllTimers();

      setImmediate(() => {
        expect(managerApi().getFieldState('field').validating).toEqual(false);
        expect(managerApi().getState().validating).toEqual(false);

        managerApi().change('field', 'ok');

        expect(managerApi().getFieldState('field').validating).toEqual(true);
        expect(managerApi().getState().validating).toEqual(true);

        jest.runAllTimers();

        setImmediate(() => {
          expect(managerApi().getFieldState('field').validating).toEqual(false);
          expect(managerApi().getState().validating).toEqual(false);
          done();
        });
      });
    });

    it('should reset field.error when validating', async (done) => {
      expect.assertions(8);
      jest.useFakeTimers();
      const render = jest.fn();

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', initialValue: 'one', validate: asyncValidate1, render, internalId: 1 });

      jest.runAllTimers();

      setImmediate(() => {
        expect(managerApi().getFieldState('field').error).toEqual('error-one');
        expect(managerApi().getFieldState('field').valid).toEqual(false);
        expect(managerApi().getFieldState('field').invalid).toEqual(true);

        managerApi().change('field', 'ok');

        expect(managerApi().getFieldState('field').error).toEqual(undefined);
        expect(managerApi().getFieldState('field').valid).toEqual(true);
        expect(managerApi().getFieldState('field').invalid).toEqual(false);

        jest.runAllTimers();

        setImmediate(() => {
          expect(managerApi().getFieldState('field').validating).toEqual(false);
          expect(managerApi().getState().validating).toEqual(false);
          done();
        });
      });
    });
  });

  describe('initialize', () => {
    it('reinitilize form', () => {
      const render = jest.fn();

      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'foo', render });
      managerApi().registerField({ name: 'bar', render });

      managerApi().change('foo', 'foo');
      managerApi().change('bar', 'baz');

      expect(managerApi().pristine).toEqual(false);
      expect(managerApi().values).toEqual({
        foo: 'foo',
        bar: 'baz'
      });
      expect(managerApi().initialValues).toEqual({});

      expect(managerApi().fieldListeners['bar'].state.meta.pristine).toEqual(false);
      expect(managerApi().fieldListeners['bar'].state.meta.dirty).toEqual(true);

      managerApi().initialize({ foo: { bar: 'foobar' }, bar: '123' });

      expect(managerApi().pristine).toEqual(true);
      expect(managerApi().values).toEqual({
        foo: { bar: 'foobar' },
        bar: '123'
      });
      expect(managerApi().initialValues).toEqual({
        foo: { bar: 'foobar' },
        bar: '123'
      });
      expect(managerApi().fieldListeners['bar'].state.meta.pristine).toEqual(true);
      expect(managerApi().fieldListeners['bar'].state.meta.dirty).toEqual(false);
    });

    describe('keepDirtyOnReinitialize', () => {
      it('reinitilize only pristine fields', () => {
        const render = jest.fn();

        const managerApi = createManagerApi({ keepDirtyOnReinitialize: true });

        managerApi().registerField({ name: 'foo.bar', render });
        managerApi().registerField({ name: 'bar', render });
        managerApi().registerField({ name: 'initial', render, initialValue: 'initial value' });

        managerApi().change('foo.bar', 'foo');
        managerApi().change('bar', 'baz');

        expect(managerApi().pristine).toEqual(false);
        expect(managerApi().values).toEqual({
          foo: { bar: 'foo' },
          bar: 'baz',
          initial: 'initial value'
        });
        expect(managerApi().initialValues).toEqual({});

        managerApi().initialize({ foo: { bar: 'foobar' }, initial: 'some_value' });

        expect(managerApi().pristine).toEqual(true);
        expect(managerApi().values).toEqual({
          foo: { bar: 'foo' },
          bar: 'baz',
          initial: 'some_value'
        });
        expect(managerApi().initialValues).toEqual({
          initial: 'some_value',
          foo: { bar: 'foobar' }
        });
      });
    });
  });

  describe('resume/pause validation', () => {
    it('should paused validation', () => {
      const formValidate = jest.fn();
      const fieldValidate = jest.fn();

      const managerApi = createManagerApi({ validate: formValidate });

      expect(managerApi().isValidationPaused()).toEqual(false);

      managerApi().pauseValidation();

      expect(managerApi().isValidationPaused()).toEqual(true);

      managerApi().registerField({ name: '123', validate: fieldValidate, render: jest.fn() });
      managerApi().change('123', 'value');

      expect(formValidate).not.toHaveBeenCalled();
      expect(fieldValidate).not.toHaveBeenCalled();

      managerApi().resumeValidation();
      expect(managerApi().isValidationPaused()).toEqual(false);

      expect(formValidate).toHaveBeenCalled();
      expect(fieldValidate).toHaveBeenCalled();
    });

    it('should rerun only changed field validation after resume', () => {
      const fieldValidateNoRun = jest.fn();
      const fieldValidate = jest.fn();

      const managerApi = createManagerApi({});

      managerApi().registerField({ name: '123', validate: fieldValidate, validateFields: [], render: jest.fn() });
      managerApi().registerField({ name: 'noRun', validate: fieldValidateNoRun, render: jest.fn() });

      // initial validation
      expect(fieldValidate).toHaveBeenCalled();
      expect(fieldValidateNoRun).toHaveBeenCalled();
      fieldValidateNoRun.mockClear();
      fieldValidate.mockClear();

      managerApi().pauseValidation();

      managerApi().change('123', 'value');

      expect(fieldValidate).not.toHaveBeenCalled();
      expect(fieldValidateNoRun).not.toHaveBeenCalled();

      managerApi().resumeValidation();

      expect(fieldValidate).toHaveBeenCalled();
      expect(fieldValidateNoRun).not.toHaveBeenCalled();
    });
  });

  describe('setConfig', () => {
    it('change config attribute', () => {
      const debug = jest.fn();

      const managerApi = createManagerApi({ debug });

      expect(debug.mock.calls.length).toEqual(0);

      managerApi().rerender();

      expect(debug.mock.calls.length).toEqual(1);

      const debugNew = jest.fn();

      managerApi().setConfig('debug', debugNew);

      managerApi().rerender();

      expect(debug.mock.calls.length).toEqual(1);
      expect(debugNew.mock.calls.length).toEqual(1);
    });
  });

  describe('defaultValue', () => {
    it('should set default value when there is no initialValue', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', render: jest.fn(), defaultValue: 'john' });

      expect(managerApi().values).toEqual({
        field: 'john'
      });
      expect(managerApi().initialValues).toEqual({});
      expect(managerApi().dirtyFields).toEqual({
        field: true
      });
      expect(managerApi().pristine).toEqual(false);
      expect(managerApi().dirty).toEqual(true);

      const state = managerApi().getFieldState('field');

      expect(state.pristine).toEqual(false);
      expect(state.dirty).toEqual(true);
    });

    it('should not set default value when there is form.initialValue', () => {
      const managerApi = createManagerApi({ initialValues: { field: 'initial' } });

      managerApi().registerField({ name: 'field', render: jest.fn(), defaultValue: 'john' });

      expect(managerApi().values).toEqual({
        field: 'initial'
      });
      expect(managerApi().initialValues).toEqual({ field: 'initial' });
      expect(managerApi().dirtyFields).toEqual({});
      expect(managerApi().pristine).toEqual(true);
      expect(managerApi().dirty).toEqual(false);

      const state = managerApi().getFieldState('field');

      expect(state.pristine).toEqual(true);
      expect(state.dirty).toEqual(false);
    });

    it('should not set default value when there is field.initialValue', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', render: jest.fn(), defaultValue: 'john', initialValue: 'initial' });

      expect(managerApi().values).toEqual({
        field: 'initial'
      });
      expect(managerApi().initialValues).toEqual({});
      expect(managerApi().dirtyFields).toEqual({});
      expect(managerApi().pristine).toEqual(true);
      expect(managerApi().dirty).toEqual(false);

      const state = managerApi().getFieldState('field');

      expect(state.pristine).toEqual(true);
      expect(state.dirty).toEqual(false);
    });
  });

  describe('data', () => {
    it('registers sets data and merges them together', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', render: jest.fn(), data: { a: 'b', b: { c: 'y' } } });
      managerApi().registerField({ name: 'field', render: jest.fn(), data: { a: 'abc', b: { d: 'zz' } } });

      expect(managerApi().getFieldState('field').meta.data).toEqual({
        a: 'abc',
        b: { c: 'y', d: 'zz' }
      });
    });
  });

  describe('after & before submit', () => {
    it('calls after submit', () => {
      const onSubmit = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      const afterSubmit1 = jest.fn();
      const afterSubmit2 = jest.fn();
      const afterSubmit3 = jest.fn();

      managerApi().registerField({ name: 'field', internalId: '1', render: jest.fn(), afterSubmit: afterSubmit1 });
      managerApi().registerField({ name: 'field', internalId: '2', render: jest.fn(), afterSubmit: afterSubmit2 });
      managerApi().registerField({ name: 'field2', render: jest.fn(), afterSubmit: afterSubmit3 });

      expect(afterSubmit1).not.toHaveBeenCalled();
      expect(afterSubmit2).not.toHaveBeenCalled();
      expect(afterSubmit3).not.toHaveBeenCalled();

      managerApi().submit();

      expect(afterSubmit1).toHaveBeenCalled();
      expect(afterSubmit2).toHaveBeenCalled();
      expect(afterSubmit3).toHaveBeenCalled();
    });

    it('calls before submit', () => {
      const onSubmit = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      const beforeSubmit1 = jest.fn();
      const beforeSubmit2 = jest.fn();
      const beforeSubmit3 = jest.fn();

      managerApi().registerField({ name: 'field', internalId: '1', render: jest.fn(), beforeSubmit: beforeSubmit1 });
      managerApi().registerField({ name: 'field', internalId: '2', render: jest.fn(), beforeSubmit: beforeSubmit2 });
      managerApi().registerField({ name: 'field2', render: jest.fn(), beforeSubmit: beforeSubmit3 });

      expect(beforeSubmit1).not.toHaveBeenCalled();
      expect(beforeSubmit2).not.toHaveBeenCalled();
      expect(beforeSubmit3).not.toHaveBeenCalled();

      managerApi().submit();

      expect(beforeSubmit1).toHaveBeenCalled();
      expect(beforeSubmit2).toHaveBeenCalled();
      expect(beforeSubmit3).toHaveBeenCalled();

      expect(onSubmit).toHaveBeenCalled();
    });

    it('bails out on before submit returning false', () => {
      const onSubmit = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      const beforeSubmit1 = jest.fn();
      const beforeSubmit2 = jest.fn().mockImplementation(() => false);
      const beforeSubmit3 = jest.fn();

      managerApi().registerField({ name: 'field', internalId: '1', render: jest.fn(), beforeSubmit: beforeSubmit1 });
      managerApi().registerField({ name: 'field', internalId: '2', render: jest.fn(), beforeSubmit: beforeSubmit2 });
      managerApi().registerField({ name: 'field2', render: jest.fn(), beforeSubmit: beforeSubmit3 });

      expect(beforeSubmit1).not.toHaveBeenCalled();
      expect(beforeSubmit2).not.toHaveBeenCalled();
      expect(beforeSubmit3).not.toHaveBeenCalled();

      managerApi().submit();

      expect(beforeSubmit1).toHaveBeenCalled();
      expect(beforeSubmit2).toHaveBeenCalled();
      expect(beforeSubmit3).not.toHaveBeenCalled();

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('async submit', () => {
    it('calls async submit', async () => {
      jest.useFakeTimers();

      const onSubmit = jest.fn().mockImplementation(() => new Promise((res) => setTimeout(() => res(), 1000)));
      const render = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      managerApi().registerField({ name: 'field', internalId: '1', render });

      expect(managerApi().submitting).toEqual(false);
      expect(render).not.toHaveBeenCalled();

      managerApi().submit();

      expect(render).toHaveBeenCalled();
      render.mockClear();
      expect(managerApi().submitting).toEqual(true);

      await jest.runAllTimers();

      expect(render).toHaveBeenCalled();
      expect(managerApi().submitting).toEqual(false);
      expect(managerApi().submitError).toEqual(undefined);
      expect(managerApi().submitFailed).toEqual(false);
      expect(managerApi().submitSucceeded).toEqual(true);
      expect(managerApi().submitErrors).toEqual(undefined);
      expect(managerApi().hasSubmitErrors).toEqual(false);
    });

    it('calls async submit - submit fails on catch (i.e. network error), return to normal', async () => {
      jest.useFakeTimers();

      const onSubmit = jest.fn().mockImplementation(() => new Promise((res, rej) => setTimeout(() => rej(), 1000)));
      const render = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      managerApi().registerField({ name: 'field', internalId: '1', render });

      expect(managerApi().submitting).toEqual(false);
      expect(render).not.toHaveBeenCalled();

      managerApi().submit();

      expect(render).toHaveBeenCalled();
      render.mockClear();
      expect(managerApi().submitting).toEqual(true);

      await jest.runAllTimers();
      await jest.runAllTimers(); // catch needs to be run 2x

      expect(render).toHaveBeenCalled();
      expect(managerApi().submitting).toEqual(false);
      expect(managerApi().submitError).toEqual(undefined);
      expect(managerApi().submitFailed).toEqual(false);
      expect(managerApi().submitSucceeded).toEqual(true);
      expect(managerApi().submitErrors).toEqual(undefined);
      expect(managerApi().hasSubmitErrors).toEqual(false);
    });

    it('calls async submit - failed', async () => {
      jest.useFakeTimers();

      const error = 'some evil error';

      const onSubmit = jest.fn().mockImplementation(() => new Promise((res) => setTimeout(() => res(error), 100)));
      const render = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      managerApi().registerField({ name: 'field', internalId: '1', render });

      expect(managerApi().submitting).toEqual(false);
      expect(render).not.toHaveBeenCalled();

      managerApi().submit();

      expect(render).toHaveBeenCalled();
      render.mockClear();

      expect(managerApi().submitting).toEqual(true);

      await jest.runAllTimers();

      expect(render).toHaveBeenCalled();
      expect(managerApi().submitError).toEqual(undefined);
      expect(managerApi().submitting).toEqual(false);
      expect(managerApi().submitFailed).toEqual(true);
      expect(managerApi().submitSucceeded).toEqual(false);
      expect(managerApi().submitErrors).toEqual(error);
      expect(managerApi().hasSubmitErrors).toEqual(true);
    });

    it('calls async submit - failed with form level', async () => {
      jest.useFakeTimers();

      const error = { [FORM_ERROR]: 'some evil error' };

      const onSubmit = jest.fn().mockImplementation(() => new Promise((res) => setTimeout(() => res(error), 100)));
      const render = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      managerApi().registerField({ name: 'field', internalId: '1', render });

      expect(managerApi().submitting).toEqual(false);
      expect(render).not.toHaveBeenCalled();

      managerApi().submit();

      expect(render).toHaveBeenCalled();
      render.mockClear();

      expect(managerApi().submitting).toEqual(true);

      await jest.runAllTimers();

      expect(render).toHaveBeenCalled();
      expect(managerApi().submitError).toEqual('some evil error');
      expect(managerApi().submitting).toEqual(false);
      expect(managerApi().submitFailed).toEqual(true);
      expect(managerApi().submitSucceeded).toEqual(false);
      expect(managerApi().submitErrors).toEqual(error);
      expect(managerApi().hasSubmitErrors).toEqual(true);
    });

    it('calls async submit - failed - set async error on field', async () => {
      jest.useFakeTimers();

      const error = { nested: { field: 'some evil error' } };

      const onSubmit = jest.fn().mockImplementation(() => new Promise((res) => setTimeout(() => res(error), 100)));
      const render = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      managerApi().registerField({ name: 'nested.field', internalId: '1', render });

      expect(managerApi().submitting).toEqual(false);
      expect(render).not.toHaveBeenCalled();

      managerApi().submit();

      expect(render).toHaveBeenCalled();
      render.mockClear();

      expect(managerApi().getFieldState('nested.field').submitting).toEqual(true);
      expect(managerApi().submitting).toEqual(true);

      await jest.runAllTimers();

      expect(render).toHaveBeenCalled();
      expect(managerApi().submitError).toEqual(undefined);
      expect(managerApi().submitting).toEqual(false);
      expect(managerApi().submitFailed).toEqual(true);
      expect(managerApi().submitSucceeded).toEqual(false);
      expect(managerApi().submitErrors).toEqual(error);
      expect(managerApi().hasSubmitErrors).toEqual(true);
      expect(focusErrorSpy).toHaveBeenCalledWith({ 'nested.field': 'some evil error' }, undefined);

      expect(managerApi().getFieldState('nested.field').submitError).toEqual('some evil error');
      expect(managerApi().getFieldState('nested.field').submitting).toEqual(false);
      expect(managerApi().getFieldState('nested.field').submitFailed).toEqual(true);
      expect(managerApi().getFieldState('nested.field').submitSucceeded).toEqual(false);
    });
  });

  describe('warning validation', () => {
    const someError = 'some error message';
    const render = jest.fn();

    it('should save type: warning as warning - sync', () => {
      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: () => ({ type: 'warning', error: someError }), render, internalId: 1 });

      expect(managerApi().getFieldState('field').meta.warning).toEqual(someError);
      expect(managerApi().getFieldState('field').meta.error).toEqual(undefined);
    });

    it('warning should rewrite error - sync', () => {
      const managerApi = createManagerApi({});
      managerApi().registerField({
        name: 'field',
        initialValue: 'warning',
        validate: (value) => (value === 'warning' ? { type: 'warning', error: someError } : 'error'),
        render,
        internalId: 1
      });

      expect(managerApi().getFieldState('field').meta.warning).toEqual(someError);
      expect(managerApi().getFieldState('field').meta.error).toEqual(undefined);
      expect(managerApi().getFieldState('field').meta.valid).toEqual(true);
      expect(managerApi().getFieldState('field').meta.invalid).toEqual(false);

      managerApi().change('field', 'error');

      expect(managerApi().getFieldState('field').meta.warning).toEqual(undefined);
      expect(managerApi().getFieldState('field').meta.error).toEqual('error');
      expect(managerApi().getFieldState('field').meta.valid).toEqual(false);
      expect(managerApi().getFieldState('field').meta.invalid).toEqual(true);

      managerApi().change('field', 'warning');

      expect(managerApi().getFieldState('field').meta.warning).toEqual(someError);
      expect(managerApi().getFieldState('field').meta.error).toEqual(undefined);
      expect(managerApi().getFieldState('field').meta.valid).toEqual(true);
      expect(managerApi().getFieldState('field').meta.invalid).toEqual(false);
    });

    it('should save type: warning as warning - async', (done) => {
      expect.assertions(2);

      const asyncValidate = jest.fn().mockImplementation(() => Promise.reject({ type: 'warning', error: someError }));

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', validate: asyncValidate, render, internalId: 1 });

      setImmediate(() => {
        expect(managerApi().getFieldState('field').meta.warning).toEqual(someError);
        expect(managerApi().getFieldState('field').meta.error).toEqual(undefined);
        done();
      });
    });

    it('warning should rewrite error - async', (done) => {
      expect.assertions(18);

      const asyncValidate = jest
        .fn()
        .mockImplementation((value) => Promise.reject(value === 'warning' ? { type: 'warning', error: someError } : 'error'));

      const managerApi = createManagerApi({});
      managerApi().registerField({ name: 'field', initialValue: 'warning', validate: asyncValidate, render, internalId: 1 });

      expect(managerApi().getFieldState('field').meta.validating).toEqual(true);

      setImmediate(() => {
        expect(managerApi().getFieldState('field').meta.warning).toEqual(someError);
        expect(managerApi().getFieldState('field').meta.error).toEqual(undefined);
        expect(managerApi().getFieldState('field').meta.valid).toEqual(true);
        expect(managerApi().getFieldState('field').meta.invalid).toEqual(false);
        expect(managerApi().getFieldState('field').meta.validating).toEqual(false);

        managerApi().change('field', 'error');

        expect(managerApi().getFieldState('field').meta.validating).toEqual(true);

        setImmediate(() => {
          expect(managerApi().getFieldState('field').meta.warning).toEqual(undefined);
          expect(managerApi().getFieldState('field').meta.error).toEqual('error');
          expect(managerApi().getFieldState('field').meta.valid).toEqual(false);
          expect(managerApi().getFieldState('field').meta.invalid).toEqual(true);
          expect(managerApi().getFieldState('field').meta.validating).toEqual(false);

          managerApi().change('field', 'warning');

          expect(managerApi().getFieldState('field').meta.validating).toEqual(true);

          setImmediate(() => {
            expect(managerApi().getFieldState('field').meta.warning).toEqual(someError);
            expect(managerApi().getFieldState('field').meta.error).toEqual(undefined);
            expect(managerApi().getFieldState('field').meta.valid).toEqual(true);
            expect(managerApi().getFieldState('field').meta.invalid).toEqual(false);
            expect(managerApi().getFieldState('field').meta.validating).toEqual(false);
            done();
          });
        });
      });
    });
  });

  describe('invalid submit', () => {
    it('should not call submit action when invalid + all fields are touched', () => {
      const onSubmit = jest.fn();

      const managerApi = createManagerApi({ onSubmit });

      managerApi().registerField({ name: 'field', validate: () => 'error', render: jest.fn(), internalId: 1 });
      managerApi().registerField({ name: 'field2', render: jest.fn(), internalId: 1 });

      expect(managerApi().getFieldState('field').touched).toEqual(false);
      expect(managerApi().getFieldState('field').touched).toEqual(false);
      expect(focusErrorSpy).not.toHaveBeenCalled();

      managerApi().handleSubmit();

      expect(focusErrorSpy).toHaveBeenCalledWith({ field: 'error' }, undefined);
      expect(managerApi().getFieldState('field').touched).toEqual(true);
      expect(managerApi().getFieldState('field').touched).toEqual(true);

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not call submit action when invalid + all fields are touched - named field', () => {
      const onSubmit = jest.fn();
      const name = 'form-name';

      const managerApi = createManagerApi({ onSubmit, name });

      managerApi().registerField({ name: 'field', validate: () => 'error', render: jest.fn(), internalId: 1 });
      managerApi().registerField({ name: 'field2', render: jest.fn(), internalId: 1 });

      expect(focusErrorSpy).not.toHaveBeenCalled();

      managerApi().handleSubmit();

      expect(focusErrorSpy).toHaveBeenCalledWith({ field: 'error' }, name);
    });
  });

  it('set form dirty and pristine according to fields', () => {
    const onSubmit = jest.fn();

    const managerApi = createManagerApi({ onSubmit });

    managerApi().registerField({ name: 'field', render: jest.fn(), internalId: 1 });
    managerApi().registerField({ name: 'field2', render: jest.fn(), internalId: 1, initialValue: 'initial' });

    expect(managerApi().getState().pristine).toEqual(true);
    expect(managerApi().getState().dirty).toEqual(false);

    managerApi().change('field', 'foo');

    expect(managerApi().getState().pristine).toEqual(false);
    expect(managerApi().getState().dirty).toEqual(true);

    managerApi().change('field2', 'initial-123');

    expect(managerApi().getState().pristine).toEqual(false);
    expect(managerApi().getState().dirty).toEqual(true);

    managerApi().change('field', undefined);

    expect(managerApi().getState().pristine).toEqual(false);
    expect(managerApi().getState().dirty).toEqual(true);

    managerApi().change('field2', 'initial');

    expect(managerApi().getState().pristine).toEqual(true);
    expect(managerApi().getState().dirty).toEqual(false);
  });

  describe('fileInput', () => {
    const managerApi = createManagerApi({ onSubmit: jest.fn() });

    expect(managerApi().fileInputs).toEqual([]);

    managerApi().registerInputFile('name');

    expect(managerApi().fileInputs).toEqual(['name']);

    managerApi().registerInputFile('name');

    expect(managerApi().fileInputs).toEqual(['name', 'name']);

    managerApi().unregisterInputFile('name');

    expect(managerApi().fileInputs).toEqual(['name']);

    managerApi().unregisterInputFile('name');

    expect(managerApi().fileInputs).toEqual([]);
  });
});
