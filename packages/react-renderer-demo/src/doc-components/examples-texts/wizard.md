This a custom component. OnSubmit will send only values from visited steps.

**Props**

| Prop  | Type | Default |  Description |
| ------------- | ------------- | ------------- | ------------- |
| buttonLabels  | object of nodes  | see below  | Labels for buttons |
| stepsInfo  | object  | undefined  | Information for building the stepper  |
| ButtonContainerProps  | object  | {}  | Props passed to Grid wrapping buttons  |
| StepperProps  | object  | {}  | Props passed to the Stepper component  |
| WizardBodyProps  | object  | {}  | Props passed to Grid wrapping fields and the button container  |
| WizardProps  | object  | {}  | Props passed to the root Grid |

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

**Format of stepsInfo**

|Key|Type|Default|Description|
|---|----|-------|-----------|
|label/title|string|undefined|Text for the title|
|StepLabelProps|object|{}|Props passed to StepLabel component|
|StepProps|object|{}|Props passed to Step component|

```jsx
[
      { title: 'Add a source', StepLabelProps: { style: { color: 'red' } } }, // step 1
      { title: 'Configure a source' }, // step 2
      { title: 'Summary' }, // step 3
      ...
],
```

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
