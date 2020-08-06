import createManagerApi from '../../utils/manager-api';

describe('managerApi', () => {
  it('should create managerApi getter', () => {
    const managerApi = createManagerApi();
    expect(managerApi).toEqual(expect.any(Function));
  });

  it('should change the managerApi state', () => {
    const managerApi = createManagerApi();
    managerApi().change('foo', 'bar');

    expect(managerApi().values).toEqual({ foo: 'bar' });
    expect(managerApi().visited).toEqual({ foo: true });
    expect(managerApi().modified).toEqual({ foo: true });
    expect(managerApi().modifiedSinceLastSubmit).toEqual(true);
    expect(managerApi().dirtySinceLastSubmit).toEqual(true);
    expect(managerApi().dirtyFields).toEqual(['foo']);
    expect(managerApi().pristine).toEqual(false);
  });

  it('should change different api instance separatelly', () => {
    const firstManagerApi = createManagerApi();
    const secondManagerApi = createManagerApi();
    firstManagerApi().change('foo', 'bar');
    secondManagerApi().change('baz', 'quazz');
    expect(firstManagerApi().values).toEqual({ foo: 'bar' });
    expect(secondManagerApi().values).toEqual({ baz: 'quazz' });
  });

  it('should registerField', () => {
    const getFieldState = jest.fn();

    const managerApi = createManagerApi();

    managerApi().registerField({ name: 'field', getFieldState });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({ field: { count: 1, getFieldState } });
  });

  it('should registerField 2x', () => {
    const getFieldState = jest.fn();

    const managerApi = createManagerApi();

    managerApi().registerField({ name: 'field', getFieldState });
    managerApi().registerField({ name: 'field', getFieldState });

    expect(managerApi().registeredFields).toEqual(['field']);
    expect(managerApi().fieldListeners).toEqual({ field: { count: 2, getFieldState } });
  });

  it('should unregisterField', () => {
    const managerApi = createManagerApi();

    managerApi().registerField({ name: 'field' });

    expect(managerApi().registeredFields).toEqual(['field']);

    managerApi().unregisterField({ name: 'field' });

    expect(managerApi().registeredFields).toEqual([]);
  });

  it('should unregisterField multiple times last', () => {
    const managerApi = createManagerApi();

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
    const managerApi = createManagerApi(onSubmit);
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
});
