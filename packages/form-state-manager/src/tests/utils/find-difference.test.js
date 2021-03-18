import findDifference from '../../utils/find-difference';

describe('findDifference', () => {
  let oldState;
  let newState;

  it('should skip functions', () => {
    oldState = {
      pristine: false,
      function: () => 'bbb'
    };

    newState = {
      pristine: true,
      function: () => 'aaa'
    };

    expect(findDifference(oldState, newState)).toEqual(['pristine']);
  });

  it('should skip keys from denyList', () => {
    oldState = {
      fieldListeners: { name: 'pepa' }
    };

    newState = {
      fieldListeners: { name: 'john' }
    };

    expect(findDifference(oldState, newState)).toEqual([]);
  });

  it('should find different keys', () => {
    oldState = {
      pristine: true,
      dirty: false,
      values: {
        nested: 'a'
      },
      initialValues: {
        nested: 'b'
      }
    };

    newState = {
      pristine: false,
      dirty: false,
      values: {
        nested: 'aa'
      },
      initialValues: {
        nested: 'b'
      }
    };

    expect(findDifference(oldState, newState)).toEqual(['pristine', 'values']);
  });
});
