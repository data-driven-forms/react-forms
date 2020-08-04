import CommonWizard from '../wizard.md';

This a custom component. OnSubmit will send only values from visited steps.

Don't forget hide form controls by setting \`showFormControls\` to \`false\` as a prop of the renderer component.

## Props

| Prop  | Type | Default |  Description |
| ------------- | ------------- | ------------- | ------------- |
| title  | string  | undefined  | Title in header (will show header) |
| description  | string  | undefined  | Description in header |
| buttonLabels  | object  | see below  | Labels for buttons |
| inModal  | bool  | undefined  | show form in modal  |
| container  | HTMLElement | 'div'  | element containing the modal |
| isDynamic  | bool  | undefined  | will dynamically generate steps navigation (=progressive wizard), please use if you use any condition fields which changes any field in other steps (wizards with conditional steps are dynamic by default) |
|showTitles|bool|undefined|If true, step titles will be shown in the wizard body|
|crossroads|array|undefined|Array of field names, which change next steps|
|StepTemplate|componenr|DefaultStepTemplate|Custom component for rendering wizard body content.|

Also accepts these props from the original component: `titleId`, `descriptionId`, `hideClose`, `hasNoBodyPadding`, `navAriaLabel` and `closeButtonAriaLabel`.

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

### Crossroads

With the help of `crossroads` you can manually defined which fields change next steps, it will cause that the wizard navigation is always refreshed, when one of the crossroads name is changed.

Ex.: `crossroads: ['name', 'nested.password']`

<CommonWizard />

### Buttons

Each step can implement its own buttons.

```jsx
const Buttons = () => <div>Hello</div>;

[{
  title: 'foo-step',
  name: '1',
  name: 'foo',
  buttons: Buttons,
  fields: [{
   name: 'foo-field',
  }],
}]
```

The components receives these props:

|Props|Description|
| --- | -------- |
|ConditionalNext|Conditional next button|
|SubmitButton|Default submit button.|
|SimpleNext|Default next button.|
|formOptions|formOptions|
|disableBack|If it's first step, disable back is true.|
|handlePrev|Function to handle back button.|
|nextStep|Next step field from the schema.|
|FieldProvider|FieldProvider|
|handleNext|Function to handle next click.|
|buttonsClassName|Classname of buttons.|
|buttonLabels|Object with labels.|
|renderNextButton|Function which completely handle the next/submit button.|
|StepTemplate|Custom component for rendering wizard body content.|


## How to do substeps

Field in Wizard fields should contain `substepOf` <`string`> which is title of the primary step. Steps with the same substepOf are grouped together by the title of primary step.

Example

Structure:

```jsx
                     //            index
Select Type          // step       1
Configuration        // step       2
  Security           // substep    2 (there is no step 'configuration')
  Credentials        // substep    3
Summary              // step       4
```

```jsx
Schema: [
  {
    name: '1',
    title: 'Select Type',
    nextStep: 'security'
  },
  {
    name: 'security',
    title: 'Security',
    nextStep: 'credentials',
    substepOf: 'Configuration'
  },{
    name: 'credentials',
    title: 'Credentials',
    nextStep: 'summary',
    substepOf: 'Configuration'
  },{
    name: 'summary',
    title: 'Summary'
  },
]
```

Progressive Wizard works same way. It checks if previous step has the same \`substepOf\` value and if so, it grouped them together.
If the value is different, a new primary step is created with the step as a substep.

### React node as substepOf

You can put a React node as `substepOf`. In this case you have to provide an object with keys `name: string` and `title?: ReactNode`.

```jsx
<h2>Custom title</h2>      // name: Configuration
  Security
  Credentials
Summary
```

```jsx
Schema: [
  {
    name: 'security',
    title: 'Security',
    nextStep: 'credentials',
    substepOf: { name: 'Configuration', title: <h2>Custom title</h2> }
  },{
    name: 'credentials',
    title: 'Credentials',
    nextStep: 'summary',
    substepOf: 'Configuration' // title can be put only in the first step
  },{
    name: 'summary',
    title: 'Summary'
  },
]
```

## StepTemplate

To override default wizard body content, you can use `StepTemplate` prop, either in the wizard definition or in the step definition.

StepTemplate

```jsx
StepTemplate = (props) => <div className="custom-div">{props.formFields}</div>
```

StepTemplate receives all the props defined in the step schema plus following props:

|Prop|Description|
|----|-----------|
|formFields|Already rendered fields. You use this or you can use fields prop and render it yourselves.|
|formOptions|Modified formOptions with wizard submit and cancel|
|showTitles|showTitles prop from the wizard definition|
|formRef|Ref used to be put on the first element|

Wizard definition

```jsx
{
  component: 'wizard',
  name: 'wizard',
  StepTemplate,
  fields: [ ... ]
}
```

Step defintion

```jsx
{
  component: 'wizard',
  name: 'wizard',
  fields: [{
    name: 'first-step',
    StepTemplate,
    fields: [ ... ]
  }]
}
```

Don't forget to use `hasNoBodyPadding` in wizard/step definition, to disable padding on the wizard body. Example:

```jsx
{
  component: 'wizard',
  name: 'wizard',
  fields: [{
    name: 'first-step',
    hasNoBodyPadding: true,
    StepTemplate,
    fields: [ ... ]
  }]
}
```

## First step

First step should have on the first position of the `fields` array.

## Variants of Wizard

### Simple wizard

- steps navigation is visible, user can jump back and forward (after visiting the step)
- does not contain any conditional steps
- if you need to change one step according to another (dynamic fields), do not use this (there is no way how to check which fields was changed), instead of that use **progressive wizard**
- if user change some field and make the form invalid, he cannot jump forward until he fix the form

![simplewizard](https://user-images.githubusercontent.com/32869456/58427234-56725680-809f-11e9-8e22-3ce7286b30d2.gif)

### Progressive wizard

- steps are visible as user visits them
- user can jump only back
- use `isDynamic` prop to enforce it
- if you have any conditional fields in the step, you should use `disableForwardJumping` in the step definition, to disable jumping forward in the navigation, otherwise user could miss the changed fields in next steps.
- you can use `crossroads` to define, which fields the wizzard will listen to and change the navigation according to changes of the defined values

![progressivewizard](https://user-images.githubusercontent.com/32869456/58427241-5b370a80-809f-11e9-8e79-a4a829b8d181.gif)

## Useful links

[PF4 wizard implementation](https://www.patternfly.org/v4/documentation/react/components/wizard/)

[Wizard design](https://www.patternfly.org/v4/design-guidelines/usage-and-behavior/wizard)