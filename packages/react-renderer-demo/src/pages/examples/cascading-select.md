import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Cascading select

This example shows how to integrate that asynchronously loaded select depends on a value from different select.

This select combines common DDF select with [value listener](/examples/value-listener). To change `loadOptions` prop you have to tell the component that the function is being changed. If you provide a function, that has the same string representation, you have to provide `loadOptionsChangeCounter` (*number*) prop to trigger a data reload.

Using `noValueUpdates` (*boolean*) prop you control whether the value is being cleared when is not found in the current options array.

## Preview

<CodeExample source="components/examples/cascading-select" mode="preview" />

</DocPage>
