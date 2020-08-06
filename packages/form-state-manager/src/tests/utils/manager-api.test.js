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
});
