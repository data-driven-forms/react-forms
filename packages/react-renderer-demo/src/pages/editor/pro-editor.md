import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';
import Alert from '@mui/material/Alert';

<DocPage>

# Pro Editor

<ComponentMapperBar prefix="mui" github="https://github.com/data-driven-forms/editor/tree/main/packages/editor-pro" npm="https://www.npmjs.com/package/@data-driven-forms%2Feditor-pro" npmSvg="https://badge.fury.io/js/@data-driven-forms%2Feditor-pro.svg" />

<br />

<Alert severity="warning">This component is work-in-progress and in preview. API is unstable.</Alert>

<br />

`@data-driven-forms/editor-pro` is a prebuilt Drag And Drop editor supporting custom provided mappers. The UI is built on Evergreen UI Framework. Check the [live example](/editor/live-editor).

## Installation

```bash
npm install --save @data-driven-forms/editor-pro
```
or
```bash
yarn add @data-driven-forms/editor-pro
```


**Features**

- component editing
- condition editing
- validator editing

## Usage

```jsx
import Editor from '@data-driven-forms/editor-pro/editor'

<Editor />
```


</DocPage>