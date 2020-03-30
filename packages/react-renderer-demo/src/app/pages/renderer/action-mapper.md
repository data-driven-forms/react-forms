import Grid from '@material-ui/core/Grid'
import ListOfContents from '../../src/helpers/list-of-contents';
import RawComponent from '@docs/raw-component';


<Grid container item>
<Grid item xs={12} md={10}>

# Action Mapper

The [ActionMapper](/renderer/renderer-api#optionalprops) allows you to map schema props to functions. This is useful when your schema is not written in JavaScript and you cannot use function inside of it, especially for schemas stored in databases.

## Mapper

```jsx
{
    [actionName]: (...args) => {}
}
```

## Schema

```jsx
{
    component: component,
    name: name,
    actions: {
        [props]: [actionName, ...args]
    }
}
```

Do not forget to keep order of args or use object with keys as named arguments.

# Example

So, let's say you need to translate labels of fields using your translate function `translate(id)` and the schema has no access to use JavaScript code.

Firstly, define a action mapper object.

```jsx
const actionMapper = {
    translateLabel: (id) => translate(id)
}
```

Add this object as a prop to FormRenderer.

```jsx
<FormRenderer
  {...props}
  schema={schema}
  actionMapper={actionMapper}
/>
```

Then, in your schema you can map `translateLabel` action to a prop:

```js
{
    "fields": [
        {
            "component": "text-field",
            "name": "translate-me",
            "actions": {
                "label": ["translateLabel", "translate_label_id"]
            }
        }
    ]
}
```

<RawComponent source="action-mapper" />

</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="renderer/action-mapper" />
</Grid>
</Grid>
