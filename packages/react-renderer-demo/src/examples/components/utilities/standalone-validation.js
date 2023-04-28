import validation from '@data-driven-forms/react-form-renderer/validation';
import React, { useEffect, useState } from 'react';

const asyncValidate = (pass) => {
  const method = pass ? 'resolve' : 'reject';

  return Promise[method]().catch(() => {
    // eslint-disable-next-line no-throw-literal
    throw 'some async validation error';
  });
};

const schema = {
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

const options = {
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

const StandaloneValidation = () => {
  const [errors, setErrors] = useState();

  useEffect(() => {
    (async () => {
      const formErrors = await validation(schema, options);

      setErrors(formErrors);
    })();
  }, []);

  if (!errors) {
    return 'Validating...';
  }

  return (
    <React.Fragment>
      <h1>Schema</h1>
      <pre>Check code example</pre>
      <h1>Options</h1>
      <pre>Check code example</pre>
      <h1>Errors</h1>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </React.Fragment>
  );
};

StandaloneValidation.displayName = 'Standalone validation';

export default StandaloneValidation;
