import messages from '../../validators/messages';

describe('validator messages', () => {
  const getMessage = ({ defaultMessage }) => typeof defaultMessage === 'function' ? defaultMessage(5) : defaultMessage;

  it('even', () => {
    expect(getMessage(messages.even)).toEqual('Number must be even');
  });

  it('equalTo', () => {
    expect(getMessage(messages.equalTo)).toEqual('must be equal to 5.');
  });

  it('greaterThan', () => {
    expect(getMessage(messages.greaterThan)).toEqual('Value must be greater than 5.');
  });

  it('greaterThanOrEqualTo', () => {
    expect(getMessage(messages.greaterThanOrEqualTo)).toEqual('Value must be greater than or equal to 5.');
  });

  it('lessThan', () => {
    expect(getMessage(messages.lessThan)).toEqual('Value must be less than 5');
  });

  it('lessThanOrEqualTo', () => {
    expect(getMessage(messages.lessThanOrEqualTo)).toEqual('Value must be less than or equal to 5');
  });

  it('mustBeBool', () => {
    expect(getMessage(messages.mustBeBool)).toEqual('Value must be boolean.');
  });

  it('mustBeString', () => {
    expect(getMessage(messages.mustBeString)).toEqual('Value must be a string');
  });

  it('notANumber', () => {
    expect(getMessage(messages.notANumber)).toEqual('Value is not a number');
  });

  it('odd', () => {
    expect(getMessage(messages.odd)).toEqual('Number must be odd');
  });

  it('otherThan', () => {
    expect(getMessage(messages.otherThan)).toEqual('Value must be other than 5.');
  });

  it('pattern', () => {
    expect(getMessage(messages.pattern)).toEqual('Value does not match pattern: 5.');
  });

  it('required', () => {
    expect(getMessage(messages.required)).toEqual('Required');
  });

  it('tooLong', () => {
    expect(getMessage(messages.tooLong)).toEqual('Can have maximum of 5 characters.');
  });

  it('tooShort', () => {
    expect(getMessage(messages.tooShort)).toEqual('Must have at least 5 characters.');
  });

  it('wrongLength', () => {
    expect(getMessage(messages.wrongLength)).toEqual('Should be 5 characters long.');
  });
});
