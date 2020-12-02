import composeValidators from '../../compose-validators';

describe('Form helpers', () => {
  describe('Compose validators helper', () => {
    it('should return undefined when no validators given', () => {
      expect(composeValidators()('foo')).toEqual(undefined);
    });

    it('should not return validation error', () => {
      const firstValidator = (value) => (value === 'foo' ? undefined : 'First validator message');
      const secondValidator = (value) => (value.length === 3 ? undefined : 'Second validator message');
      expect(composeValidators([firstValidator, secondValidator])('foo')).toBeUndefined();
    });

    it('should return first validation error from arguments', () => {
      const expectedError = 'First validator message';
      const sucessfullValidator = () => undefined;
      const firstFailingValidator = (value) => (value !== 'foo' ? expectedError : undefined);
      const secondFailingValidator = (value) => (value !== 'foo' ? 'Second validator message' : undefined);
      expect(composeValidators([sucessfullValidator, firstFailingValidator, secondFailingValidator])('not foo')).toEqual(expectedError);
    });

    it('should not run arguments that are not functions', () => {
      const failingValidator = () => 'Foo';
      const nonsense = { foo: 'bar' };
      expect(composeValidators([nonsense, failingValidator])('foo')).toEqual('Foo');
    });
  });
});
