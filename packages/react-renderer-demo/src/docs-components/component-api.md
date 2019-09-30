import { NavLink } from 'react-router-dom';
import ExampleLink from './component-api/exampleLink';

### Components API

Each mapper provided in `react-forms` provides a default API for standard components. Standard components are:
<br />

Wrapped in formGroup: <br/>
&nbsp;&nbsp;text field <br/>
&nbsp;&nbsp;text area <br/>
&nbsp;&nbsp;select <br/>
&nbsp;&nbsp;checkbox <br/>
&nbsp;&nbsp;radio <br/>
&nbsp;&nbsp;switch <br/>
&nbsp;&nbsp;timepicker/datepicker <br/>
<br />

Others: <br/>
&nbsp;&nbsp;subform <br/>
&nbsp;&nbsp;tab/tab item <br/>
&nbsp;&nbsp;wizard <br/>

### FormGroup wrapped components

Basic components are wrapped in formGroup. FormGroup provides a standard API to show labels, helper texts, errors, etc.

All those components provides a shared group of props:

|Prop|Type|Description|
|----|:--:|----------:|
|label|node/string|A label of the field|
|description|node/string|Description of the field|
|helperText|node/string|Helper text: format, hint, etc.|
|hideLabel|boolean|To hide label|
|isRequired|boolean|Is the field required?|
|isDisabled|boolean|Is the field disabled?|
|isReadOnly|boolean|Is the field readOnly?|
|initialValue|custom|There are two ways how to set initial values in the form: you can use either the <NavLink to="/renderer/renderer-api">initialValues</NavLink> prop for the whole form or you can set the value in the schema for each field separately. For more information, please see [here](https://final-form.org/docs/react-final-form/types/FieldProps#initialvalue).|

#### Text field

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='text-field' />

#### Text area

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='textarea-field' />

#### Select

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|
|options|array|Options in format of { label: 'Label', value: value }|
|loadOptions|function|A function for loading a options asynchronously|
|loadingMessage|node/string|A message which will shown as a placeholder during the loading|
|simpleValue|boolean|Simple value (no multi)|
|isMulti|boolean|Allows to choose more options|
|isClearable|boolean|Allows to clear the selected option|
|isSearchable|boolean|Allows to search in the options|

<ExampleLink to='select-field' />

#### Checkbox

|Prop|Type|Description|
|----|:--:|----------:|
|options|array|Options in format { label: 'Label', value: value }, it will make it multiple a choice list. (optional)|

<ExampleLink to='checkbox-multiple' text='Multiple checkbox example'/>
<br />
<ExampleLink to='checkbox' text='Single checkbox example'/>

#### Radio

|Prop|Type|Description|
|----|:--:|----------:|
|options|array|Options in format { label: 'Label', value: value }|

<ExampleLink to='radio' />

#### Switch

|Prop|Type|Description|
|----|:--:|----------:|
|onText|string|A text which is shown when the switch is on (checked)|
|offText|string|A text which is shown when the switch is off|

<ExampleLink to='switch-field' />

#### Datepicker

This component is using [react-day-picker](https://react-day-picker.js.org/docs/) as a base component.

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|
|variant|['date-time', 'date']|variant of date picker|,
|locale|string|Defines date picker locale. See react-day-picker [docs](https://react-day-picker.js.org/docs/localization#moment) for more info |
|todayButtonLabel|string|Label for today button|
|showTodayButton|bool|show/hide today button|
|isDisabled|bool|disable component|
|disabledDays|array|Mark specific days or a range of days as disabled. [More info](https://react-day-picker.js.org/examples/disabled)|
|closeOnDaySelect|bool|Close the calendar popover after selecting date.|

<ExampleLink to='date-picker' />

#### Timepicker

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='time-picker' />

### Others components

#### Subform

|Prop|Type|Description|
|----|:--:|----------:|
|title|node/string|A title|
|description|node/string|A description|
|fields|array|A form fields|

<ExampleLink to='sub-form' />

#### Tab/tab item

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

#### Wizard

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
|stepKey|string, number|For first step: 1, otherwise anything|
|nextStep|object/stepKey of next step|See below|
|fields|array|An array of form fields|

<ExampleLink to='wizard' />
