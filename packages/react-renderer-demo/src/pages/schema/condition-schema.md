import DocPage from '@docs/doc-page';

<DocPage>

# Condition schema

You can show a field only if it meets a condition:

## Schema

```jsx
{
  fields: [
    {
      name: 'Foo', // controlled field
      component: 'text-field',
    }, {
      name: 'BarFoo',
      label: 'Foo is Bar!',
      component: 'text-field',
      condition: {
        when: 'Foo', // name of controlled field
        is: 'Bar', // condition
      },
    },
  ]
}
```

### When

When attribute is always **required**. Can be one of following types:

**String**

A name of field where the value is stored.

**Function**

*currentField => string | string[]*

A function receiving the current field as the first argument. Can be used to get dynamically created field name:

```jsx
{
  when: (field) => `${getFieldNumber(field)}.name`
}
/*
  field = {
    name: 'person[14]',
  }
*/
```

A function in an array cannot return another array.

**Array**

An array of string or functions.

</DocPage>
