import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';
import Alert from '@mui/material/Alert';

<DocPage>

# Core Editor

<ComponentMapperBar prefix="mui" github="https://github.com/data-driven-forms/editor/tree/main/packages/editor-core" npm="https://www.npmjs.com/package/@data-driven-forms%2Feditor-core" npmSvg="https://badge.fury.io/js/@data-driven-forms%2Feditor-core.svg" />

<br />

<Alert severity="warning">This component is work-in-progress and in preview. API is unstable.</Alert>

<br />

`@data-driven-forms/editor-core` is a set of components and utilities allowing to build a custom Data Driven Forms Drag And Drop editor based on [Data Driven Forms Drag And Drop](/editor/dnd) library.

## Installation

```bash
npm install --save @data-driven-forms/editor-core @data-driven-forms/dnd
```
or
```bash
yarn add @data-driven-forms/editor-core @data-driven-forms/dnd
```

## API

### Component

*(&#123; id: string, container: string, HandleProps?: AnyObject, Handle?: Component &#125;) => React.Node*

A wrapper around [useComponent](/editor/dnd#usecomponent) and [useHandle](/editor/dnd#usehandle). Returns a wrapper around a rendered form field.

### Container

*(&#123; id: string, container?: string, isRoot?: boolean, Handle?: Component, HandleProps?: AnyProps, ListProps?: AnyProps, Component: Component &#125;) => React.Node*

A wrapper around [useContainer](/editor/dnd#usecontainer).

### convertToSchema

*(state: ) => schema*

A function converting DnD state to DDF schema.

### Editor

A wrapper providing DnD and Editor functionality.

### MenuItem

*(&#123; component: string, Component?: Component, componentInitialProps?: AnyObject &#125;) => React.Node*

A component for selecting new components and dragging them into the form container.

### prepareCondition

A function preparing DnD `condition` to DDF `condition`. Checks and removes all unfinished configuration.

### prepareValidate

A function preparing DnD `validate` to DDF `validate`. Checks and removes all unfinished configuration, esnures that only valid validators are passed to components..

### Properties

A properties editor for selected components.

### reducer

Extended DnD Reducer with additional functionality.

### useEditor

Setups Editor reducer.

</DocPage>