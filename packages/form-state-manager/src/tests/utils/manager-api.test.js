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
});
