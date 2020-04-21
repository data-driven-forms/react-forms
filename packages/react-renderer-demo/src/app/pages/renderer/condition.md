import Grid from '@material-ui/core/Grid'

import ListOfContents from '../../src/helpers/list-of-contents';
import CodeExample from '../../src/components/code-example';


<Grid container item>
<Grid item xs={12} md={10}>

# Conditional fields

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

### Or

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

### And

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

### Not

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

### Sequence

This special type of condition allows to trigger a sequence of multiple independent conditions. This is useful in combination with [conditional actions](/renderer/condition#conditionalactions). Setters are executed independently. Visibility is set to true, if any of the conditions sets it to true. Sequence has to be currently the root condition, that means the sequence cannot be nested within other types of conditions such as `and`, `or` and `not`.

```jsx
{
  fields: [{
    name: 'Sequence condition',
    component: 'text-field',
    condition: {
      sequence: [
        { when: ['a'], is: 'x', then: { set: { field: 'value' } } },
        { when: ['b'], is: 'x', then: { set: { field: 'different value' } } }
      ]
    }
  }]
}
```

<CodeExample source="components/conditions/sequence" mode="preview" />

### Nesting

Of course it is possible to nest conditions:

```jsx
condition = {
  and: [
    { and: [{ when: 'x', pattern: /true/ }, { when: 'z', is: 'true' }]},
    { or: [{ when: 'y', pattern: /true/ }, { when: 'a', is: 'true' }]},
  ],
};
```

<CodeExample source="components/condition" mode="preview" />

## Conditions

### Is

`is` - test if the value is equal

```jsx
condition: {
  when: 'Foo',
  is: 'Bar',
}

// Foo == 'Bar' => true
// Foo == 'Not a Bar' => false
```

<CodeExample source="components/conditions/is" mode="preview" />

### Is empty

`isEmpty` - tests if the value is empty (using [lodash function](https://lodash.com/docs/4.17.11#isEmpty))

```jsx
condition: {
  when: 'Foo',
  isEmpty: true,
}

// Foo = 'Bar' => false
// Foo = '' => true
// Foo = [] => true
// Foo = ['aa', 'bb'] => false
// Foo = {} => true
// Foo = { a: 10 } => false
// Foo = 10 => false
// Foo = false => true
// Foo = true => false
```

<CodeExample source="components/conditions/is-empty" mode="preview" />

### Is not empty

`isNotEmpty` - tests if the value is not empty (using [lodash function](https://lodash.com/docs/4.17.11#isEmpty))

```jsx
condition: {
  when: 'Foo',
  isNotEmpty: true,
}

// Foo = 'Bar' => true
// Foo = '' => false
// Foo = [] => false
// Foo = ['aa', 'bb'] => true
// Foo = {} => false
// Foo = { a: 10 } => true
// Foo = 10 => true
// Foo = true => false
// Foo = true => true
```

<CodeExample source="components/conditions/is-not-empty" mode="preview" />

### Pattern

`pattern` - tests if the value matches the pattern

```jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
}

// Foo = 'bar' => true
// Foo = 'baar!' => false
```

It also accepts string value, then you have to use additional property flags if you need to specify RegExp flags:

```jsx
condition: {
  when: 'Foo',
  pattern: 'bar',
  flags: 'i'
}

// Foo = 'bar' => true
// Foo = 'bAr!' => true
```

<CodeExample source="components/conditions/pattern" mode="preview" />

### Not match

`notMatch` - reverse `is`/`pattern` condition

```jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
  notMatch: true,
}

// Foo = 'bar' => false
// Foo = 'baar!' => true
```

```jsx
condition: {
  when: 'Foo',
  is: 'bar',
  notMatch: true,
}

// Foo = 'bar' => false
```

<CodeExample source="components/conditions/not-match" mode="preview" />

## Conditional actions

There are currently two types of conditionals actions: `visible` and `set`. These actions can be called from `then` or `else` statements in root conditions. (Conditions has to be the root of the condition tree, or they have to be included in a [sequence](/renderer/condition#sequence) array.)

```jsx
condition: { when: 'x', is: 'y', then: { ... }, else: { ... } }
```

### Set

Setter allows to change form values according to selected values in different fields.

```jsx
// Single value
condition: { when: 'x', is: 'y', then: { set: { [field]: value } } }

// Multiple values
condition: {
  when: 'x',
  is: 'y',
  then: { set: { [field1]: value1, [field2]: value2 } }
}
```

Set is a object consists of field names as keys and values as values. You can change any form field value from any conditional action.

### Visible

Visible controls visibility of the field that includes the condition. By default, it is set to `true`.

```jsx
condition: { when: 'x', is: 'y', then: { visible: true } }
```

### Example

<CodeExample source="components/conditions/set" mode="preview" />

## Clearing values

If you need to clear values after switching fields, please see [here](/renderer/unmounting).

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/condition" />
</Grid>
</Grid>
