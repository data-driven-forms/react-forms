import Grid from '@material-ui/core/Grid'
import CodeExample from '../../src/components/code-example'

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Cleared value

The value to send upon a submit if the field is empty. This wildcard value can be used to distinguish between an untouched field and a cleared one (it will be only used when field has initialValue). For example if you have a form that edits an entity and you would like to clear an attribute. Some APIs require the value to be set to null to register the change.


<CodeExample source="components/cleared-value" mode="preview" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/cleared-value" />
</Grid>
</Grid>
