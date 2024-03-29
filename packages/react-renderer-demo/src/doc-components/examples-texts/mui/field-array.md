MUI component mapper provides an experimental implementation of field array.

**Props**

|Prop|Type|Description|
|:---|:--:|----------:|
|label|`node`|Label of the array.|
|description|`node`|Description of the array.|
|fields|`array`|A group of fields, which are being added to the array.|
|defaultItem|`any`|Default item which is inserted into a newly created fields group. If you have nested names, don't forget you need to insert an object!|
|minItems|`number`|Remove button is disabled, if the length of the array is equal or smaller.|
|maxItems|`number`|Add button is disabled, if the length of the array is equal or bigger.|
|noItemsMessage|`node`|A message which is shown, when there are no items in the array.|
|buttonLabels|`object`|`{add: 'ADD', remove: 'REMOVE'}` sets labels of buttons.|

**Revert removal**

MUI field array allow users to revert latest removal actions.

## Naming

Fields can contain names, then the value will be handled as array of objects.

```jsx
const fields = [
    { name: 'name', ... },
    { name: 'lastname', ... }
]

[
    { name: value1.name, lastname: value1.lastname },
    { name: value2.name, lastname: value2.lastname },
    ...
]
```

Or you can put a single field with no name. In this case, values are stored as a simple array.

```jsx
const fields = [
    { component: 'text-field' }
]

[ value1, value2, ... ]
```

## Custom component

To implement a custom component, please take a look [here](/components/field-array).

### Composite props

|name|type|default|target component|
|----|----|-------|----------------|
|GridContainerProps|`{}`|[Grid](https://mui.com/api/grid/)|
|HeaderGridProps|`{}`|[Grid](https://mui.com/api/grid/)|
|HeaderProps|`{}`|[Typography](https://mui.com/api/typography/)|
|UndoButtonProps|`{}`|[Button](https://mui.com/api/button/)|
|RedoButtonProps|`{}`|[Button](https://mui.com/api/button/)|
|AddButtonProps|`{}`|[Button](https://mui.com/api/button/)|
|DescriptionGridProps|`{}`|[Grid](https://mui.com/api/grid/)|
|DescriptionProps|`{}`|[Typography](https://mui.com/api/typography/)|
|BodyGridProps|`{}`|[Grid](https://mui.com/api/grid/)|
|NoItemsProps|`{}`|[Typography](https://mui.com/api/typography/)|
|FormHelperTextGridProps|`{}`|[Grid](https://mui.com/api/grid/)|
|FormHelperTextProps|`{}`|[FormHelperText](https://mui.com/api/form-helper-text/)|
|FieldContainerProps|`{}`|[Grid](https://mui.com/api/grid/)|
|FieldGroupGridProps|`{}`|[Grid](https://mui.com/api/grid/)|
|RemoveButtonGridProps|`{}`|[Grid](https://mui.com/api/grid/)|
|RemoveButtonProps|`{}`|[Button](https://mui.com/api/button/)|
