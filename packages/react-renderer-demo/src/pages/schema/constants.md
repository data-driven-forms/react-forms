import DocPage from '@docs/doc-page';

<DocPage>

# Constants

**Data Driven Forms** provides two constant files to keep consistency across all projects and prevent typos.

<br/>

## componentTypes

`componentTypes` are string values used in `component` field attributes.

```jsx
import { componentTypes } from '@data-driven-forms/react-form-renderer';
```

Available keys:

```jsx
{
  TEXT_FIELD,
  FIELD_ARRAY,
  CHECKBOX,
  SUB_FORM,
  RADIO,
  TABS,
  DATE_PICKER,
  TIME_PICKER,
  WIZARD,
  SWITCH,
  TEXTAREA,
  SELECT,
  PLAIN_TEXT,
  SLIDER,
  DUAL_LIST_SELECT,
  BUTTON,
  INPUT_ADDON_GROUP,
  INPUT_ADDON_BUTTON_GROUP,
}
```

Usage:

```jsx
{
    component: componentTypes.TEXT_FIELD,
    name: 'login'
}
```

<br/>

## validatorTypes

`validatorTypes` are string values used in `validate` [type attribute](/schema/introduction#validate).

```jsx
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
```

Available keys:

```jsx
{
  REQUIRED,
  MIN_LENGTH,
  MAX_LENGTH,
  EXACT_LENGTH,
  MIN_ITEMS,
  MIN_NUMBER_VALUE,
  MAX_NUMBER_VALUE,
  PATTERN,
  URL,
}
```

Usage:

```jsx
{
    component: componentTypes.TEXT_FIELD,
    name: 'login',
    validate: [{type: validatorTypes.REQUIRED}]
}
```

</DocPage>
