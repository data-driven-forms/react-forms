import RawComponent from '@docs/raw-component';

# Global component props

If you need to set the same value to prop to every component occurance in a form, you can do so via [component mapper](/renderer/component-mapping).

Always keep in mind, that the props depend on component mapper.

## Adding global prop to 

<RawComponent source="global-component-props/add-global-prop-to-component"/>

## Props priority

Props from **schema** have **higher** priority and will override the global props from mappers.

<RawComponent source="global-component-props/props-priority"/>