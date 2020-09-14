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

## No isRequired

Carbon recommends to mark only optional fields (see [here](https://www.carbondesignsystem.com/patterns/forms-pattern#building-a-form), so there is no `isRequired` prop.)

**Required field**

🛑

```jsx
{
   component: 'text-field',
   label: 'login',
   isRequired: true,
}
```

🆗

```jsx
{
   component: 'text-field',
   label: 'login',
}
```

**Optional field**

🛑

```jsx
{
   component: 'text-field',
   label: 'description',
}
```

🆗

```jsx
{
   component: 'text-field',
   label: 'description (optional)',
}
```

The Carbon documentation also suggests **to group** optional fields to avoid repeatable `(optional)` text.

## Select

### No isClearable

Carbon select does not support `isClearable` option, instead of it use an option with null.

🛑

```jsx
{
   component: 'select',
   label: 'select',
   isClearable: true,
   options: [
        {value: 'option 1', label: 'first option'},
        {value: 'option 2', label: 'second option'}
    ]
}
```

🆗

```jsx
{
   component: 'select',
   label: 'select',
   options: [
         {label: 'none', value: null},
         {value: 'option 1', label: 'first option'},
         {value: 'option 2', label: 'second option'}
    ]
}
```

### Single select cannot be isSearchable

No known workaround.

### No async filtering options in multiselect

No known workaround.

_Possible workaround: reimplement Carbon select as we did for PF4/PF3_

## Missing helper texts, errors

Following components does not support `helperText` and won't show error messages

```
componentTypes.RADIO,
componentTypes.SWITCH,
componentTypes.CHECKBOX,
componentTypes.DATE_PICKER,  // has error message
componentTypes.TIME_PICKER, // has error message
componentTypes.SLIDER
```

Possible workaround with implementing a custom `helperText` component.

</DocPage>
