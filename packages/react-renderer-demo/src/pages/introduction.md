import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Introduction

Data Driven Forms converts JSON form definitions into fully functional React forms.
It uses [React Final Form](https://github.com/final-form/react-final-form) for the form state management.
It is highly recommended to check their documentations first to fully understand how
the [Data Driven Forms](https://github.com/data-driven-forms/react-forms) libraries work.

All you need is to [install](/renderer/installation) the form renderer and choose the component mapper you want ([or create your own](/renderer/component-mapping)).

Import `FormRenderer` from the react-form-renderer. This component takes four required props: FormTemplate, schema, componentMapper and onSubmit. You can read about them [here](/renderer/renderer-api#requiredprops).

You can check the simple example below.

<CodeExample source="components/get-started/get-started" mode="preview" />

## Articles

### Introduction of data driven approach

[This article](https://medium.com/javascript-in-plain-english/data-driven-approach-to-forms-with-react-c69fd4ea7923) presents basics of the data driven approach and why to choose it.

### Tutorial how to build data driven forms

[This article](https://medium.com/javascript-in-plain-english/data-driven-form-building-in-react-30768b49e625) presents basics of the data driven form building. It is a great point to start if you are new with this library.

</DocPage>
