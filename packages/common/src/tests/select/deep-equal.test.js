import cloneDeep from 'lodash/cloneDeep';
import deepEqual from '../../select/deep-equal';

describe('deepEqual', () => {
  describe('primitives', () => {
    const tuplesBase = [1, 'a', false, undefined, null];
    const positiveCases = tuplesBase.map((value) => ({
      input: [value, value],
      output: true,
    }));
    const negativeCases = tuplesBase.map((value) => ({
      input: [value, value + 1],
      output: false,
    }));
    positiveCases.forEach(({ input, output }) => {
      it(`should return ${output} for a ${input} input`, () => {
        expect(deepEqual(...input)).toEqual(output);
      });
    });

    negativeCases.forEach(({ input, output }) => {
      it(`should return ${output} for a ${input} input`, () => {
        expect(deepEqual(...input)).toEqual(output);
      });
    });
  });

  describe('objects', () => {
    it('should return true for equal object structure', () => {
      const valueA = {
        value: {
          foo: 'bar',
          baz: [1, 2, { quaz: { 2: 3 } }],
        },
      };

      expect(deepEqual(valueA, cloneDeep(valueA))).toEqual(true);
    });

    it('should return false for non equal object structure', () => {
      const valueA = {
        value: {
          foo: 'bar',
          baz: [1, 2, { quaz: { 2: 3 } }],
        },
      };

      const valueB = {
        ...valueA,
        value: {
          ...valueA.value,
          baz: [1, 2, { quaz: {} }],
        },
      };

      expect(deepEqual(valueA, valueB)).toEqual(false);
    });

    it('should log an error if an object is too deeply nested', () => {
      const errorSpy = jest.spyOn(console, 'error');
      const valueA = {
        value: {
          value: {
            value: {
              value: {
                value: {},
              },
            },
          },
        },
      };

      expect(deepEqual(valueA, cloneDeep(valueA))).toEqual(false);
      expect(errorSpy).toHaveBeenCalledWith('Recursion limit of 5 has been exceeded.');
      errorSpy.mockReset();
    });
  });
});
