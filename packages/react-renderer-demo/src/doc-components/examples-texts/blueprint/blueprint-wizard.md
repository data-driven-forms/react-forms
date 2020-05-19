This a custom component. OnSubmit will send only values from visited steps.

**Props**

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

**Default buttonLabels**

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

**Docs for steps**

| Props  | Type  |  Description |
| ------------- | ------------- | ------------- |
| name  | string, number | Name of the step |
| nextStep  | object/stepKey of next step/function | See below |
| fields  | array | As usual |

- nextStep can be name of the next step
- or you can branch the way by using of object:

```jsx
nextStep: {
        when: 'source-type', // name of field, where deciding value is stored
        stepMapper: {
          aws: 'aws', // value: 'name' of next step
          google: 'google',
          ...
        },
},
```

- another option is to use custom function. The custom function receives as the first argument an object with values and the function has to return a `name` in string.

```jsx
nextStep: ({ values }) => (values.aws === '123' &&& values.password === 'secret') ? 'secretStep' : 'genericStep'
```
