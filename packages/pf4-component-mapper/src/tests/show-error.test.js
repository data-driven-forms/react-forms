import showError from '../common/show-error';

describe('Show error on validation', () => {
  describe('show error', () => {
    it('should return default ', () => {
      expect(showError({}, false)).toEqual({ validated: 'default' });
    });

    it('should return validation error if not touched but validating on mount', () => {
      expect(showError({ error: 'Foo' }, true)).toEqual({ validated: 'error' });
    });

    it('should return default if not touched', () => {
      expect(showError({ error: 'Foo', touched: false }, false)).toEqual({ validated: 'default' });
    });

    it('should return error if touched and has error', () => {
      expect(showError({ error: 'Foo', touched: true }, false)).toEqual({ validated: 'error' });
    });
  });
});
