## Docs for steps

|Props|Type|Required|Default|Description|
|-----|----|--------|-------|-----------|
|name|string,number|no|`undefined`|Name of the step|
|nextStep|object/stepKey of next step/function|no|`undefined`|See below|
|fields|array|yes|`undefined`|As usual|
|conditionalSubmitFlag|string|no|`"@@ddf-common-wizard__conditional-submit-step"`|See below|

### nextStep

A) **string** - no branching, name of the next step

```jsx
{
  nextStep: 'next-step-name'
}
```

B) **object** - simple branching

```jsx
nextStep: {
        when: 'source-type',
        stepMapper: {
          aws: 'aws-step',
          google: 'google-step',
          ...
        },
},
```

i.e.: When `source-type` is `asw` go to to the `aws-step`.

C) **function** - complex branching

another option is to use custom function. The custom function receives as the first argument an object with values and the function has to return a `name` in string.

```jsx
nextStep: ({ values }) => (values.aws === '123' &&& values.password === 'secret') ? 'secretStep' : 'genericStep'
```

D) **conditional submit step**

Based on a form state value, a step can change into the last step in the wizard and show *submit* button instead of *next* button.

With default constant: `@@ddf-common-wizard__conditional-submit-step`

You can import this constant:

```jsx
--- { "switchable": false } ---
import { CONDITIONAL_SUBMIT_FLAG } from '@data-driven-forms/common/wizard';

...
// next step definition

nextStep: {
        when: 'source-type',
        stepMapper: {
          aws: 'aws-step',
          google: CONDITIONAL_SUBMIT_FLAG,
          ...
        },
},
```

Or with custom constant value defined by `conditionalSubmitFlag` prop:

```jsx
const schema = {
  fields: [{
    {
      "component": "wizard",
      "name": "wizard",
      // custom flag definition
      conditionalSubmitFlag: 'make-me-final-step',
      fields: [{
        name: 'step-1',
        // next step definition
        nextStep: {
          when: 'value',
          stepMapper: {
            "value-one": 'step-2',
            "value-two": 'make-me-final-step',
          },
        }
        ...
      }, {
        name: 'step-2'
        ...
      }]
...
  }}]
}
```

### initialState

It is possible to set the initial state of the wizard component. This can be useful when an application returns users to a specific step.

```jsx
{
  component: 'wizard',
  ..., // fields, etc.
  initialState: {
    activeStep: 'second-step', // name of the active step
    activeStepIndex: 1, // active index
    maxStepIndex: 1, // max achieved index
    prevSteps: ['first-step'], // array with names of previously visited steps
    registeredFieldsHistory: { 'first-step': ['field'] }
    // array of registered fields for each visited step
    // only values from registered fields will be submitted
  }
}
```

How to get the state from existing wizard? The state is passed to both `onCancel` and `onSubmit`:

A) `onSubmit` - `(values, formApi, wizardState) => ...`
B) `onCancel` - `(values, wizardState) => ...`

### WizardContext

Wizard share its configuration and props via `WizardContext`.

```jsx
import { WizardContext } from '@data-driven-forms/react-form-renderer';

  const {
    crossroads, // variables changing the navigation
    formOptions, // modified formOptions with submit and cancel handlers
    currentStep, // curent step object
    handlePrev, // going back in the wizard
    onKeyDown, // overrides form onKeyDown event for the wizard
    jumpToStep, // jump to step, jumpToStep(index, formOptions.valid)
    setPrevSteps, // rewrites the nav schema, use to change the navigation
    handleNext, // jumps to the nextStep: handleNext(nextStep)
    navSchema, // internal object representing the schema of current wizard flow
    activeStepIndex, // active index of the step
    maxStepIndex, // maximal achieved step
    isDynamic, // if form is dynamic (= it is branching steps)
    prevSteps // array with names of previous steps
  } = useContext(WizardContext);
```

*This API is subject to change. If you implement custom components using these variables and functions, make sure that it is fully tested to prevent bugs when updating.*
