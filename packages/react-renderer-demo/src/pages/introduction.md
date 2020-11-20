import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Data Driven Forms Introduction

Data Driven Forms converts JSON form definitions (schemas) into fully functional React forms with the provided set of features.

## Form state management

Data Driven Forms uses [React Final Form](https://github.com/final-form/react-final-form) for the form state management. It is recommended to check their documentations first to fully understand how the [Data Driven Forms](https://github.com/data-driven-forms/react-forms) libraries work. However, it's not required to use DDF library.

## Schema

[A schema](/schema/introduction) is a JSON object controlling the whole form. Using schema you define form fields and its attributes.

## How to start

All you need is to [install](/installation) the form renderer and then to choose components you want to use. You can use one of provided mappers to start building forms right away ([or integrate your own components](/mappers/custom-mapper)). The integration is simple - all it takes is just a single [useFieldApi](/hooks/use-field-api) hook.

Then you can import `FormRenderer` from the `@data-driven-forms/react-form-renderer`. This component takes four required props: **FormTemplate**, **schema**, **componentMapper** and **onSubmit**. You can read about them [here](/components/renderer#requiredprops).

Following example shows basic usage of Data Driven Forms library with our [Material UI mapper](/mappers/mui-component-mapper).

<CodeExample source="components/get-started/get-started" mode="preview" />

## Articles

Following articles can give you more insights about Data Driven Forms and why/how to use it in you projects.

### Introduction of data driven approach

[This article](https://medium.com/javascript-in-plain-english/data-driven-approach-to-forms-with-react-c69fd4ea7923) presents basics of the data driven approach and why to choose it.

### Tutorial how to build data driven forms

[This article](https://medium.com/javascript-in-plain-english/data-driven-form-building-in-react-30768b49e625) presents basics of the data driven form building. It is a great point to start if you are new with this library.

## Comparison with other form libraries

### Form state management

You can find many of already existing and well-established libraries such as Formik, React Hook Form, or React Final Form. These libraries are focused on providing form state management solutions. Data Driven Forms is using one of them - React Final Form - to enhance the developer experience and to provide consistent way for building complex forms. Form state management is completely abstracted in Data Driven Forms, so developers can focus on the only thing that really matters - building the most accessible web forms.

### Data driven libraries

Also, there are multiple libraries generating forms from schemas (i.e. Uniforms, AntD Form component). Mostly these libraries are using one of well-known formats such as JSON Schemas or GraphQL schemas. Data Driven Forms implements its own format to provide the most simple representation of forms - it's not being used to define data, it's directly designed to define forms so it's simple, logical and it allows to use many of form-specific features.

Data Driven Forms provides complex conditional logic to hide your fields, fully dynamic wizard forms, and much more. Also, its API allows to store complex forms in databases, so you can reuse forms in multiple developer environments.

If users need to use generate forms from GraphQL, all that is needed is to convert the GraphQL schema to DDF one.

</DocPage>
