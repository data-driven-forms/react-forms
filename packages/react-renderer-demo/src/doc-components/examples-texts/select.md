import Chip from '@mui/material/Chip';

## Common select features

This mapper component is using the common select component to provide additional features.

## compareValues

*(optionValueA, optionValueB) => boolean*

If the option values are not primitive types, this option can be used to compare the option values to properly identify selected option(s).

> **__NOTE:__** By default, the select will run a `deepEqual` compare function. This function is expensive and will only compare 5 levels of the value. To improve performance or overcome this limit define custom `compareValues` prop.

## loadOptions

*(currentSearchValue: string) => Promise< Options >*

Using `loadOptions` function you can dynamically load options when the component is mounted or when the value in search bar is changed. You can also trigger a reload via changing `loadOptionsChangeCounter` *number* attribute.

---

## simpleValue

*boolean*

When is `true`, the select will store only values of the selected options. Otherwise, it stores the whole objects.

---

## selectAll

*boolean* | <Chip label="Experimental" color="secondary" component="span" />

When provided to an option object, this option will select all available options.

```jsx
options: [{
        label: 'Select all',
        value: 'select-all',
        selectAll: true,
    },
    ...
    ]
```

---

## selectNone

*boolean* | <Chip label="Experimental" color="secondary" component="span" />


When provided to an option object, this option will clear the selection.

```jsx
options: [{
        label: 'Select none',
        value: 'select-none',
        selectNone: true,
    },
    ...
    ]
```

---

## noValueUpdates

*boolean*

By default, the common select unselects values that are not available as an option. If you want to disable this behavior, you can do it via setting this option to `true`.