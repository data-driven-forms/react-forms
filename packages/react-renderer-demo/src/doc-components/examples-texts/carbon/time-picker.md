## Props

This component also accepts all other original props, please see [here](https://react.carbondesignsystem.com/?path=/story/timepicker--default)!

|Props|Description|default|
|-----|-----------|-------|
|defaultTimezone|string - a value of default timezone, use only in Date varian|undefined|
|useStringFormat|boolean - save value as string|false|
|twelveHoursFormat|boolean - if true an AM/PM selector is shown|false|
|timezones|array of timezones - if not empty, an timezone selector is shown|undefined|

### useStringFormat

If set to **true**, then the value is stored as a **string**. You need to parse it yourself. You should also provide a proper validation, currently the component does not check what users enter.

Examples:

`12:04`

`12:04 PM`

`12:04 PM EST` (timezone's value is being used)

<br />

If not set (or set to **false**), then the value is stored as a **Date**. You need to use `getHours` (see [more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)) and `getMinutes` (see [more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)) to obtain the values in your submit function.

### Timezone

Extends [SelectItem component](https://react.carbondesignsystem.com/?path=/story/select--default).

|Option|Description|
|-----|-----------|
|label|A label of the timezone|
|value|A value of the timezone used in `new Date('... ${value}')`|
|showAs|Timezone that will be used to convert the value `value.toLocaleTimeString(..., { ..., timeZone: showsAs })`. Supported timezones can be found [here](https://cloud.google.com/dataprep/docs/html/Supported-Time-Zone-Values_66194188). **Not used when string format.**|

#### value and showAs relationship

To make this component work when not set to the string format, please provide corresponding `showAs` for each timezone.

```jsx
{
    label: 'PST',
    value: 'PST',
    showsAs: 'US/Eastern'
}
```
