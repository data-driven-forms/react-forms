import validation from '../../validation';

describe('validation', () => {
  let schema;
  let options;

  beforeEach(() => {
    schema = undefined;
    options = undefined;
  });

  it('no schema', async () => {
    expect.assertions(1);

    try {
      await validation(schema, options);
    } catch (e) {
      expect(e.toString()).toEqual('Error: validation requires a schema as the first argument.');
    }
  });

  it('options is not object', async () => {
    expect.assertions(1);

    schema = {};

    try {
      await validation(schema, options);
    } catch (e) {
      expect(e.toString()).toEqual('Error: options argument has to be type of object, provided: undefined');
    }
  });

  it('wrong schema', async () => {
    expect.assertions(1);

    schema = { fields: [{ name: 'field-1', component: 'checkbox', validate: [{ type: 'custom-type' }] }] };
    options = {};

    try {
      await validation(schema, options);
    } catch (e) {
      expect(e.toString().trim()).toEqual(`DefaultSchemaError: 
        Error occured in field definition with name: "field-1".
        Field validator at index: 0 does not have correct "type" property!
        Received "custom-type", expected one of: [required,min-length,max-length,exact-length,min-items,pattern,max-number-value,min-number-value,url].`);
    }
  });

  it('returns correct an array errors', async () => {
    const asyncValidate = jest.fn().mockImplementation((pass) => {
      const method = pass ? 'resolve' : 'reject';

      return Promise[method]().catch(() => {
        // eslint-disable-next-line no-throw-literal
        throw 'some async validation error';
      });
    });

    schema = {
      fields: [
        { name: 'no-validation', component: 'checkbox' },
        { name: 'pass', component: 'select', validate: [{ type: 'required' }] },
        { name: 'invisible', component: 'dual-list', condition: { when: 'x', is: 'abc' }, validate: [{ type: 'required' }] },
        { name: 'fail', component: 'select', validate: [{ type: 'required' }] },
        { name: 'subform', component: 'subform', fields: [{ name: 'fail-in-nest', component: 'select', validate: [{ type: 'required' }] }] },
        { name: 'fail.nested', component: 'select', validate: [{ type: 'required' }] },
        { name: 'passes.nested', component: 'select', validate: [{ type: 'required' }] },
        { name: 'fail-function', component: 'select', validate: [() => 'error-message-from-function'] },
        { name: 'fail-custom', component: 'select', validate: [{ type: 'custom' }] },
        { name: 'async-fail', component: 'select', validate: [asyncValidate] },
        { name: 'async-pass', component: 'select', validate: [asyncValidate] },
        { name: 'datatype-fail', component: 'select', dataType: 'number' },
        { name: 'fail-multiple', component: 'select', validate: [{ type: 'required' }, { type: 'pattern', pattern: /abc/ }] },
        { name: 'double-fail', component: 'select', validate: [{ type: 'required' }] },
        { name: 'double-fail', component: 'select', validate: [{ type: 'pattern', pattern: /abc/ }] },
        { name: 'double-fail-1', component: 'select', validate: [{ type: 'required' }] },
        { name: 'double-fail-1', component: 'select', validate: [{ type: 'pattern', pattern: /abc/ }] },
        { name: 'double-fail-2', component: 'select', validate: [{ type: 'required' }] },
        { name: 'double-fail-2', component: 'select', dataType: 'number' },
        { name: 'combined-fail', component: 'select', dataType: 'number', validate: [{ type: 'required' }] },
        { name: 'combined-fail-1', component: 'select', dataType: 'number', validate: [{ type: 'required' }] },
        { name: 'combined-pass', component: 'select', dataType: 'number', validate: [{ type: 'required' }] },
      ],
    };
    options = {
      values: {
        pass: 'some-value',
        'async-pass': 'some-value',
        passes: { nested: 'some-value' },
        'datatype-fail': 'abc',
        'fail-multiple': 'ccc',
        'double-fail': 'ccc',
        'double-fail-2': 'ccc',
        'combined-fail-1': 'string',
        'combined-pass': 123,
      },
      validatorMapper: {
        custom: () => () => 'custom error validator',
      },
    };

    const results = await validation(schema, options);

    expect(results).toEqual({
      'async-fail': 'some async validation error',
      'datatype-fail': 'Values must be number',
      fail: 'Required',
      'fail-custom': 'custom error validator',
      'fail-function': 'error-message-from-function',
      'fail-in-nest': 'Required',
      'fail.nested': 'Required',
      'fail-multiple': 'Value does not match pattern: /abc/.',
      'double-fail': 'Value does not match pattern: /abc/.',
      'double-fail-1': 'Required',
      'double-fail-2': 'Values must be number',
      'combined-fail': 'Required',
      'combined-fail-1': 'Values must be number',
    });
    expect(asyncValidate.mock.calls).toEqual([
      [undefined, options.values, {}],
      ['some-value', options.values, {}],
    ]);
  });

  it('handle warnings', async () => {
    schema = {
      fields: [
        { name: 'warning', component: 'checkbox', validate: [{ type: 'required', warning: true }], useWarnings: true },
        { name: 'error', component: 'select', validate: [{ type: 'required' }] },
      ],
    };
    options = {};

    const results = await validation(schema, options);

    expect(results).toEqual({ error: 'Required', warning: { error: 'Required', type: 'warning' } });
  });

  it('omit warnings', async () => {
    schema = {
      fields: [
        { name: 'warning', component: 'checkbox', validate: [{ type: 'required', warning: true }], useWarnings: true },
        { name: 'error', component: 'select', validate: [{ type: 'required' }] },
      ],
    };
    options = { omitWarnings: true };

    const results = await validation(schema, options);

    expect(results).toEqual({ error: 'Required' });
  });
});
