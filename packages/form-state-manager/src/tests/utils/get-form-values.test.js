import getFormValues from '../../utils/get-form-values';

describe('getFormValues', () => {
  const registeredFields = ['name', 'nested.name', 'array[0].name', 'array[1].name'];
  const fieldListeners = registeredFields.reduce(
    (acc, name) => ({
      ...acc,
      [name]: { getFieldState: () => ({ value: name }) }
    }),
    {}
  );
  const state = {
    registeredFields,
    fieldListeners
  };
  it('should created nested object structure', () => {
    const expectedValues = {
      name: 'name',
      nested: {
        name: 'nested.name'
      },
      array: [{ name: 'array[0].name' }, { name: 'array[1].name' }]
    };
    const result = getFormValues(state);
    expect(result).toEqual(expectedValues);
  });
});
