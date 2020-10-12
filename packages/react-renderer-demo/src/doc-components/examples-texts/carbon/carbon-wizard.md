import CommonWizard from '../wizard.md';

This a custom component. OnSubmit will send only values from visited steps.

## Props

|Prop|Type|Default|Description|
|-------------|-------------|-------------|-------------|
|buttonLabels|object of nodes | see below | Labels for buttons |
|BackButtonProps| object | {} | Props passed to the back [button](https://react.carbondesignsystem.com/?path=/docs/button--default) |
|NextButtonProps| object | {} | Props passed to the next [button](https://react.carbondesignsystem.com/?path=/docs/button--default) |
|SubmitButtonProps| object | {} | Props passed to the submit [button](https://react.carbondesignsystem.com/?path=/docs/button--default) |
| stepsInfo  | object  | undefined  | Information for stepper  |
|ButtonSetProps|object|{}|Props passed to a div wrapping buttons|
|ProgressIndicatorProps|object|{}|Props passed to [ProgressIndicator component](https://react.carbondesignsystem.com/?path=/story/progressindicator--default)|
|vertical|boolean|false|Will make wizard vertical|
|WizardBodyProps|object|{}|Passed to an element wrapping fields in wizard. In a vertical wizard the element is a div, when horizontal, it's [Column component](https://react.carbondesignsystem.com/?path=/docs/grid--auto-columns)|

### Default buttonLabels

```jsx
{
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
}
```

You can rewrite only selection of them, e.g.

```jsx
{
  submit: 'Deploy',
}
```

(Others will stay default)

### Format of stepsInfo

Extends [ProgressStep component](https://react.carbondesignsystem.com/?path=/story/progressindicator--default).

```jsx
[
      { title: 'Add a source' }, // step 1
      { title: 'Configure a source' }, // step 2
      { title: 'Summary' }, // step 3
      ...
],
```

<CommonWizard />
