import SelectCommon from '../select.md';

## Single select with categories

For single (not clearable/not searchable) select, you can use categories to group your options by adding an `options` array.

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
        {
            label: 'Category 2',
            options: [
                { label: 'value 3', value: '333' },
                { label: 'value 4', value: '444' }
            ]
        }
    ]
}
```

<SelectCommon/>