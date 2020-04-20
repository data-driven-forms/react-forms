import Grid from '@material-ui/core/Grid'
import ListOfContents from '../src/helpers/list-of-contents';
import CodeExample from '../src/components/code-example';

<Grid container item>
<Grid item xs={12} md={10}>

# Testing

Always make sure that your **custom components** and their features are tested to avoid bugs and runtime crashes.

In these examples we will use [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/docs/api/) but the same rules apply to any other testing libraries.

## Testing the renderer

If you want to test your whole form, the easiest way is just to render it as you would normaly. Be carefoul that you will have to mock all your async validations and submitions. Data driven forms have a great test coverage so its not necessary to test core features.

Bellow is an example of a form with a async validation and a conditional field. All features in the data driven forms packages are tested by the library. It should not be required to tests them most of the time.

<CodeExample source="tests/form-renderer.test" />

## Testing custom components

Components that are using `useFieldApi` or `useFormApi` must be children of contexts. Therefore they must be wrapped inside these contexts when testing. The simplest way to test them, is just rendering them with the FormRenderer, but there may be cases when that is not possible. We will show you both options.

### With renderer

Set up your renderer to make it easier to test the component specific features. Use initial values to trigger falsey validation results to avoid unnecessary changes simlation.

<CodeExample source="tests/custom-component-with-renderer.test" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="testing" />
</Grid>
</Grid>
