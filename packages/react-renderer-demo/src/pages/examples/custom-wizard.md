import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';
import Wizard from '../../doc-components/examples-texts/wizard.md';

<DocPage>

# Custom wizard

## Common wizard

To implement a custom wizard form, you can use the common wizard component. This component provides basic functionality such as branching, submitting only visited values, etc. Also, this wizard is used in all of our provided mappers.

When implementing custom wizard, please keep it under `wizard` component key so the schema validator won't expect that nested fields (=wizard steps definitions) have a component property. If this is not possible, you can implement a mock component that will be used as a component for wizard steps.

To use the component import it from the common package:

```jsx
--- { "switchable": false } ---
import Wizard from '@data-driven-forms/common/wizard';
```

And use your wizard component as `Wizard` prop:

```jsx
const CustomWizard = (props) => { ... }

const WrappedWizard = (props) => <Wizard Wizard={CustomWizard} {...props} />
```

Custom wizard (and all other nested components) then can access the wizard api via `WizardContext`:

```jsx
--- { "switchable": false } ---
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';

const CustomWizard = (props) => {
   const {
    crossroads,
    formOptions,
    currentStep,
    handlePrev,
    onKeyDown,
    jumpToStep,
    setPrevSteps,
    handleNext,
    navSchema,
    activeStepIndex,
    maxStepIndex,
    isDynamic
  } = useContext(WizardContext);

  ...
}
```

You can notice that this context also contains `formOptions`. It contains the same functions as the [regular one](/hooks/use-form-api), however, some of the functions are enhanced to support wizard functionality.

## Common documentation

<Wizard />

## Preview

Following example shows only the basic custom implementation. To see other functionality as a dynamic navigation, check implementation in one of our mappers. (The [PF4 wizard](/provided-mappers/wizard?mapper=pf4) provides the most complex functionality.)

<CodeExample source="components/examples/custom-wizard" mode="preview" />

</DocPage>