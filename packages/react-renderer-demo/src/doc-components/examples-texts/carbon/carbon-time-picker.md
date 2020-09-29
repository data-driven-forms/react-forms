## Props

This component also accepts all other original props, please see [here](https://react.carbondesignsystem.com/?path=/story/timepicker--default)!

|Props|Description|default|
|-----|-----------|-------|
|twelveHoursFormat|boolean - if true an AM/PM selector is shown|false|
|timezones|array of timezones - if not empty, an timezone selector is shown|undefined|

### Timezone

Extends [SelectItem component](https://react.carbondesignsystem.com/?path=/story/select--default).

|Option|Description|
|-----|-----------|
|label|A label of the timezone|
|value|A value of the timezone used in `new Date('... ${value}')`|
|showAs|Timezone that will be used to convert the value `value.toLocaleTimeString(..., { ..., timeZone: showsAs })`. Supported timezones can be found [here](https://cloud.google.com/dataprep/docs/html/Supported-Time-Zone-Values_66194188).|

#### value and showAs relationship

To make this component work, please provide corresponding `showAs` for each timezone.

```jsx
{
    label: 'PST',
    value: 'PST',
    showsAs: 'US/Eastern'
}
```
