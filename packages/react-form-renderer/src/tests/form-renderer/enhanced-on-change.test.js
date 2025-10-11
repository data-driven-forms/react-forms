import enhancedOnChange from '../../use-field-api/enhanced-on-change';

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
        checked: false,
      },
    };
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(value);
  });

  it('should return value from event', () => {
    const value = {
      target: {
        value: 'Me',
        checked: 'not me',
      },
    };
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual('Me');
  });

  it('should return boolean events correctly with initialValue set', () => {
    const initial = false;
    const valueFalse = {
      target: {
        checked: false,
        type: 'checkbox',
      },
    };
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, valueFalse)).toEqual(valueFalse);

    const valueTrue = {
      target: {
        checked: true,
        type: 'checkbox',
      },
    };
    expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, valueTrue)).toEqual(valueTrue);
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
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(clearedValue);
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, '')).toEqual(clearedValue);
    });

    it('should not set delete value after sending date', () => {
      const value = new Date(2021, 7, 20);
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(value);
    });

    it('should not set delete value after sending number 0', () => {
      const value = 0;
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(value);
    });

    it('should set delete value after sending empty array', () => {
      const value = [];
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(clearedValue);
    });

    it('should set delete value after sending empty object', () => {
      const value = {};
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(clearedValue);
    });

    it('should not set delete value after sending array', () => {
      const value = [1, 2, 'foo'];
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(value);
    });

    it('should not set delete value after sending object', () => {
      const value = { foo: 'bar' };
      expect(enhancedOnChange({ onChange: (value) => value, clearedValue }, value)).toEqual(value);
    });
    it('should keep empty string when clearedValue is empty string', () => {
      const clearedValue = '';
      const value = undefined;
      const onChange = jest.fn();
      enhancedOnChange({ onChange, clearedValue }, value);
      expect(onChange).toHaveBeenCalledWith('');
    });

  });

  describe('#input type file', () => {
    it('should return an object with inputValue and inputFiles keys', () => {
      const value = { target: { value: 'fakepath/file.foo', files: [], type: 'file' } };
      const expectedValue = {
        inputValue: 'fakepath/file.foo',
        inputFiles: [],
      };
      expect(enhancedOnChange({ onChange: (value) => value }, value)).toEqual(expectedValue);
    });
  });
});
