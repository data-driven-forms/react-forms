import CommonWizard from '../wizard.md';

This a custom component. OnSubmit will send only values from visited steps.

## Props

|Prop|Type|Default|Description|
|-------------|-------------|-------------|-------------|
|buttonLabels|object of nodes | see below | Labels for buttons |
|WizardProps | object | {} | Props passed to the root div |
|ButtonToolbarProps | object | {} | Props passed to the div wrapping buttons |
|DirectionButtonProps | object | {} | Props passed to the div wrapping back/next buttons |
|CancelButtonProps| object | {} | Props passed to the cancel button |
|BackButtonProps| object | {} | Props passed to the back button |
|NextButtonProps| object | {} | Props passed to the next button |
|SubmitButtonProps| object | {} | Props passed to the submit button |

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

<CommonWizard />
