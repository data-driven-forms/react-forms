import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# Not

You can simple negate a condition by using a `not`. Following condition is a true, when both of values are not a `x`.

```jsx
{
  not: [condition1, condition2, ...] // negate(condition1 AND condition2 AND ...)
}
{
  not: condition1 // negate(condition1)
}
```

```jsx
{
  fields: [{
    name: 'Or condition',
    component: 'text-field',
    condition: {
      not: [
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

As the value you can use an array (AND) or another condition.

<CodeExample source="components/conditions/not" mode="preview" />

</DocPage>
