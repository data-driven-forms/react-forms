import getVisibleFields from '../../get-visible-fields';

describe('getVisibleFields', () => {
  it('parses conditions', () => {
    let schema = {
      fields: [
        {
          name: 'visible-1',
          component: 'text',
        },
        {
          name: 'visible-2',
          condition: { when: 'x', is: 1 },
        },
        {
          name: 'invisible-1',
          condition: { not: { when: 'x', is: 1 } },
        },
        {
          name: 'visible-nested',
          fields: [
            {
              name: 'visible-nested-1',
              condition: { when: 'y.nested.x', is: 1 },
            },
            {
              name: 'invisible-nested-1',
              condition: { not: { when: 'y.nested.x', is: 1 } },
            },
          ],
        },
        {
          name: 'visible-nested-2',
          condition: { when: 'y.nested.x', is: 1 },
          fields: [{ name: 'visible-nested-2-1' }],
        },
        {
          name: 'invisible-nested',
          condition: { when: 'x', is: 2 },
          fields: [
            {
              name: 'invisible-nested-1',
              condition: { when: 'x', is: 1 },
            },
            {
              name: 'invisible-nested-2',
              condition: { not: { when: 'x', is: 1 } },
            },
          ],
        },
      ],
    };

    const values = { x: 1, y: { nested: { x: 1 } } };

    expect(getVisibleFields(schema, values)).toEqual({
      fields: [
        { name: 'visible-1', component: 'text' },
        { name: 'visible-2', condition: { is: 1, when: 'x' } },
        { name: 'visible-nested', fields: [{ condition: { is: 1, when: 'y.nested.x' }, name: 'visible-nested-1' }] },
        { name: 'visible-nested-2', condition: { is: 1, when: 'y.nested.x' }, fields: [{ name: 'visible-nested-2-1' }] },
      ],
    });
  });
});
