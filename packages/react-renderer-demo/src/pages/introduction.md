import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# Data Driven Forms Introduction

Data Driven Forms is a React library that renders a form and manages its state. Main features of this approach are:

- ○ **all components and form functionality is implemented in one place**, so all forms accross the whole application work and look the same,
- ○ **form schemas can be stored as a JSON value** and loaded dynamically from API,
- ○ **all forms are easily customizable and extendable** (for example, changing field from one component to another is just a matter of rewriting one string),
- ○ forms can be written by non-developer persons,
- ○ forms can be shared between different applications,
- ○ **Data Driven Forms implements [React Final Form](https://github.com/final-form/react-final-form)** as the form manager, so all advanced form features such as validation are available,
- ○ Data Driven Forms implements **custom form features such as conditions, actions, custom validators**, etc.
- ○ Data Driven Forms provides utitilites for writing complex components such as **Wizard, Dual List Selector or asynchronous select**.
- ○ The library provides multiple already implemented component mappers: **MUI, Ant, Patternfly,** ...

To start implementing a form in Data Driven Forms, you need to provide four props:

- ○ `onSubmit` a function that is called on submit,
- ○ `schema` a JSON object describing the form, [read more](/schema/introduction).
- ○ `componentMapper` a set of components used in the form, [custom one](/mappers/custom-mapper) or [one of the provided ones](/provided-mappers/component-api),
- ○ `FormTemplate` [a React component](/components/form-template) that structures and renders form fields and form buttons.

## How to start

All you need is to [install](/installation) the form renderer and then to choose components you want to use. You can use one of provided mappers to start building forms right away ([or integrate your own components](/mappers/custom-mapper)). The integration is simple - all it takes is just a single [useFieldApi](/hooks/use-field-api) hook.

Then you can import `FormRenderer` from the `@data-driven-forms/react-form-renderer`. This component takes four required props: **FormTemplate**, **schema**, **componentMapper** and **onSubmit**. You can read about them [here](/components/renderer#requiredprops).

Following example shows basic usage of Data Driven Forms library with our [Material UI mapper](/provided-mappers/mui-component-mapper).

<img src="https://user-images.githubusercontent.com/32869456/153852549-01ea7f97-b80b-4afe-a0f2-73bf0f4db972.png" width="100%" />

<CodeExample source="components/get-started/get-started" mode="preview" />

<br />

---

## Form state management

Data Driven Forms uses [React Final Form](https://github.com/final-form/react-final-form) for the form state management. You can check their documentations first to fully understand how the [Data Driven Forms](https://github.com/data-driven-forms/react-forms) libraries work. However, it's not required to use DDF library.

---

## Articles

Following articles can give you more insights about Data Driven Forms and why/how to use it in you projects.

### Introduction of data driven approach

[This article](https://medium.com/javascript-in-plain-english/data-driven-approach-to-forms-with-react-c69fd4ea7923) presents basics of the data driven approach and why to choose it.

### Tutorial how to build data driven forms

[This article](https://medium.com/javascript-in-plain-english/data-driven-form-building-in-react-30768b49e625) presents basics of the data driven form building. It is a great point to start if you are new with this library.

---

## Comparison with other form libraries

### Form state managers

You can find many of already existing and well-established libraries such as Formik, React Hook Form, or React Final Form. These libraries are focused on providing form state management solutions. Data Driven Forms is using one of them - React Final Form - to enhance the developer experience and to provide consistent way for building complex forms. Form state management is completely abstracted in Data Driven Forms, so developers can focus on the only thing that really matters - building the most accessible web forms.

### Data driven libraries

Also, there are multiple libraries generating forms from schemas (i.e. Uniforms, AntD Form component). Mostly these libraries are using one of well-known formats such as JSON Schemas or GraphQL schemas. Data Driven Forms implements its own format to provide the most simple representation of forms - it's not being used to define data, it's directly designed to define forms so it's simple, logical and it allows to use many of form-specific features.

Data Driven Forms provides complex conditional logic to hide your fields, fully dynamic wizard forms, and much more. Also, its API allows to store complex forms in databases, so you can reuse forms in multiple developer environments.

If users need to use generate forms from GraphQL, all that is needed is to convert the GraphQL schema to DDF one.

</DocPage>
