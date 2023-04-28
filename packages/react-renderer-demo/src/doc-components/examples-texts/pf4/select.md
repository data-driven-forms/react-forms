## Menu portaling

In order to show menu properly in dialogs like modals, you can use `menuIsPortal`. This will append menu as portal to body.

|prop name|type|description|
|---------|----|-----------|
|menuIsPortal|`bool`|Append menu to body instead of to select wrapper.See more [here](https://react-select.com/advanced#portaling)|

## Groups and dividers

PF4 selects supports grouping options and inserting dividers.

### Group

```jsx
{
  label: 'Category name',
  options: [ ...options ]
}
```

### Divider

```jsx
{
  divider: true
}
```

### Example

```jsx
{
    component: 'select',
    name: 'select-with-categories',
    label: 'With categories',
    options: [
        {
            label: 'Category 1',
            options: [
                { label: 'value 1', value: '111' },
                { label: 'value 2', value: '222' }
            ]
        },
        {divider: true },
        {label: 'independent 1', value: '1112333'},
        {divider: true },
        {
            label: 'Category 2',
            options: [
                { label: 'value 3', value: '333' },
                { label: 'value 4', value: '444' }
            ]
        },
        {divider: true },
        {label: 'independent 2', value: '11111' }
    ]
}
```

## PF4 Async Select

PF4 Select allows to load the options asynchronously.

|prop name|type|description|
|---------|----|-----------|
|loadOptions|`func`|A function returning `Promise`: `(searchValue) => new Promise`|
|loadingMessage|`node`|A message shown during the initial loading.|
|updatingMessage|`node`|A message shown during the loading|
|noValueUpdates|`bool`|When set on true, the select won't deselect values not found in options.|

### loadOptions example

`loadOptions` receives a search input text as an argument.

```jsx
const asyncLoadOptions = (searchValue) => new Promise(resolve => setTimeout(() => {
  if (searchValue && searchValue.trim() !== '') {
    return resolve(asyncOptions.filter(({ label }) => label.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase())));
  }

  return resolve(options);
}, 2000));
```

## Description

PF4 select can render a description for each option. Just add a `description` attribute to its object (can be `React.node`):

```jsx
options: [
  { value: 'value', label: 'Some label', description: 'Some description' }
]
```

import SelectCommon from '../select.md';

<SelectCommon/>