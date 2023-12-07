import getConditionTriggers from '../../get-condition-triggers';

describe('getConditionTriggers', () => {
  test('should extract name from simple when definition', () => {
    expect(getConditionTriggers({ when: 'a' })).toEqual(['a']);
  });

  test('should extract name from simple when array definition', () => {
    expect(getConditionTriggers({ when: ['a', 'b'] })).toEqual(['a', 'b']);
  });

  test('should extract name from simple when function definition', () => {
    expect(getConditionTriggers({ when: () => 'a' })).toEqual(['a']);
  });

  test('should extract name from combined when array definition', () => {
    expect(getConditionTriggers({ when: ['a', () => 'b'] })).toEqual(['a', 'b']);
  });

  test('should extract name from combined when array definition if functions returns an array', () => {
    expect(getConditionTriggers({ when: ['a', () => ['b', 'c']] })).toEqual(['a', 'b', 'c']);
  });

  test('should extract name from and condition definition', () => {
    expect(getConditionTriggers({ and: [{ when: 'a' }, { when: ['b', 'c'] }, { when: () => 'd' }] })).toEqual(['a', 'b', 'c', 'd']);
  });

  test('should extract name from or condition definition', () => {
    expect(getConditionTriggers({ or: [{ when: 'a' }, { when: ['b', 'c'] }, { when: () => 'd' }] })).toEqual(['a', 'b', 'c', 'd']);
  });

  test('should extract name from array of conditions', () => {
    expect(getConditionTriggers([{ when: 'a' }, { when: 'b' }])).toEqual(['a', 'b']);
  });

  describe('mappedAttributes', () => {
    it(`should extract the 'when' attribute from mappedAttributes`, () => {
      expect(
        getConditionTriggers(
          { mappedAttributes: { when: ['equals', 'a'] } },
          {},
          {
            equals: (a) => () => a,
          }
        )
      ).toEqual(['a']);
    });
    it(`should log error if mapped condition is missing from condition mapper`, () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(
        getConditionTriggers(
          { mappedAttributes: { when: ['equals', 'a'] } },
          { name: 'foo' },
          // conditionMapper is deliberately empty
          {}
        )
      ).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`Error: Missing condition mapper function "equals" for field foo!`);
      consoleSpy.mockRestore();
    });
  });
});
