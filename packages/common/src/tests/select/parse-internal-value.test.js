import { parseInternalValue } from '../../select';

describe('parseInternalValue', () => {
  let value;
  let isMulti;

  it('single', () => {
    value = 'cats';
    isMulti = undefined;
    expect(parseInternalValue(value, isMulti)).toEqual('cats');
  });

  it('multi and array', () => {
    value = ['cats', { value: 'dogs' }];
    isMulti = true;
    expect(parseInternalValue(value, isMulti)).toEqual(['cats', 'dogs']);
  });

  it('single and array', () => {
    value = ['cats', { value: 'dogs' }];
    isMulti = false;
    expect(parseInternalValue(value, isMulti)).toEqual('cats');
  });

  it('single and array - object', () => {
    value = [{ value: 'dogs' }];
    isMulti = false;
    expect(parseInternalValue(value, isMulti)).toEqual('dogs');
  });

  it('single and undefined', () => {
    value = [];
    isMulti = false;
    expect(parseInternalValue(value, isMulti)).toEqual(undefined);
  });
});
