import createManagerApi from '../../utils/manager-api';

describe('managerApi', () => {
  it('should create managerApi getter', () => {
    const managerApi = createManagerApi({});
    expect(managerApi).toEqual(expect.any(Function));
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

    managerApi().registerField({ name: 'field' });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({ field: { count: 1 } });
  });

  it('should registerField 2x', () => {
    const managerApi = createManagerApi({});

    managerApi().registerField({ name: 'field' });
    managerApi().registerField({ name: 'field' });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({ field: { count: 2 } });
  });

  it('should unregisterField', () => {
    const managerApi = createManagerApi({});

    managerApi().registerField({ name: 'field' });

    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field' });

    expect(managerApi().registeredFields).toEqual([]);
  });

  it('should unregisterField multiple times last', () => {
    const managerApi = createManagerApi({});

    managerApi().registerField({ name: 'field' });
    managerApi().registerField({ name: 'field' });

    expect(managerApi().fieldListeners).toEqual({ field: { count: 2 } });
    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field' });

    expect(managerApi().fieldListeners).toEqual({ field: { count: 1 } });
    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field' });

    expect(managerApi().fieldListeners).toEqual({});
    expect(managerApi().registeredFields).toEqual([]);
  });

  describe('clearOnUnmount', () => {
    it('should clear on form level', () => {
      const managerApi = createManagerApi({ clearOnUnmount: true });

      managerApi().registerField({ name: 'field' });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field' });

      expect(managerApi().values).toEqual({ field: undefined });
    });

    it('should clear on field level', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field' });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field', clearOnUnmount: true });

      expect(managerApi().values).toEqual({ field: undefined });
    });

    it('should override form level by field', () => {
      const managerApi = createManagerApi({ clearOnUnmount: true });

      managerApi().registerField({ name: 'field' });
      managerApi().change('field', 'value');

      expect(managerApi().values).toEqual({ field: 'value' });

      managerApi().unregisterField({ name: 'field', clearOnUnmount: false });

      expect(managerApi().values).toEqual({ field: 'value' });
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
    registerField({ name: 'field' });
    registerField({ name: 'nested.name' });
    registerField({ name: 'nested.age' });
    registerField({ name: 'array[0].name' });
    registerField({ name: 'array[0].age' });

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
      getFieldState: () => ({
        value: { foo: 'bar' },
        baz: 'quazz',
        meta: { pristine: true }
      })
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
    it.skip('should initialize on form level using initialValues', () => {
      const managerApi = createManagerApi({ initializeOnMount: true, initialValues: { field: 'second' } });

      managerApi().registerField({ name: 'field', value: 'first' });
      managerApi().registerField({ name: 'field' });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should initialize on form level', () => {
      const managerApi = createManagerApi({ initializeOnMount: true });

      managerApi().registerField({ name: 'field', value: 'first' });
      managerApi().registerField({ name: 'field', value: 'second' });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should initialize on field level', () => {
      const managerApi = createManagerApi({});

      managerApi().registerField({ name: 'field', value: 'first' });
      managerApi().registerField({ name: 'field', value: 'second', initializeOnMount: true });

      expect(managerApi().values).toEqual({ field: 'second' });
    });

    it('should override form level by field', () => {
      const managerApi = createManagerApi({ initializeOnMount: true });

      managerApi().registerField({ name: 'field', value: 'first' });
      managerApi().registerField({ name: 'field', value: 'second', initializeOnMount: false });

      expect(managerApi().values).toEqual({ field: 'first' });
    });
  });
});
