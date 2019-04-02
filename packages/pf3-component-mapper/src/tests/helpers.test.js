import { validationError } from '../form-fields/helpers';

describe('Form Fields helpers', () => {
  describe('validation error', () => {
    it('should return undefined ', () => {
      expect(validationError({}, false)).toBeUndefined();
    });

    it('should return validation error if not touched but validating on mount', () => {
      expect(validationError({ error: 'Foo' }, true)).toEqual('Foo');
    });

    it('should return false if not touched', () => {
      expect(validationError({ error: 'Foo', touched: false }, false)).toEqual(false);
    });

    it('should return error if touched and has error', () => {
      expect(validationError({ error: 'Foo', touched: true }, false)).toEqual('Foo');
    });
  });
});
