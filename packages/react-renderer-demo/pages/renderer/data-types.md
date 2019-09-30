import Grid from '@material-ui/core/Grid'
import RawComponent from '@docs/raw-component';

import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

## Introduction

 You can specify a type of a component by providing `dataType`, which will automatically validates the component value.
Because almost everything in html inputs is outputed as a string, adding the `dataType` props will also cast the value to given type.

### Available dataTypes

 ```jsx
['integer', 'float', 'number', 'boolean', 'string']
```
<RawComponent source="data-types-example" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/data-types" />
</Grid>
</Grid>
