import CodeExample from '@docs/code-example'
import DocPage from '@docs/doc-page';

<DocPage>

# clearedValue

*any*

`clearedValue` is the value to send upon a submit if the field is empty. 

This wildcard value can be used to distinguish between an untouched field and a cleared one (it will be only used when field has `initialValue`). 

For example, if you have a form that edits an entity and you would like to clear an attribute of the form, some APIs require the `clearedValue` to be set to null to register the change.


<CodeExample source="components/cleared-value" mode="preview" />

</DocPage>