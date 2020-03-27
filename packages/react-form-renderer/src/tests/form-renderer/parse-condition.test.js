import { parseCondition } from '../../form-renderer/condition';

describe('parseCondition', () => {
  let condition;
  let values;

  beforeEach(() => {
    condition = undefined;
    values = {};
  });

  it('simple condition - true', () => {
    condition = {
      when: 'x',
      is: 'yes'
    };

    values = {
      x: 'yes'
    };

    expect(parseCondition(condition, values)).toEqual(true);
  });

  it('simple condition - false', () => {
    condition = {
      when: 'x',
      is: 'yes'
    };

    values = {
      x: 'no'
    };

    expect(parseCondition(condition, values)).toEqual(false);
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

    expect(parseCondition(condition, values)).toEqual(true);
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

    expect(parseCondition(condition, values)).toEqual(false);
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

    expect(parseCondition(condition, values)).toEqual(true);
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

    expect(parseCondition(condition, values)).toEqual(false);
  });

  it('not condition - "true"', () => {
    condition = {
      not: { when: 'x', is: 'true' }
    };

    values = {
      x: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(false);
  });

  it('not condition - "false"', () => {
    condition = {
      not: { when: 'x', is: 'true' }
    };

    values = {
      x: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(true);
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

    expect(parseCondition(condition, values)).toEqual(true);
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

    expect(parseCondition(condition, values)).toEqual(false);
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

    expect(parseCondition(condition, values)).toEqual(true);
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

    expect(parseCondition(condition, values)).toEqual(false);
  });

  it('backwards compatibility - or condition - true', () => {
    condition = { when: ['x', 'y'], is: 'true' };

    values = {
      x: 'false',
      y: 'true'
    };

    expect(parseCondition(condition, values)).toEqual(true);
  });

  it('backwards compatibility - or condition - false', () => {
    condition = { when: ['x', 'y'], is: 'true' };

    values = {
      x: 'false',
      y: 'false'
    };

    expect(parseCondition(condition, values)).toEqual(false);
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

      expect(parseCondition(condition, values)).toEqual(true);
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

      expect(parseCondition(condition, values)).toEqual(true);
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

      expect(parseCondition(condition, values)).toEqual(false);
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

      expect(parseCondition(condition, values)).toEqual(true);
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

      expect(parseCondition(condition, values)).toEqual(true);
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

      expect(parseCondition(condition, values)).toEqual(false);
    });
  });
});
