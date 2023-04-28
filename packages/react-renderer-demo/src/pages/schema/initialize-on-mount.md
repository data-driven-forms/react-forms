import DocPage from '@docs/doc-page';
import CodeExample from '@docs/code-example';

<DocPage>

# initializeOnMount

*boolean*

**Data Driven Forms** provides a way how you can easily initialize a field when the field is mounted (re-mounted).

Just pass a `initializeOnMount` prop and set it to `true`.

The field will use the `initialValue` set in the schema ([`initialValue`](/schema/introduction#initialvalue)).

`initialValue` has higher priority than a value from `initialValues`.

<br/>

## Example


```jsx
{
  component: componentTypes.TEXT_FIELD,
  name: 'name',
  initializeOnMount: true,
  initialValue: 'this value will be set'
}
```

<br/>

## When to use it?

If you need to change a value when a user traverses a form, which shows and hides fields, and the value is not set by the user, this feature comes handy. 

A very useful case:

> When you use `initializeOnMount` in wizard forms, you can set different values to one input component which leads users to different ways as the following example component. 

> To achieve this implementation, you may need to use `initializeOnMount` combined with [`hideField`](/schema/introduction#hidefield) property.

<CodeExample source="components/initialize-mount" mode="preview" />

<br/>

## Clear the value

If you need to clear the value after unmounting, you can do it by using [clearOnUnmount](/schema/clear-on-unmount).

</DocPage>
