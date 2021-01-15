import parseCondition from '../../parse-condition';

describe('parseCondition', () => {
  let condition;
  let values;
  let positiveResult;
  let negativeResult;

  beforeEach(() => {
    condition = undefined;
    values = {};
    positiveResult = { visible: true, result: true };
    negativeResult = { visible: false, result: false };
  });

  it('simple condition - true', () => {
    condition = {
      when: 'x',
      is: 'yes'
    };

    values = {
      x: 'yes'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('simple condition - false', () => {
    condition = {
      when: 'x',
      is: 'yes'
    };

    values = {
      x: 'no'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('and condition - true', () => {
    condition = {
      and: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'true',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('and condition - false', () => {
    condition = {
      and: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'true',
      y: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('or condition - true', () => {
    condition = {
      or: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'false',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('or condition - false', () => {
    condition = {
      or: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'false',
      y: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('not condition - "true"', () => {
    condition = {
      not: { when: 'x', is: 'true' }
    };

    values = {
      x: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('not condition - "false"', () => {
    condition = {
      not: { when: 'x', is: 'true' }
    };

    values = {
      x: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('not condition with array - "false"', () => {
    condition = {
      not: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'false',
      y: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('not condition with array - "true"', () => {
    condition = {
      not: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'true',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('backwards compatibility - and condition - true', () => {
    condition = [
      { when: 'x', is: 'true' },
      { when: 'y', is: 'true' }
    ];

    values = {
      x: 'true',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('backwards compatibility - and condition - false', () => {
    condition = [
      { when: 'x', is: 'true' },
      { when: 'y', is: 'true' }
    ];

    values = {
      x: 'true',
      y: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('backwards compatibility - or condition - true', () => {
    condition = { when: ['x', 'y'], is: 'true' };

    values = {
      x: 'false',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('backwards compatibility - or condition - false', () => {
    condition = { when: ['x', 'y'], is: 'true' };

    values = {
      x: 'false',
      y: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  describe('nested conditions', () => {
    it('nested test 1 - true', () => {
      condition = {
        or: [{ not: { when: 'x', pattern: /true/ } }, { not: { when: 'y', pattern: /true/ } }, { not: { when: 'z', pattern: /true/ } }]
      };

      values = {
        x: 'false',
        y: 'false',
        z: 'false'
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);
    });

    it('nested test 1 - true', () => {
      condition = {
        or: [{ not: { when: 'x', pattern: /true/ } }, { not: { when: 'y', pattern: /true/ } }, { not: { when: 'z', pattern: /true/ } }]
      };

      values = {
        x: 'true',
        y: 'false',
        z: 'false'
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);
    });

    it('nested test 1 - false', () => {
      condition = {
        or: [{ not: { when: 'x', pattern: /true/ } }, { not: { when: 'y', pattern: /true/ } }, { not: { when: 'z', pattern: /true/ } }]
      };

      values = {
        x: 'true',
        y: 'true',
        z: 'true'
      };

      expect(parseCondition(condition, values)).toEqual(negativeResult);
    });

    it('nested test 2 - true', () => {
      condition = {
        and: [
          {
            and: [
              { when: 'x', pattern: /true/ },
              { when: 'z', is: 'true' }
            ]
          },
          {
            or: [
              { when: 'y', pattern: /true/ },
              { when: 'a', is: 'true' }
            ]
          }
        ]
      };

      values = {
        x: 'true',
        z: 'true',
        y: 'true',
        a: 'false'
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);
    });

    it('nested test 2 - true', () => {
      condition = {
        and: [
          {
            and: [
              { when: 'x', pattern: /true/ },
              { when: 'z', is: 'true' }
            ]
          },
          {
            or: [
              { when: 'y', pattern: /true/ },
              { when: 'a', is: 'true' }
            ]
          }
        ]
      };

      values = {
        x: 'true',
        z: 'true',
        y: 'false',
        a: 'true'
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);
    });

    it('nested test 2 - false', () => {
      condition = {
        and: [
          {
            and: [
              { when: 'x', pattern: /true/ },
              { when: 'z', is: 'true' }
            ]
          },
          {
            or: [
              { when: 'y', pattern: /true/ },
              { when: 'a', is: 'true' }
            ]
          }
        ]
      };

      values = {
        x: 'false',
        z: 'true',
        y: 'false',
        a: 'true'
      };

      expect(parseCondition(condition, values)).toEqual(negativeResult);
    });
  });

  it('sequence condition - true', () => {
    condition = {
      sequence: [
        { when: 'z', is: 'true' },
        { when: 'x', is: 'true' }
      ]
    };

    values = {
      x: 'true',
      z: 'false'
    };

    positiveResult = {
      result: true,
      visible: true,
      sets: []
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('sequence condition false', () => {
    condition = {
      sequence: [
        { when: 'z', is: 'true' },
        { when: 'x', is: 'true' }
      ]
    };

    values = {
      x: 'false',
      z: 'false'
    };

    negativeResult = {
      result: false,
      visible: false,
      sets: []
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('sequence condition - setters', () => {
    condition = {
      sequence: [
        { when: 'x', is: 'true', then: { set: { a: 'aa' } } },
        { when: 'z', is: 'true', then: { set: { b: 'bb' } } },
        { when: 'y', is: 'true', then: { set: { c: 'cc' } } }
      ]
    };

    values = {
      x: 'true',
      z: 'false',
      y: 'true'
    };

    positiveResult = {
      result: true,
      visible: true,
      sets: [{ a: 'aa' }, { c: 'cc' }]
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('and condition - true with set', () => {
    condition = {
      then: { set: { a: 'aa' } },
      and: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'true',
      y: 'true'
    };

    positiveResult = {
      ...positiveResult,
      set: { a: 'aa' }
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
  });

  it('and condition - false with set', () => {
    condition = {
      then: { set: { a: 'aa' } },
      and: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'false',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  it('and condition - true with else set', () => {
    condition = {
      else: { set: { a: 'aa' } },
      and: [
        { when: 'x', is: 'true' },
        { when: 'y', is: 'true' }
      ]
    };

    values = {
      x: 'false',
      y: 'true'
    };

    negativeResult = {
      ...negativeResult,
      set: { a: 'aa' }
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  describe('when function', () => {
    const field = {
      name: 'field-name'
    };

    it('when is function', () => {
      const whenSpy = jest.fn().mockImplementation(() => 'x');

      condition = {
        when: whenSpy,
        is: 'yes'
      };

      values = {
        x: 'yes'
      };

      expect(parseCondition(condition, values, field)).toEqual(positiveResult);
      expect(whenSpy).toHaveBeenCalledWith(field);
    });

    it('when returns array - true', () => {
      const whenSpy = jest.fn().mockImplementation(() => ['x', 'y']);

      condition = {
        when: whenSpy,
        is: 'true'
      };

      values = {
        x: 'true',
        y: 'true'
      };

      expect(parseCondition(condition, values, field)).toEqual(positiveResult);
      expect(whenSpy).toHaveBeenCalledWith(field);
    });

    it('when returns array - false', () => {
      const whenSpy = jest.fn().mockImplementation(() => ['x', 'y']);

      condition = {
        when: whenSpy,
        is: 'true'
      };

      values = {
        x: 'false',
        y: 'false'
      };

      expect(parseCondition(condition, values, field)).toEqual(negativeResult);
      expect(whenSpy).toHaveBeenCalledWith(field);
    });

    it('when returns array of functions - true', () => {
      const whenSpyX = jest.fn().mockImplementation(() => 'x');
      const whenSpyY = jest.fn().mockImplementation(() => 'x');

      const whenSpy = jest.fn().mockImplementation(() => [whenSpyX, whenSpyY]);

      condition = {
        when: whenSpy,
        is: 'true'
      };

      values = {
        x: 'true',
        y: 'true'
      };

      expect(parseCondition(condition, values, field)).toEqual(positiveResult);
      expect(whenSpy).toHaveBeenCalledWith(field);
      expect(whenSpyX).toHaveBeenCalledWith(field);
      expect(whenSpyY).toHaveBeenCalledWith(field);
    });
  });

  it('simple condition - custom function', () => {
    const customFunction = jest.fn().mockImplementation((value) => Boolean(value));

    condition = {
      when: 'x',
      is: customFunction,
      customArg: '123'
    };

    values = {
      x: 1
    };

    expect(parseCondition(condition, values)).toEqual(positiveResult);
    expect(customFunction).toHaveBeenCalledWith(1, { customArg: '123', when: 'x', is: expect.any(Function) });

    values = {
      x: 0
    };

    expect(parseCondition(condition, values)).toEqual(negativeResult);
  });

  describe('math operations', () => {
    it('greaterThan', () => {
      condition = {
        when: 'x',
        greaterThan: 0
      };

      values = {
        x: 1
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);

      values = {
        x: 0
      };

      expect(parseCondition(condition, values)).toEqual(negativeResult);
    });

    it('greaterThanOrEqualTo', () => {
      condition = {
        when: 'x',
        greaterThanOrEqualTo: 0
      };

      values = {
        x: 0
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);

      values = {
        x: -1
      };

      expect(parseCondition(condition, values)).toEqual(negativeResult);
    });

    it('lessThan', () => {
      condition = {
        when: 'x',
        lessThan: 0
      };

      values = {
        x: -1
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);

      values = {
        x: 1
      };

      expect(parseCondition(condition, values)).toEqual(negativeResult);
    });

    it('lessThanOrEqualTo', () => {
      condition = {
        when: 'x',
        lessThanOrEqualTo: 0
      };

      values = {
        x: 0
      };

      expect(parseCondition(condition, values)).toEqual(positiveResult);

      values = {
        x: 1
      };

      expect(parseCondition(condition, values)).toEqual(negativeResult);
    });
  });
});
