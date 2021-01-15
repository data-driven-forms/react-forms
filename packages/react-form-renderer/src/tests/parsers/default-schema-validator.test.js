import React from 'react';
import output from './output';
import defaultSchemaValidator from '../../default-schema-validator';
import componentTypes from '../../component-types';
import validatorTypesDefault from '../../validator-types';

describe('Default schema validator', () => {
  let componentMapper;
  beforeEach(() => {
    componentMapper = {
      foo: () => <div>Component</div>,
      invalidComponent: 'baz',
      [componentTypes.TABS]: ({ children }) => <div>{children}</div>
    };
  });
  it('should fail if input is not a object', () => {
    expect(() => defaultSchemaValidator([])).toThrowErrorMatchingSnapshot();
  });

  it('should fail if input object does not have fields names', () => {
    expect(() => defaultSchemaValidator({})).toThrowErrorMatchingSnapshot();
  });

  it('should fail if input object does fields names that is not array', () => {
    expect(() => defaultSchemaValidator({ fields: {} })).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field item does not have component property', () => {
    expect(() => defaultSchemaValidator({ fields: [{}] })).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field item does not have name property', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo'
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field item does not have name property but have key', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              key: 'some key'
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field component property is not in form fields mapper.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'blarghs',
              name: 'foo'
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it.skip('should fail if field component from form fields mapper is not a valid React component.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'invalidComponent',
              name: 'foo'
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field condition is not correct type.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: ''
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field condition is missing when key.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {}
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field condition is missing is key.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo' }
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field condition when property is not correct type.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 123, is: 456 }
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field condition pattern property is not correct type.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', pattern: 456 }
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if field condition pattern property is a string', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', pattern: '^pattern' }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should not fail if field condition pattern property is a function', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', is: () => true }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should not fail if field condition pattern property is a greaterThan', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', greaterThan: 1 }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should not fail if field condition pattern property is a greaterThanOrEqualTo', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', greaterThanOrEqualTo: 1 }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should not fail if field condition pattern property is a lessThan', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', lessThan: 1 }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should not fail if field condition pattern property is a lessThanOrEqualTo', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', lessThanOrEqualTo: 1 }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should fail if field condition have notMatch property and have not is/pattern.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', isEmpty: true, notMatch: true }
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field validate is not an array.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: {}
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if validate is undefined.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: undefined
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should not fail if field validate item is a function.', () => {
    const functionValidator = () => 'cosi';
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: [functionValidator]
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });

  it('should fail if field validate item is not an object or a function.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: ['']
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field validate item is an object and does not have type property.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: [{}]
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail if field validate item is an object and validator type does not exist.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: [
                {
                  type: 'magic'
                }
              ]
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if field validate item is an object and validator type is custom.', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              validate: [
                {
                  type: 'magic'
                }
              ]
            }
          ]
        },
        componentMapper,
        ['magic']
      )
    ).not.toThrow();
  });

  it('should fail validation when using wrong data type', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              dataType: 'foo'
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              dataType: {}
            }
          ]
        },
        componentMapper
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should pass validation', () => {
    expect(() =>
      defaultSchemaValidator(
        output,
        {
          ...componentMapper,
          'sub-form': () => <div />,
          'text-field': () => <div />,
          textarea: () => <div />,
          checkbox: () => <div />,
          radio: () => <div />,
          select: () => <div />,
          'date-picker': () => <div />,
          'time-picker': () => <div />
        },
        Object.values(validatorTypesDefault)
      )
    ).not.toThrow();
  });

  describe('actionMapper validation', () => {
    const name = 'somecomponent';
    const prop = 'loadOptions';
    const action = 'customAction';
    const actionTypes = [action];

    it('should not fail if action exists', () => {
      expect(() =>
        defaultSchemaValidator(
          {
            fields: [
              {
                component: 'foo',
                name,
                actions: {
                  [prop]: [action]
                }
              }
            ]
          },
          componentMapper,
          [],
          actionTypes
        )
      ).not.toThrow();
    });

    it('should fail if action doesnt exist in the mapper', () => {
      expect(() =>
        defaultSchemaValidator(
          {
            fields: [
              {
                component: 'foo',
                name,
                actions: {
                  [prop]: ['nonsense']
                }
              }
            ]
          },
          componentMapper,
          [],
          actionTypes
        )
      ).toThrowErrorMatchingSnapshot();
    });

    it('should fail if action is missing action key', () => {
      expect(() =>
        defaultSchemaValidator(
          {
            fields: [
              {
                component: 'foo',
                name,
                actions: {
                  [prop]: []
                }
              }
            ]
          },
          componentMapper,
          [],
          actionTypes
        )
      ).toThrowErrorMatchingSnapshot();
    });

    it('should fail if action is undefined', () => {
      expect(() =>
        defaultSchemaValidator(
          {
            fields: [
              {
                component: 'foo',
                name,
                actions: {
                  [prop]: undefined
                }
              }
            ]
          },
          componentMapper,
          [],
          actionTypes
        )
      ).toThrowErrorMatchingSnapshot();
    });
  });

  it('should not fail validation using "and" and "or" conditions', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                and: [{ when: 'x', is: 'y' }]
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).not.toThrow();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                or: [{ when: 'x', is: 'y' }]
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).not.toThrow();
  });

  it('should fail validation when using "and" and "or" conditions', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                and: { when: 'x', is: 'y' }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                or: { when: 'x', is: 'y' }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: [
                {
                  and: { when: 'x', is: 'y' }
                },
                { when: 'foo', is: 'bar' }
              ]
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail validation when sequence is not array', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                sequence: { when: 'x', is: 'y' }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail validation when sequence is not root condition', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: [
                {
                  sequence: [{ when: 'x', is: 'y' }]
                }
              ]
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail validation when then/else is not in root condition', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: [
                {
                  and: [{ when: 'x', is: 'y', then: { set: { x: 'x' } } }]
                }
              ]
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: [
                {
                  and: [{ when: 'x', is: 'y', else: { set: { x: 'x' } } }]
                }
              ]
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail validation when visible is not boolean', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                when: 'x',
                is: 'x',
                then: { visible: 'pepa' }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                when: 'x',
                is: 'x',
                else: { visible: 'pepa' }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail validation when set is not object', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                when: 'x',
                is: 'x',
                then: { set: 'pepa' }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                when: 'x',
                is: 'x',
                then: { set: ['pepa'] }
              }
            }
          ]
        },
        componentMapper,
        [],
        []
      )
    ).toThrowErrorMatchingSnapshot();
  });

  it('conditional actions - correct variant', () => {
    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { when: 'Foo', pattern: '^pattern', then: { set: { password: '1234' }, visible: true } }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: {
                sequence: [
                  { when: 'Foo', pattern: '^pattern', then: { set: { password: '1234' }, visible: true } },
                  { and: [{ when: 'Foo', pattern: '^pattern' }], else: { visible: true } }
                ]
              }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();

    expect(() =>
      defaultSchemaValidator(
        {
          fields: [
            {
              component: 'foo',
              name: 'foo',
              condition: { and: [{ when: 'Foo', pattern: '^pattern' }], else: { visible: true } }
            }
          ]
        },
        componentMapper
      )
    ).not.toThrow();
  });
});
