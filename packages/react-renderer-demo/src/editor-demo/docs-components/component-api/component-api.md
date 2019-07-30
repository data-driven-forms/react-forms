import ExampleLink from './exampleLink';

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

#### Text field

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='text-field' />

#### Text area

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

<ExampleLink to='text-area' />

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

#### Datepicker

|Prop|Type|Description|
|----|:--:|----------:|
|placeholder|node/string|A placeholder|

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
