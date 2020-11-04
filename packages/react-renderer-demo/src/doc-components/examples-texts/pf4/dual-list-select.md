This a custom component with a custom design. Things can be changed, after official PF4 release.

## Props

Dual list select is wrapped in a form group, so it accepts all [form group props](/mappers/component-api#formgroupwrappedcomponents).

|Props|Type|Default|Description|
|-----|----|-------|-----------|
|options|array|[]|`[{label, value}]`|
|label|node||FormLabel primary text|
|leftTitle|String|'Options'|Title for options|
|rightTitle|String|'Selected'|Title for selected items|
|moveLeftTitle|String|'Move selected to left'|Tooltip for move to left button|
|moveRightTitle|String|'Move selected to right'|Tooltip for move to right button|
|moveAllLeftTitle|String|'Move all to left'|Tooltip for move all to left button|
|moveAllRightTitle|String|'Move all to right'|Tooltip for move all to right button|
|allToLeft|Boolean|true|Hides all to left button|
|allToRight|Boolean|true|Hides all to right button|
|noValueTitle|String|'No selected'|Placeholder for empty value|
|noOptionsTitle|String|'No available options'|Placeholder for empty options|
|filterOptionsTitle|String|'Filter options'|Placeholder for options filter input|
|filterValueTitle|String|'Filter selected value'|Placeholder for value filter input|
|filterValueText|String|'Remove your filter to see all selected'|Placeholder for value when there is no filtered value|
|filterOptionsText|String|'Remove your filter to see all options'|Placeholder for options when there is no filtered option|
|renderStatus|function|'null'|A function that renders status text below the toolbar filter. For example, display how many items were selected: `({selected, options}) => "selected " + selected + " out of " + options`|

### Customization

MUI DualListSelect provides fully customization. When the props offers Right/Left variant, you can pass props to `RightXXX` or to `LeftXXX` props. Example: `ListGridProps` is Right/Left, so there are two more props: `RightListGridProps` and `LeftListGridProps`. These props overrides the standard props, except `className`, that are being combined. All these props are objects.

|Props|Right/Left variant|
|-----|----|
|FormGroupProps||
|ListProps|yes|
|ListItemProps|yes|
|ToolbarProps|yes|
|FilterFieldProps|yes|
|SearchIconProps|yes|
|SearchIconButtonProps|yes|
|SortIconButtonProps|yes|
|SortIconProps|yes|
|InternalGridProps|yes|
|ListGridProps|yes|
|TitleProps|yes|
|ButtonsGridProps||
|ButtonsInternalFlexProps||
|ButtonFlexProps||
|ToRightFlexProps||
|IconButtonProps||
|ToRightIconButtonProps||
|IconProps||
|AllToRightFlexProps||
|AllToRightIconButtonProps||
|AllToLeftFlexProps||
|AllToLeftIconButtonProps||
|ToLeftFlexProps||
|ToLeftIconButtonProps||
|ToRightIconProps||
|AllToRightIconProps||
|AllToLeftIconProps||
|ToLeftIconProps||