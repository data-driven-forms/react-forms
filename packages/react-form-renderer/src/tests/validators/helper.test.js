import { memoize } from '../../validators/helpers';

describe('Validators helpers', () => {
  describe('memoize', () => {
    let fn;
    let fakeValidator;

    beforeEach(() => {
      fn = jest.fn(value => value);
      fakeValidator = memoize(fn);
    });

    afterEach(() => {
      fn.mockReset();
    });

    it('remember numbers inputs', ()=> {
      fakeValidator(1);
      expect(fn.mock.calls.length).toBe(1);
      fakeValidator(2);
      expect(fn.mock.calls.length).toBe(2);
      fakeValidator(1);
      expect(fn.mock.calls.length).toBe(2);
    });

    it('remember strings inputs', ()=> {
      fakeValidator('1');
      expect(fn.mock.calls.length).toBe(1);
      fakeValidator('2');
      expect(fn.mock.calls.length).toBe(2);
      fakeValidator('1');
      expect(fn.mock.calls.length).toBe(2);
    });

    it('remember undefined inputs', ()=> {
      fakeValidator();
      expect(fn.mock.calls.length).toBe(1);
      fakeValidator('2');
      expect(fn.mock.calls.length).toBe(2);
      fakeValidator();
      expect(fn.mock.calls.length).toBe(2);
    });

    it('remember array inputs', ()=> {
      fakeValidator([ 'a', 'b' ]);
      expect(fn.mock.calls.length).toBe(1);
      fakeValidator([ 'a', 'c' ]);
      expect(fn.mock.calls.length).toBe(2);
      fakeValidator([ 'a', 'b' ]);
      expect(fn.mock.calls.length).toBe(2);
    });
  });
});
