This a custom component with a custom design.

## Props

Dual list select is wrapped in a form group, so it accepts all [form group props](/mappers/component-api#formgroupwrappedcomponents).

|Props|Type|Default|Description|
|-----|----|-------|-----------|
|options|array|[]|`[{label, value, ...props}]` *see below*|
|leftTitle|String|'Options'|Title for options|
|rightTitle|String|'Selected'|Title for selected items|
|moveLeftTitle|String|'Move selected to left'|Tooltip for move to left button|
|moveRightTitle|String|'Move selected to right'|Tooltip for move to right button|
|moveAllLeftTitle|String|'Move all to left'|Tooltip for move all to left button|
|moveAllRightTitle|String|'Move all to right'|Tooltip for move all to right button|
|noValueTitle|String|'No selected'|Placeholder for empty value|
|noOptionsTitle|String|'No available options'|Placeholder for empty options|
|filterOptionsTitle|String|'Filter options'|Placeholder for options filter input|
|filterValueTitle|String|'Filter selected value'|Placeholder for value filter input|
|filterValueText|String|'Remove your filter to see all selected'|Placeholder for value when there is no filtered value|
|filterOptionsText|String|'Remove your filter to see all options'|Placeholder for options when there is no filtered option|

### Options

|Props|Type|Description|
|-----|----|-----------|
|value|string|Value of the option|
|label|node|ListItemText primary text|
|ListRowProps|object|Props for [StructuredListRow](https://react.carbondesignsystem.com/?path=/docs/structuredlist--selection)|
|ListCellProps|object|Props for [StructuredListCell](https://react.carbondesignsystem.com/?path=/docs/structuredlist--selection)|
|GridProps|object|Props for [Grid](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|RowProps|object|Props for [Row](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|LabelProps|object|Props for [Column](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns) containing the label|
|CheckmarkProps|object|Props for [Column](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns) containing the checkmark|

### Customization

You can modify elements of titles by setting a string with HTML elements:

|Props|
|-----|
|LeftTitleElement|
|RightTitleElement|

All these props are object:

|Props|Component|
|-----|---------|
|LeftTitleProps|depends on LeftTitleElement|
|RightTitleProps|depends on RightTitleElement|
|FormGroupProps|[FormGroup](https://react.carbondesignsystem.com/?path=/docs/form--default)|
|GridProps|[Grid](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|RowProps|[Row](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|OptionsColumnProps|[Column](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|ButtonColumnProps|[Column](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|ValuesColumnProps|[Column](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|
|AddButtonProps|[Button](https://react.carbondesignsystem.com/?path=/docs/button--default)|
|AddAllButtonProps|[Button](https://react.carbondesignsystem.com/?path=/docs/button--default)|
|RemoveButtonProps|[Button](https://react.carbondesignsystem.com/?path=/docs/button--default)|
|RemoveAllButtonProps|[Button](https://react.carbondesignsystem.com/?path=/docs/button--default)|
|LeftToolbarProps|div|
|RightToolbarProps|div|
|LeftSearchProps|[Search](https://react.carbondesignsystem.com/?path=/docs/search--default)|
|RightSearchProps|[Search](https://react.carbondesignsystem.com/?path=/docs/search--default)|
|LeftSortProps|[TooltipIcon](https://react.carbondesignsystem.com/?path=/docs/tooltipicon--default)|
|RightSortProps|[TooltipIcon](https://react.carbondesignsystem.com/?path=/docs/tooltipicon--default)|
|LeftListProps|[StructuredList](https://react.carbondesignsystem.com/?path=/docs/structuredlist--selection)|
|LeftBodyProps|[StructuredListBody](https://react.carbondesignsystem.com/?path=/docs/structuredlist--selection)|
|RightListProps|[StructuredList](https://react.carbondesignsystem.com/?path=/docs/structuredlist--selection)|
|RightBodyProps|[StructuredListBody](https://react.carbondesignsystem.com/?path=/docs/structuredlist--selection)|