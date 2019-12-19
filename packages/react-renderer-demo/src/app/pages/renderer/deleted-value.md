import Grid from '@material-ui/core/Grid'
import RawComponent from '@docs/raw-component';

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

# Deleted value

If you required a specific value for a field which had **initialValue** to set it to some specific value. For instance if you have a form which edits some entity and you need to delete some attribute, APIs usually require the value to be set to `null` to register the change.


<RawComponent source="deleted-value" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/deleted-value" />
</Grid>
</Grid>
