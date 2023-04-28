import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Or

At least one condition must be met.

You can use `or` object to connect two conditions. If either of of fields with name `a` and `b` will have value `x` condition is met.

```jsx
{
  or: [condition1, condition2, ...] // (condition1 OR condition2 OR ...)
}
```

```jsx
{
  fields: [{
    name: 'Or condition',
    component: 'text-field',
    condition: {
      or: [
        {
          when: ['a'],
          is: 'x'
        }, {
          when: ['b'],
          is: 'x'
        }
      ]
    }
  }]
}
```

As the value you have to use an array of conditions.

Also, you can use a shorthand:

```jsx
{
  fields: [{
    name: 'Or condition',
    component: 'text-field',
    condition: {
      when: ['a', 'b'],
      is: 'x'
    }
  }]
}
```

<CodeExample source="components/conditions/or" mode="preview" />

</DocPage>
