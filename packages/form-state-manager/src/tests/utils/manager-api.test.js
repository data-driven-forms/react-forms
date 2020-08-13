import createManagerApi from '../../utils/manager-api';

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
    expect(managerApi().dirtyFields).toEqual(['foo']);
    expect(managerApi().dirtyFieldsSinceLastSubmit).toEqual(['foo']);
    expect(managerApi().pristine).toEqual(false);

    managerApi().change('foo', 'bar');
    expect(managerApi().dirtyFields).toEqual(['foo']);
    expect(managerApi().dirtyFieldsSinceLastSubmit).toEqual(['foo']);
  });

  it('should change different api instance separatelly', () => {
    const firstManagerApi = createManagerApi({});
    const secondManagerApi = createManagerApi({});
    firstManagerApi().change('foo', 'bar');
    secondManagerApi().change('baz', 'quazz');
    expect(firstManagerApi().values).toEqual({ foo: 'bar' });
    expect(secondManagerApi().values).toEqual({ baz: 'quazz' });
  });

  it('should registerField', () => {
    const managerApi = createManagerApi({});

    const render = jest.fn();
    const internalId = Date.now();

    managerApi().registerField({ name: 'field', render, internalId });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({ field: { count: 1, fields: { [internalId]: { render, subscription: undefined } } } });
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
        count: 2,
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
        count: 2,
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
        count: 1,
        fields: {
          [internalId1]: { render: render1, subscription: subscription1 }
        }
      }
    });
    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field', internalId: internalId1 });

    expect(managerApi().fieldListeners).toEqual({});
    expect(managerApi().registeredFields).toEqual([]);
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
      baz: 'quazz',
      meta: { pristine: true }
    };
    const managerApi = createManagerApi({});
    const { registerField } = managerApi();
    registerField({
      name: 'field',
      state: {
        value: { foo: 'bar' },
        baz: 'quazz',
        meta: { pristine: true }
      }
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
  });
});
