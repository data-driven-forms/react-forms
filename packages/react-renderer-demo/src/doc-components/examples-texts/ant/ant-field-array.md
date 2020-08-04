## Props

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

## Revert removal

Ant field array allow users to revert latest removal actions.

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

## Sub components props

|name|type|default|target component|
|----|----|-------|----------------|
|FormItemProps|object|`{}`|[Form](https://ant.design/components/form/#Form)|
|ArrayItemProps|object|`{}`|[Row](https://ant.design/components/grid/#Row)|
|FieldsContainerProps|object|`{}`|[Col](https://ant.design/components/grid/#Col)|
|RemoveContainerProps|object|`{}`|[Col](https://ant.design/components/grid/#Col)|
|RemoveButtonProps|object|`{}`|[Button](https://ant.design/components/button/)|
|FieldArrayRowProps|object|`{}`|[Row](https://ant.design/components/grid/#Row)|
|FieldArrayRowCol|object|`{}`|[Col](https://ant.design/components/grid/#Col)|
|FieldArrayHeaderProps|object|`{}`|[Row](https://ant.design/components/grid/#Row)|
|FieldArrayLabelProps|object|`{}`|[Title](https://ant.design/components/typography/#Typography.Title)|
|FieldArrayButtonProps|object|`{}`|[Space](https://ant.design/components/space/)
|UndoButtonProps|object|`{}`|[Button](https://ant.design/components/button/)|
|RedoButtonProps|object|`{}`|[Button](https://ant.design/components/button/)|
|AddButtonProps|object|`{}`|[Button](https://ant.design/components/button/)|
|FieldArrayDescriptionProps|object|`{}`|[Text](https://ant.design/components/typography/#Typography.Text)|
|NoItemsMessageProps|object|`{}`|[Text](https://ant.design/components/typography/#Typography.Text)|
|ErrorMessageProps|object|`{}`|[Text](https://ant.design/components/typography/#Typography.Text)|


