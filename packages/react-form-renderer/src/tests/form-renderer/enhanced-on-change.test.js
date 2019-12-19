import enhancedOnChange from '../../form-renderer/enhanced-on-change';

describe('#enhancedOnChange', () => {
  const deletedValue = 'this is deleted value';
  const initialValue = 'some initial value';
  it('should return value directly if event is not passed', () => {
    const value = 'foo';
    expect(enhancedOnChange(undefined, value => value, undefined, deletedValue, value)).toEqual('foo');
  });

  it('should return value from event if input is of type checkbox', () => {
    const value = {
      target: {
        type: 'checkbox',
        value: 'not me',
        checked: false,
      },
    };
    expect(enhancedOnChange(undefined, value => value, undefined, deletedValue, value)).toEqual(false);
  });

  it('should return value from event', () => {
    const value = {
      target: {
        value: 'Me',
        checked: 'not me',
      },
    };
    expect(enhancedOnChange(undefined, value => value, undefined, deletedValue, value)).toEqual('Me');
  });

  it('should correctly convert array datatype from strings to integers', () => {
    const value = [ '1', '2', 3 ];
    expect(enhancedOnChange('integer', value => value, undefined, deletedValue, value)).toEqual([ 1, 2, 3 ]);
  });

  describe('#setting delete value', () => {
    it('should not set any delete value after sending empty value', () => {
      const value = undefined;
      expect(enhancedOnChange(undefined, value => value, undefined, deletedValue, value)).toEqual(undefined);
    });

    it('should set delete value after sending empty string value', () => {
      const value = undefined;
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, value)).toEqual(deletedValue);
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, '')).toEqual(deletedValue);
    });

    it('should not set delete value after sending number 0', () => {
      const value = 0;
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, value)).toEqual(value);
    });

    it('should set delete value after sending empty array', () => {
      const value = [];
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, value)).toEqual(deletedValue);
    });

    it('should set delete value after sending empty object', () => {
      const value = {};
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, value)).toEqual(deletedValue);
    });

    it('should not set delete value after sending array', () => {
      const value = [ 1, 2, 'foo' ];
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, value)).toEqual(value);
    });

    it('should not set delete value after sending object', () => {
      const value = { foo: 'bar' };
      expect(enhancedOnChange(undefined, value => value, initialValue, deletedValue, value)).toEqual(value);
    });
  });
});
