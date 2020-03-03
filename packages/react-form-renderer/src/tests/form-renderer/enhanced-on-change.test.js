import enhancedOnChange from '../../form-renderer/enhanced-on-change';

describe('#enhancedOnChange', () => {
  const clearedValue = 'this is deleted value';
  const initial = 'some initial value';
  it('should return value directly if event is not passed', () => {
    const value = 'foo';
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual('foo');
  });

  it('should return event if input is of type checkbox', () => {
    const value = {
      target: {
        type: 'checkbox',
        value: 'not me',
        checked: false
      }
    };
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(value);
  });

  it('should return value from event', () => {
    const value = {
      target: {
        value: 'Me',
        checked: 'not me'
      }
    };
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual('Me');
  });

  it('should correctly convert array datatype from strings to integers', () => {
    const value = ['1', '2', 3];
    expect(enhancedOnChange({ dataType: 'integer', onChange: (value) => value, clearedValue }, value)).toEqual([1, 2, 3]);
  });

  describe('#setting cleared value', () => {
    it('should not set any delete value after sending empty value', () => {
      const value = undefined;
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(undefined);
    });

    it('should set delete value after sending empty string value', () => {
      const value = undefined;
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, value)).toEqual(clearedValue);
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, '')).toEqual(clearedValue);
    });

    it('should not set delete value after sending number 0', () => {
      const value = 0;
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, value)).toEqual(value);
    });

    it('should set delete value after sending empty array', () => {
      const value = [];
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, value)).toEqual(clearedValue);
    });

    it('should set delete value after sending empty object', () => {
      const value = {};
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, value)).toEqual(clearedValue);
    });

    it('should not set delete value after sending array', () => {
      const value = [1, 2, 'foo'];
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, value)).toEqual(value);
    });

    it('should not set delete value after sending object', () => {
      const value = { foo: 'bar' };
      expect(enhancedOnChange({ onChange: (value) => value, initial, clearedValue }, value)).toEqual(value);
    });
  });
});
