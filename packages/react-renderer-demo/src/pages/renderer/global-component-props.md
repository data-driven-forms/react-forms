import Grid from '@material-ui/core/Grid'

import CodeExample from '@docs/code-example'
import ListOfContents from '@docs/list-of-contents';

import ListOfContentsMobile from '@docs/list-of-contents-select';

<Grid container item>

<ListOfContentsMobile file="renderer/global-component-props" />
<Grid item xs={12} md={10}>

# Global component props

If you need to set the same value to prop to every component occurance in a form, you can do so via [component mapper](/renderer/component-mapping).

Always keep in mind, that the props depend on component mapper.

## Adding global prop to 

<CodeExample source="components/global-component-props/add-global-prop-to-component" mode="preview" mapper="mui"/>

## Props priority

Props from **schema** have **higher** priority and will override the global props from mappers.

<CodeExample source="components/global-component-props/props-priority" mode="preview" mapper="mui"/>

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/global-component-props" />
</Grid>
</Grid>