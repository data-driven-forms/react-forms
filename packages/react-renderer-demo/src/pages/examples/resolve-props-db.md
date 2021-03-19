import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# resolveProps stored in DB

Even the fact that [resolveProps](/schema/resolve-props) is a JavaScript function does not prevent storing it in a database that does not allow to store code. You can simply store it as an [action](/mappers/action-mapper).

## Preview

<CodeExample source="components/examples/resolve-props-db" mode="preview" />

</DocPage>