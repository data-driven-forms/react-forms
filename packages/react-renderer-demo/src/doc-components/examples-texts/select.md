import Chip from '@material-ui/core/Chip';

## Common select features

This mapper component is using the common select component to provide additional features.

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