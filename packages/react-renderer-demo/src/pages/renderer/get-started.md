import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Getting started

Data Driven Forms converts JSON form definitions into fully functional React forms.
It uses [React Final Form](https://github.com/final-form/react-final-form) for the form state management.
It is highly recommended to check their documentations first to fully understand how
the [Data Driven Forms](https://github.com/data-driven-forms/react-forms) libraries work.

All you need is to [install](/renderer/installation) the form renderer and choose the component mapper you want ([or create your own](/renderer/component-mapping)).

Import `FormRenderer` from the react-form-renderer. This component takes four required props: FormTemplate, schema, componentMapper and onSubmit. You can read about them [here](/renderer/renderer-api#requiredprops).

You can check the simple example below.

<CodeExample source="components/get-started/get-started" mode="preview" />

</DocPage>
