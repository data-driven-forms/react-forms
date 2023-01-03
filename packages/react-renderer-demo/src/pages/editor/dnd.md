import DocPage from '@docs/doc-page';
import ComponentMapperBar from '@docs/component-mapper-bar';
import Alert from '@mui/material/Alert';

<DocPage>

# Drag and Drop

<ComponentMapperBar prefix="mui" github="https://github.com/data-driven-forms/editor/tree/main/packages/dnd" npm="https://www.npmjs.com/package/@data-driven-forms%2Fdnd" npmSvg="https://badge.fury.io/js/@data-driven-forms%2Fdnd.svg" />

<br />

<Alert severity="warning">This library is work-in-progress and in preview. API is unstable.</Alert>

<br />

`@data-driven-forms/dnd` is a library providing drag and drop functionality for React components. This custom light-weight library currently supports mouse and touch input, is highly customisable and supports deep nesting of container elements.

## Installation

```bash
npm install --save @data-driven-forms/dnd
```
or
```bash
yarn add @data-driven-forms/dnd
```

### API

### dispatchContext

An utility to create an context for `dispatch` function.

### DropCursor

A component handling moving cursor and selecting the correct place to move dragged element.

### findTargetElement

An utility function to go over all elements' positions stored in state and selecting the correct place.

### pauseEvent

An utility to stop an event from propagation and default action.

### Provider

A wrapper providing all neccessary components.

### reducer

A reducer providing the basic drag and drop functionality.

### stateContext

An utility to create an context for a drag and drop `state`.

### useComponent

*(&#123; id: any &#125;) => &#123; ref, component &#125;*

A hook to connect a component to DnD state. Requires an id of the component. Returns a `ref` and the `component` object from the state.

### useContainer

*(&#123; id?: any, isRoot?: boolean &#125;) => &#123; ref, container, id &#125;*

A hook to connect a container to DnD state. Requires an id of the container or a root in case the container is the root container. Returns a `ref`, `id` and the `container` object from the state.

### useDispatch

An utility to obtain a dispatch function for the DnD reducer.

### useHandle

*(&#123;component: string, sourceContainer?: string &#125;) => &#123; onClick, onMouseDown, onTouchStart &#125;*

A hook returning handle events for a component handle. Requires an `id` of the component.

### useState

An utility to obtain a state object for the DnD reducer.

</DocPage>