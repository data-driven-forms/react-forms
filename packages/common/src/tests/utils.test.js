import { fnToString } from '../utils';

describe('utils', () => {
  describe('fnToString', () => {
    it('converts simple function to string', () => {
      function x(add, x) {
        return add + x;
      }

      expect(fnToString(x)).toEqual('function x(add, x) { return add + x; }');
    });

    it('no function', () => {
      expect(fnToString()).toEqual('');
    });
  });
});
