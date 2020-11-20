import CommonWizard from '../wizard.md';

This a custom component. OnSubmit will send only values from visited steps.

## Props

|Prop|Type|Default|Description|
|-------------|-------------|-------------|-------------|
|buttonLabels|object of nodes | see below | Labels for buttons |
|stepsInfo|array of objects| [] | Titles for steps |
|WizardProps | object | {} | Props passed to the root div |
|ButtonToolbarProps | object | {} | Props passed to the div wrapping buttons |
|DirectionButtonProps | object | {} | Props passed to the div wrapping back/next buttons |
|CancelButtonProps| object | {} | Props passed to the cancel button |
|BackButtonProps| object | {} | Props passed to the back button |
|NextButtonProps| object | {} | Props passed to the next button |
|SubmitButtonProps| object | {} | Props passed to the submit button |

### stepsInfo

```jsx
stepsInfo: [
  { title: 'Add a source', subTitle: 'Source' },
  { title: 'Configure a source' },
  { title: 'Summary' }
]
```

Supplying `stepsInfo` will create a steps component on top of the form displaying each step title and allowing for easy navigation. It should be an array of objects, one per step.

The object items will be passed as props to a step component. See [here](https://ant.design/components/steps/#Steps.Step).

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
