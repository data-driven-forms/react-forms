This a custom component. OnSubmit will send only values from visited steps.

### Props

| Prop  | Type | Default |  Description |
| ------------- | ------------- | ------------- | ------------- |
| title  | string  | undefined  | Title in header (will show header) |
| buttonLabels  | object  | see below  | Labels for buttons |
| stepsInfo  | object  | undefined  | Information for stepper  |
| inModal  | bool  | false  | If form is in a modal (will add a cancel icon to the header)  |

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

```jsx
[
      { title: 'Add a source' }, // step 1
      { title: 'Configure a source' }, // step 2
      { title: 'Summary' }, // step 3
      ...
],
```

![image](https://user-images.githubusercontent.com/32869456/52336077-393c4e00-2a04-11e9-9aad-d591515cdba6.png)

### Docs for steps

| Props  | Type  |  Description |
| ------------- | ------------- | ------------- |
| stepKey  | string, number | For first step: 1, otherwise anything |
| nextStep  | object/stepKey of next step | See below |
| fields  | array | As usual |

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

### Useful links

[PF3 wizard implementation](https://github.com/patternfly/patternfly-react/tree/master/packages/patternfly-3/patternfly-react/src/components/Wizard)

[Wizard PF3 demo](https://rawgit.com/patternfly/patternfly-react/gh-pages/patternfly-3/index.html?knob-Show%20Help=true&knob-Field%20Level%20Help%20Content=Please%20specify%20Country%20code%20%3Cbr%3E%20%3Ca%20target%3D%27_blank%27%20href%3D%27https%3A%2F%2Fcountrycode.org%2F%27%3EClick%20here%20for%20a%20list%20of%20Country%20codes%3C%2Fa%3E&knob-Close%20Popover=true&knob-Show%20Modal=true&selectedKind=patternfly-react%2FCommunication%2FWizard%2FComponents&selectedStory=Wizard&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fstories%2Fstories-panel)

[Wizard design](https://www.patternfly.org/pattern-library/communication/wizard/#design)
