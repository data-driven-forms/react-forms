import Grid from '@material-ui/core/Grid'
import ListOfContents from '../src/helpers/list-of-contents';
import CodeExample from '../src/components/code-example';

<Grid container item>
<Grid item xs={12} md={10}>

# Testing

Always make sure that your **custom components** and their features are tested to avoid bugs and runtime crashes.

In these examples, we will use [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/docs/api/) but the same rules apply to any other testing libraries.

## Testing the renderer

If you want to test your whole form, the easiest way is just to render it as you would normally. Be careful that you will have to mock all your async validations and submissions. Data driven forms have great test coverage so its not necessary to test core features.

Below is an example of a form with an async validation and a conditional field. All features in the data driven forms packages are tested by the library. It should not be required to tests them most of the time.

<CodeExample source="tests/form-renderer.test" />

## Testing custom components

Components that are using `useFieldApi` or `useFormApi` must be children of contexts. Therefore they must be wrapped inside these contexts when testing. The simplest way to test them is just rendering them with the FormRenderer, but there may be cases when you might now want to do that. We will show you both options.

### With renderer

Set up your renderer to make it easier to test the component-specific features. Use initial values to trigger falsey validation results to avoid unnecessary changes simulation.

<CodeExample source="tests/custom-component-with-renderer.test" />

### Outside renderer

Rendering components outside of the renderer will require some additional set up which is not traditionally used when using form renderer and require some additional knowledge of the library. Most notably, you need to wrap the component inside the `Form` component and `RendererContext`. No functionality provided by the renderer like validations or conditions will be provided so it must be configured.

<CodeExample source="tests/custom-component-outside-renderer.test" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="testing" />
</Grid>
</Grid>
