export const arraySchemaDDF = {
  title: 'FieldArray',
  fields: [
    {
      component: 'field-array',
      name: 'nicePeople',
      fieldKey: 'field_array',
      label: 'Nice people',
      description: 'This allow you to add nice people to the list dynamically',
      itemDefault: { name: 'enter a name', lastName: 'enter a last name' },
      fields: [
        {
          component: 'text-field',
          name: 'name',
          label: 'Name',
          placeholder: 'Borek',
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
      fields: [
        {
          component: 'text-field',
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
