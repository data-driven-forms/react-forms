import enhancedOnChange from '../../form-renderer/enhanced-on-change';

describe('#enhancedOnChange', () => {
  it('should return value directly if event is not passed', () => {
    const value = 'foo';
    expect(enhancedOnChange(undefined, value => value, value)).toEqual('foo');
  });

  it('should return value from event if input is of type checkbox', () => {
    const value = {
      target: {
        type: 'checkbox',
        value: 'not me',
        checked: false,
      },
    };
    expect(enhancedOnChange(undefined, value => value, value)).toEqual(false);
  });

  it('should return value from event', () => {
    const value = {
      target: {
        value: 'Me',
        checked: 'not me',
      },
    };
    expect(enhancedOnChange(undefined, value => value, value)).toEqual('Me');
  });
});
