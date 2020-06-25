import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# And

All conditions must be met.

Field `controlled-field-1` must have value `Bar` and field `controlled-field-2` must include `FooBar` somewhere in its value to display field `BarFoo`.

```jsx
{
  and: [condition1, condition2, ...] // (condition1 AND condition2 AND ...)
}
```

```jsx
{
  fields: [
    {
      name: 'controlled-field-1',
      component: 'text-field',
    },
    {
      name: 'controlled-field-2',
      component: 'text-field',
    },
    {
      name: 'BarFoo',
      label: 'Foo is Bar!',
      component: 'text-field',
      condition: {
        and: [
          {
            when: 'controlled-field-1',
            is: 'Bar',
          },
          {
            when: 'controlled-field-2',
            pattern: /FooBar/
          }
        ]
      },
    },
  ]
}
```

As the value you have to use an array of conditions.

Or you can use a shorthand:

```jsx
{
  fields: [
    {
      name: 'controlled-field-1',
      component: 'text-field',
    },
    {
      name: 'controlled-field-2',
      component: 'text-field',
    },
    {
      name: 'BarFoo',
      label: 'Foo is Bar!',
      component: 'text-field',
      condition: [{
        when: 'controlled-field-1',
        is: 'Bar',
      }, {
        when: 'controlled-field-2',
        pattern: /FooBar/
      }],
    },
  ]
}
```

<CodeExample source="components/conditions/and" mode="preview" />

</DocPage>
