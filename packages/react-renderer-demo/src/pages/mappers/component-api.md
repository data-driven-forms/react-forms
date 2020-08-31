import ExampleLink from '@docs/components/common/example-link';
import DocPage from '@docs/doc-page';

<DocPage>

# Components API

## Common props for all form fields

There is very short list of that can be applied to every form field

|Prop|Type|Description|
|----|:--:|----------:|
|name|string|Unique field identifier. Value of this field will be under same key|
|component|string|Component identifier from componentMapper. Rendered component is chosen by this value|
|hideField|boolean|Equivalent to html attribute `hidden`. Hides the field but it remains in DOM. Note that the field is still impacted by the form state. Validation will still apply on hidden field but the error message will not be displayed.|

Each mapper provided in `react-forms` provides a default API for standard components. If you want to keep compatibility between our mappers and custom ones, please follow these APIs. Otherwise, it is up to you, which props you choose.

Standard components are:
<br />

|Change form state (input fields)|Others|
|---------------------------------------|------|
|text field|subform|
|textarea|tabs/tab item|
|select|wizard|
|checkbox|plain text|
|radio|
|switch|
|timepicker/datepicker|

## Form fields components

Basic components that can change the form state (inputs) share common props. These components are using [useFieldApi](/mappers/custom-mapper#usefieldapi) or [FieldProvider](/mappers/custom-mapper#fieldprovider) to access the form state.

|Prop|Type|Description|
|----|:--:|----------:|
|label|node/string|A label of the field|
|description|node/string|Description of the field|
|helperText|node/string|Helper text: format, hint, etc.|
|hideLabel|boolean|To hide label|
|isRequired|boolean|Is the field required?|
|isDisabled|boolean|Is the field disabled?|
|isReadOnly|boolean|Is the field readOnly?|
|initialValue|custom|There are two ways how to set initial values in the form: you can use either the [initialValues](/components/renderer) prop for the whole form or you can set the value in the schema for each field separately. For more information, please see [here](https://final-form.org/docs/react-final-form/types/FieldProps#initialvalue).|

### Text field

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='text-field' />

### Textarea

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='textarea' />

### Select

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|
|options|array|Options in format of { label: 'Label', value: value }|
|loadOptions|function|A function for loading a options asynchronously|
|loadingMessage|node/string|A message which will shown as a placeholder during the loading|
|simpleValue|boolean|Simple value (no isMulti)|
|isMulti|boolean|Allows to choose more options|
|isClearable|boolean|Allows to clear the selected option|
|isSearchable|boolean|Allows to search in the options|

<ExampleLink to='select' />

### Checkbox

|Prop|Type|Description|
|----|:--:|----------:|
|options|array|Options in format { label: 'Label', value: value }, it will make it multiple a choice list. (optional)|

<ExampleLink to='checkbox-multiple' text='Multiple checkbox example'/>
<br />
<ExampleLink to='checkbox' text='Single checkbox example'/>

### Radio

|Prop|Type|Description|
|----|:--:|----------:|
|options|array|Options in format { label: 'Label', value: value }|

<ExampleLink to='radio' />

### Switch

|Prop|Type|Description|
|----|:--:|----------:|
|onText|string|A text which is shown when the switch is on (checked)|
|offText|string|A text which is shown when the switch is off|

<ExampleLink to='switch' />

### Datepicker

This component is using [react-day-picker](https://react-day-picker.js.org/docs/) as a base component.

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|
|variant|['date-time', 'date']|variant of date picker|,
|locale|string|Defines date picker locale. See react-day-picker [docs](https://react-day-picker.js.org/docs/localization#moment) for more info |
|todayButtonLabel|string|Label for today button|
|showTodayButton|bool|show/hide today button|
|isDisabled|bool|disable component|
|disabledDays|array|Mark specific days or a range of days as disabled. [More info](https://react-day-picker.js.org/examples/disabled). In order to store this prop to JSON we allow using string. Any string accepted by Date constructor is valid value. There is an alias for current date: `today`|
|closeOnDaySelect|bool|Close the calendar popover after selecting date.|
|inputFormat|string|Set date format for the input. [Using same convetion as moment.js](https://devhints.io/moment)|

<ExampleLink to='date-picker' />

### Timepicker

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='time-picker' />

### Slider

|Prop|Type|Description|
|----|:--:|----------:|
|min|number|The minimum permitted value|
|max|number|The maximum permitted value|
|step|number|The stepping interval|

<ExampleLink to='slider' />

### Dual list select

|Prop|Type|Description|
|----|:--:|----------:|
|options|array|Options in format of { label: 'Label', value: value }|

<ExampleLink to='dual-list-select' />

### Field array

|Prop|Type|Description|
|----|:--:|----------:|
|fields|array|Form fields|
|minItems|number|Minimal number of items|
|maxItems|min|Maximum number of items|
|fields|array|Form fields|
|defaultItem|any|Default item|

<ExampleLink to='field-array' />

## Others components

### Subform

|Prop|Type|Description|
|----|:--:|----------:|
|title|node/string|A title|
|description|node/string|A description|
|fields|array|Form fields|

<ExampleLink to='sub-form' />

### Tab/tab item

Tab <br/>

|Prop|Type|Description|
|----|:--:|----------:|
|title|node/string|A title|
|fields|array|An array of tab items|

Tab item <br/>

|Prop|Type|Description|
|----|:--:|----------:|
|fields|array|An array of form fields|

<ExampleLink to='tabs' />

### Wizard

Wizard <br />

|Prop|Type|Description|
|----|:--:|----------:|
|title|node/string|Title in header (will show header)|
|description|node/string|Description in header|
|buttonLabels|object|Labels for buttons|
|fields|array|An array of wizard steps|

Wizard step <br/>

|Prop|Type|Description|
|----|:--:|----------:|
|title|node/string|Step title|
|name|string, number|Uniq name of the step|
|nextStep|object/name of next step|See [wizard documentation](/mappers/wizard?mapper=mui)|
|fields|array|An array of form fields|

<ExampleLink to='wizard' />

### Plain text

|Prop|Type|Description|
|----|:--:|----------:|
|label|node/string|A text|
|variant|string|A variant (depends on mappers: html tags)|

<ExampleLink to='plain-text' />

</DocPage>
