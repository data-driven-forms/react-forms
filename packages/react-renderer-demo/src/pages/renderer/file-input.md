
import Grid from '@material-ui/core/Grid'
import ListOfContents from '@docs/list-of-contents';
import CodeExample from '@docs/code-example';

import ListOfContentsMobile from '@docs/list-of-contents-select';

<Grid container item>

<ListOfContentsMobile file="renderer/file-input" />
<Grid item xs={12} md={10}>

# File input

Files cannot be easily uploaded in JSON payload. In order to upload files using the input type *file* you can follow these steps.

## File onChange payload

In order to successfully store the file reference, you have either use an input of "file" type or use an object with the following shape in your on change function ([visit MDN docs for more info on file upload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)). 
```jsx
{
  target: {
    value: string, // usually it is the path to the file
    files: FileList // an array of file references,
    type: 'file' // type which allows the renderer to distinguish file payload
  }
}
```

## Getting file from state.

When submitting, you will have to construct the binary via FormData or encode the file to Base64, depending on your use case. Be aware that FormData cannot be sent in the JSON payload. Binaries are destroyed when serializing JSON. There will be a list of field names with the type file available in the submit function arguments.

The `formApi.fileInputs` is an array of field names with `type: file`. Be aware that if your field name is in nested, you have to use the lodash like method of getting the value from state.

<CodeExample source="components/file-upload/upload-handler" />

<CodeExample source="components/file-upload/file-input" mode="preview" additionalSources="components/file-upload/upload-handler.js" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/file-input" />
</Grid>
</Grid>
