This a custom component. OnSubmit will send only values from visited steps.

### Docs for steps

| Props  | Type  |  Description |
| ------------- | ------------- | ------------- |
| stepKey  | string, number | For first step: 1, otherwise anything |
| buttonLabels  | object  | See below  |
| nextStep  | object/stepKey of next step | See below |
| fields  | array | As usual |

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

- nextStep can be stepKey of the next step
- or you can branch the way by using of object:

```jsx
nextStep: {
        when: 'source-type', // name of field, where deciding value is stored
        stepMapper: {
          aws: 'aws', // value: 'stepKey' of next step
          google: 'google',
          ...
        },
},
```
