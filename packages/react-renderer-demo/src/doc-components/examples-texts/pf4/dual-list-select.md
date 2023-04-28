## Props

Dual list select is wrapped in a form group, so it accepts all [form group props](/provided-mappers/component-api#formgroupwrappedcomponents). It also accepts the same props as the [original component](https://www.patternfly.org/v4/components/dual-list-selector).

The component implements three following custom props:

|Props|Type|Description|
|-----|----|-----------|
|[options](/mappers/dual-list-select?mapper=pf4#options)|array|Array of options.|
|[getValueFromNode](/mappers/dual-list-select?mapper=pf4#getvaluefromnode)|func|Use when a node is used to set value/label.|
|[isSortable](/mappers/dual-list-select?mapper=pf4#issortable)|boolean|Allows to sort the list.|

<br />

---

<br />

### options

*Array&#60;string &#124; node &#124; dualListSelectOption&#62;*

You have multiple ways how to set up your options:

<br />

**A. Simple array**

You can just provide an array of values:

```jsx
const options = ['value1', 'value2', ... ]
```

Or you can use node for additional customization (i.e. i11n):

```jsx
const options = [<span>value1</span>, <span>value2</span>, ... ]
```

In this case, you have to provide **getValueFromNode** to get a value from the nodes.

<br />

**B. Compley array** (of `dualListSelectOption`s)

You can also use the custom options format of

```jsx
{
    label: string | node;
    value: string;
}
```

```jsx
const options = [{value: 'first-value', label: 'First value'}, {value: 'second-value', label: <span>Second value</span>}, ... ]
```

<br />

---

<br />

### getValueFromNode

*(node) => string*

A simple function that receives a react node as an argument and returns its value. **Always provide this function, when you are using nodes in options!**

|Node|getValueFromNode|
|-----|----|
|`<span>value1</span>`|`(option) => option.props.children`|

<br />

---

<br />

### isSortable

*boolean*

This flag allows to sort options in both of options and selected options. However, you have to insert a sort button manually into [chosenOptionsActions](https://www.patternfly.org/v4/components/dual-list-selector#props) or [availableOptionsActions](https://www.patternfly.org/v4/components/dual-list-selector#props) arrays.
#### SortButton

You can use the provided button or implement your own button.

**A. Provided button**

This component requires a prop `position`: `left` (availableOption) &#124; `right` (chosenOptions)

```jsx
import { DualListSortButton } from '@data-driven-forms/pf4-component-mapper';

const dualListField = {
    component: componentTypes.DUAL_LIST_SELECT,
    name: 'sortable-dual-list',
    options: ['z', 'a', 'b'],
    isSortable: true,
    availableOptionsActions: [<DualListSortButton position="left" key="sort" />],
    chosenOptionsActions: [<DualListSortButton position="right" key="sort" />]
}
```

**A. Custom implementation**

Data Driven Forms provides an access to sort functionality via `DualListContext`.

```jsx
{
    sortConfig: { left: 'asc' | 'desc', right: 'asc' | 'desc' },
    setSortConfig: (newSortConfig) => void
}
```

```jsx
import { DualListContext } from '@data-driven-forms/pf4-component-mapper';

const CustomRightSortButton = () => {
  const { sortConfig, setSortConfig } = useContext(DualListContext);

  return (
    <button
      onClick={
        sortConfig.right === 'asc'
          ? () => setSortConfig({ ...sortConfig, right: 'desc' })
          : () => setSortConfig({ ...sortConfig, right: 'asc' })
      }
    >
        Sort right values
    </button>
  );
};
```

### isTree

`isTree` follows the same structure as the [original prop](https://www.patternfly.org/v4/components/dual-list-selector#duallistselector), but you have to provide `value` for all leaves (not folders). You can also use `label` instead of `text` to preserve the same API as the standard variant. There is no `getValueFromNode` option for the tree variant.