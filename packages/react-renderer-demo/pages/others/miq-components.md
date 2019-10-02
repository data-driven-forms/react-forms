import Grid from '@material-ui/core/Grid'
import ListOfContents from '../../src/helpers/list-of-contents';

<Grid container item>
<Grid item xs={12} md={10}>

## ManageIQ components

### Duallist select

**Props**

| Props  | Type | Default |  Decription |
| ------------- | ------------- | ------------- | ------------- |
| leftId  | string  | undefined  | ID passed to left select  |
| rightId  | string  | undefined  | ID passed to right select  |
| leftTitle  | string  | undefined  | Title above left select  |
| rightTitle  | string  | undefined  | Title above right select  |
| rightTitle  | string  | undefined  | Title above right select  |
| size  | number  | 15  | Size of the selects (in lines)  |
| allToRight  | bool  | true  | Should show moveAllToRight button  |
| allToLeft | bool  | false  | Should show moveAllToLeft button  |
| moveLeftTitle  | string  | __('Move selected to left')  | Title of moveToLeft button |
| moveRightTitle  | string  | __('Move selected to right')  | Title of moveToRight button |
| moveAllRightTitle  | string  | __('Move all to right')  | Title of moveAllToRight button |
| moveAllLeftTitle  | string  | __('Move all to left')  | Title of moveAllToLeft button |
| options  | array | [ ]  | All options of the select |
| input: { value }  | array | [ ]  | Selected options **(subset of options)** |

**Options/Value format**

```jsx
[
      {key: 'key', label: 'label'},
      {key: 'key1', label: 'label1'},
      {key: 'key2', label: 'label2'},
      ...
]
```

The component will split values from options to left/right select lists according to value. (All values in value are going to right, others to left)

**How to use it in Data-driven form schema (example)**

```jsx
{   
    component: 'dual-list-select',
    name: 'duallist',
    options: [
      { key: 'key', label: 'label' }, ...
    ],
    rightId: 'child_vms',
    leftId: 'available_vms',
    rightTitle: __('Child VMs:'),
    leftTitle: __('Availables VMs'),
    moveLeftTitle: __('Move selected VMs to left'),
    moveRightTitle: __('Move selected VMs to right'),
    moveAllRightTitle: __('Move all VMs to right'),
}
```

**How to use it in Data-driven form**

By default, the value contains all options from the right side select. However, if you need left values or just added values (probably in most cases), you can use helpers in `/dual-list-select/helpers` to extract needed information:

<br />

**1** In constructor/componentDidMount/elsewhere (where you fetch data) save these values into state:
`originalOptions: options`
`originalRightValues: value`

<br />

**2** In your submit method (values => (...)) you can use helper methods:

<br />

**`filterOptions(originalOptions, values.duallist)`** to get all values on left
**`filterOptions(values.duallist, originalOptions)`** to get added values to left select
**`filterOptions(values.duallist, originalRightValues)`** to get added values to right select
**`getKeys(values)`** to get keys of values

<br />

**3** Then you can send values to endpoints/API!

### Horizontal rule

Just a `hr` component for using in forms.

```jsx
{   
    component: 'hr',
    name: 'name', // every component has to have an unique name!
}
```
</Grid>
<Grid item xs={false} md={2}>
  <ListOfContents file="others/miq-components" />
</Grid>
</Grid>