import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Resolving props according to different field

[resolveProps](/schema/resolve-props) is a powerful tool for changing props run-time. In this example, we will present how to change props according to a value of different field.

To achieve that you need to rerender the changing field on each form change. That can be done via two ways:

## Subscription example

Using [subscription](/components/renderer##subscription) is a simple way how to let form to be rerendered each time values changed. However, this solution can bring a performance hit when used in large forms with tens of fields.

<CodeExample source="components/examples/resolve-props-subscription" mode="preview" />

## Wrap the component in FormSpy

You can wrap the changing field in [FormSpy component](/components/form-spy) to optimize the rendering. Using FormSpy the only nested fields will be rerendered.

<CodeExample source="components/examples/resolve-props-formspy" mode="preview" />


</DocPage>