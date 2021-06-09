import getValidates from '../../get-validates';

describe('getValidates', () => {
  const noop = () => {};

  it('returns all the validates from the schema', () => {
    const values = { x: 'value-of-x' };

    const componentMapper = {
      default: noop,
      complexResolve: {
        component: noop,
        resolveProps: () => ({
          validate: [{ type: 'complexResolve' }]
        })
      },
      componentDefault: {
        component: noop,
        validate: [{ type: 'componentDefault' }]
      },
      componentActions: {
        component: noop,
        actions: {
          validate: ['componentAction']
        }
      },
      componentActionsResolve: {
        component: noop,
        actions: {
          resolveProps: ['returnValidate']
        }
      }
    };

    const schema = {
      fields: [
        { name: 'no-validate' },
        { name: 'no-validate-1', component: 'default' },
        { name: 'simple', component: 'default', validate: [{ type: 'simple' }] },
        { name: 'double', component: 'default', validate: [{ type: 'double-1' }] },
        { name: 'double', component: 'default', validate: [{ type: 'double-2' }] },
        { fields: [{ name: 'simple-2', component: 'default', validate: [{ type: 'simple-2' }] }] },
        { name: 'component-default', component: 'componentDefault' },
        { name: 'component-default-override', component: 'componentDefault', validate: [{ type: 'override' }] },
        { name: 'component-actions', component: 'componentActions' },
        { name: 'component-actions-resolve', component: 'componentActionsResolve' },
        { name: 'complex-resolve', component: 'complexResolve' },
        { name: 'simple-resolve', component: 'default', resolveProps: () => ({ validate: [{ type: 'from-resolve-props' }] }) },
        { name: 'x', component: 'componentDefault', resolveProps: (_props, { input: { value } }) => ({ validate: [{ type: value }] }) },
        {
          name: 'xx',
          component: 'componentDefault',
          resolveProps: (_props, _inputMeta, { getState }) => ({ validate: [{ type: getState().values['x'] }] })
        }
      ]
    };

    const actionMapper = {
      componentAction: () => [{ type: 'from-action' }],
      returnValidate: () => () => ({ validate: [{ type: 'actions>resolveProps' }] })
    };

    expect(
      getValidates(schema, {
        componentMapper,
        actionMapper,
        values
      })
    ).toEqual({
      'complex-resolve': [[{ type: 'complexResolve' }]],
      'component-actions': [[{ type: 'from-action' }]],
      'component-default': [[{ type: 'componentDefault' }]],
      'component-default-override': [[{ type: 'override' }]],
      double: [[{ type: 'double-1' }], [{ type: 'double-2' }]],
      simple: [[{ type: 'simple' }]],
      'simple-2': [[{ type: 'simple-2' }]],
      'simple-resolve': [[{ type: 'from-resolve-props' }]],
      'component-actions-resolve': [[{ type: 'actions>resolveProps' }]],
      x: [[{ type: 'value-of-x' }]],
      xx: [[{ type: 'value-of-x' }]]
    });
  });
});
