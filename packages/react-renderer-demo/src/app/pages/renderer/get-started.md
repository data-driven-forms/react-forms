import Grid from '@material-ui/core/Grid'

import ListOfContents from '../../src/helpers/list-of-contents';
import CodeExample from '../../src/components/code-example';

<Grid container item>
<Grid item xs={12} md={10}>


# React form renderer

Data Driven Forms converts JSON form definitions into fully functional React forms.
It uses [React Final Form](https://github.com/final-form/react-final-form) for the form state management.
It is highly recommended to check their documentations first to fully understand how
the [Data Driven Forms](https://github.com/data-driven-forms/react-forms) libraries work.

<CodeExample source="components/get-started/get-started" mode="preview" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/get-started" />
</Grid>
</Grid>
