import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Value listener

This example shows how to update a value of one field according to a value of others without using the set [condition](/schema/condition-set).

## Description

Basically you have to just a set up a new component, that will listen to the form state and updates the intended fields.

**FormSpy** with a correct subscription ensures that the component will be always updated. You can also set the [subscription](/components/renderer#subscription) on the form level in the form renderer.

**hideField** ensures that the listener component is not visible in the dom and it won't affect the form layout.

## FormSpy example

<CodeExample source="components/examples/value-listener" mode="preview" />

## Form subscription example

**Global subscription can affect the form performance.** It's recommended to use it in smaller forms with less form fields.

<CodeExample source="components/examples/value-listener" mode="preview" />

</DocPage>
