import Link from 'next/link';

import Grid from '@material-ui/core/Grid'

import ListOfContents from '../../src/helpers/list-of-contents';

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

If either of of fields with name `a` and `b` will have value `x` condition is met.

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
  fields: [
    {
      name: 'controlled-field-1',
      component: 'text-field',
    },
    {
      name: 'controlled-field-2',
      component: 'text-field',
    } {
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

// Foo = 'This is a bar' => true
// Foo = 'Foo foo baar!' => true
```

### Not match

`notMatch` - reverse `is`/`pattern` condition

```jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
  notMatch: true,
}

// Foo = 'This is a bar' => false
// Foo = 'Foo foo baar!' => true
```

```jsx
condition: {
  when: 'Foo',
  is: 'bar',
  notMatch: true,
}

// Foo = 'bar' => false
```

## Clearing values

If you need to clear values after switching fields, please see <Link href="/renderer/unmounting"><a>here</a></Link>.

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/condition" />
</Grid>
</Grid>
