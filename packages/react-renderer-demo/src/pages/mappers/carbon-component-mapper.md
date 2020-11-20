import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';

<DocPage>

# Carbon Design System

<ComponentMapperBar prefix="carbon" href="https://www.carbondesignsystem.com/" />

Carbon Component Mappers provides components from IBM's [Carbon Design System](https://www.carbondesignsystem.com/).

## Installation

```bash
npm install --save @data-driven-forms/carbon-component-mapper
```
or
```bash
yarn add @data-driven-forms/carbon-component-mapper
```

Carbon has to be installed seperately. Please follow their [guidelines](https://www.carbondesignsystem.com/developing/frameworks/react#install).

## ValidateOnMount

Ant Design provides an option to validate a field when the component is mounted. Just set `validateOnMount` to `true`.

```jsx
{
    component: 'text-field',
    name: 'required-field',
    validate: [{type: 'required'}],
    validateOnMount: true
}
```

This field will show the error immediately.

## Select

### isClearable and isSearchable turn on each other

Carbon doesn't provide a component that is searchable but not clearable and vice versa. Therefore, if one of these two options is turned on, it automatically triggers the other.


### No async filtering options in multiselect

No known workaround.

_Possible workaround: reimplement Carbon select as we did for PF4/PF3_

## WrapperProps

Components that do not support `helperText` natively are wrapped in a `div` element. To pass props to this div, please use `WrapperProps` prop.

Wrapped components:

- Single checkbox
- DatePicker
- Slider
- Switch
- TimePicker

</DocPage>
