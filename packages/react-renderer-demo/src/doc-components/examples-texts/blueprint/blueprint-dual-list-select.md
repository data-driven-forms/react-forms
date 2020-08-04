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
|allToLeft|Boolean|true|Hides all to left button|
|allToRight|Boolean|true|Hides all to right button|
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
|MenuItemProps|object|Props passed to MenuItem|

### Customization

|Props|
|-----|
|LeftWrapperProps|
|RightWrapperProps|
|ButtonGroupProps|
|ToRightButtonProps|
|AllToRightButtonProps|
|AllToLeftButtonProps|
|ToLeftButtonProps|
|LeftControlGroupProps|
|LeftInputGroupProps|
|LeftButtonProps|
|RightControlGroupProps|
|RightInputGroupProps|
|RightButtonProps|
|LeftMenuProps|
|LeftMenuItemProps|
|RightMenuProps|
|RightMenuItemProps|
