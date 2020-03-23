import Grid from '@material-ui/core/Grid'

import ListOfContents from '../../src/helpers/list-of-contents';
import RawComponent from '@docs/raw-component';


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

### OR condition. At least one condition must be met

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

### AND condition. All conditions must be met

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

### Nesting

Of course it is possible to neste conditions:

```jsx
condition = {
  and: [
    { and: [{ when: 'x', pattern: /true/ }, { when: 'z', is: 'true' }]},
    { or: [{ when: 'y', pattern: /true/ }, { when: 'a', is: 'true' }]},
  ],
};
```

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

## Example

<RawComponent source="condition" />

## Clearing values

If you need to clear values after switching fields, please see [here](/renderer/unmounting).

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/condition" />
</Grid>
</Grid>
