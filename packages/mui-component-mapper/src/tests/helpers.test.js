import { validationError } from '../common/helpers';

describe('form fields helpers', () => {
  describe('validationError', () => {
    it('returns meta.error when validateOnMount', () => {
      expect(validationError({ error: 'error' }, true)).toEqual('error');
    });

    it('returns meta.error || meta.touched when validateOnMount', () => {
      expect(validationError({ error: 'error', touched: false }, false)).toEqual(false);
      expect(validationError({ error: 'error', touched: true }, false)).toEqual('error');
    });
  });
});
