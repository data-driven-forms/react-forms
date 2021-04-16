import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Global component props

If you need to set the same value to prop to every component occurance in a form, you can do so via [component mapper](/mappers/custom-mapper).

Always keep in mind, that the props depend on component mapper.

## Adding global prop to

<CodeExample source="components/global-component-props/add-global-prop-to-component" mode="preview" mapper="mui"/>

## Props priority

Props from **schema** have **higher** priority and will override the global props from mappers.

<CodeExample source="components/global-component-props/props-priority" mode="preview" mapper="mui"/>

</DocPage>