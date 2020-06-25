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

`when` - is name of field where the value is stored, **always required!**. It can be either string `'field-name'` or array of strings `['field-1', 'field-2']`.

</DocPage>
