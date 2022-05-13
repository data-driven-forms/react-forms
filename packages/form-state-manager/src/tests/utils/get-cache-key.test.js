import getCacheKey from '../../get-cache-key';

describe('getCacheKey', () => {
  it('should throw an error if invalid argument is passed', () => {
    expect(() => getCacheKey(Symbol(''))).toThrowError('Cannot convert a Symbol value to a string');
  });

  it('should convert object properties to string', () => {
    const obj = { a: { b: { c: 'foo' } }, d: 'bar' };
    expect(getCacheKey(obj)).toEqual('abcfoodbar');
  });

  it('should convert array with nested objects to string', () => {
    const arr = [{ a: { b: 'foo' } }, 123, true, 'bar'];
    expect(getCacheKey(arr)).toEqual('0abfoo11232true3bar');
  });

  it('should use string as key', () => {
    expect(getCacheKey('foo')).toEqual('foo');
  });

  it('should use convert number to string', () => {
    expect(getCacheKey(123)).toEqual('123');
  });

  it('should use convert boolean to string', () => {
    expect(getCacheKey(false)).toEqual('false');
  });

  it('should use null value as "null" string', () => {
    expect(getCacheKey(null)).toEqual('null');
  });

  it('should use undefined value as "undefined" string', () => {
    expect(getCacheKey(undefined)).toEqual('undefined');
  });
});
