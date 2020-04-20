const arraySchemaDDF = {
  fields: [
    {
      component: 'field-array',
      name: 'nicePeople',
      label: 'Nice people',
      description: 'This allow you to add nice people to the list dynamically',
      defaultItem: { name: 'enter a name', lastName: 'enter a last name' },
      fields: [
        {
          component: 'text-field',
          name: 'name',
          label: 'Name',
          placeholder: 'Borek',
          isRequired: true,
          validate: [
            {
              type: 'required'
            }
          ]
        },
        {
          component: 'text-field',
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Stavitel'
        }
      ]
    },
    {
      component: 'field-array',
      name: 'minItems',
      label: 'A list with a minimal number of items',
      validate: [{ type: 'min-items', threshold: 3 }],
      fields: [
        {
          component: 'text-field',
          label: 'Item'
        }
      ]
    },
    {
      component: 'field-array',
      name: 'number',
      initialValue: [1, 2, 3, 4],
      defaultItem: 5,
      label: 'Default value with initialValues set',
      fields: [
        {
          component: 'text-field',
          label: 'Item',
          type: 'number'
        }
      ]
    },
    {
      component: 'field-array',
      name: 'minMax',
      minItems: 4,
      maxItems: 6,
      label: 'Min 4 item, max 6 items without validators',
      initialValue: [null, null, null, null],
      fields: [
        {
          component: 'text-field',
          isRequired: true,
          validate: [
            {
              type: 'required'
            }
          ]
        }
      ]
    }
  ]
};

export default arraySchemaDDF;
