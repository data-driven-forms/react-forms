import DocPage from '@docs/doc-page';

<DocPage>

# Validator warnings

If you don't want to block the form from submitting when a validator fails, you can convert the validator into a warning validator.

## 1. Enable warnings

In the field, set `useWarnings` to `true`.

```jsx
{
    component: 'text-field',
    useWarnings: true,
    ...
}
```

## 2. Return warning

### Object validator

When you want to return an object validator as a function, just add `warning: true` to its configuration.

```jsx
{
    ...,
    validate: [{ type: 'required', warning: true }]
}
```

### Function validator

When using a function as the validator, the function has to return an object with the following format:

```
{
    warning: true,
    error: 'some message'
}
```

## 3. Get warning

A warning is stored in `meta.warning`. This value is specific for each field and fields with the same name do not share this. Also, this value is not reachable via `resolveProps` as it's computed just after the `resolveProps` function.

```jsx
const TextFieldWarning = (props) => {
  const { input, meta, ...rest } = useFieldApi(props);
  return (
    <div>
      <input {...input} {...rest} />
      {meta.warning && <div id="warning">{meta.warning}</div>}
    </div>
  );
};
```

### Convert to error

By default, Data Driven Forms mappers are not supporting showing warnings. However you can convert the warning into an error - set `convertWarningToError` to `true`. This will replace `meta.error` with `meta.warning`, but `valid` etc. will be unchanged.

```jsx
{
    name: 'warning-as-error',
    component: 'text-field',
    useWarnings: true,
    convertWarningToError: true,
    validate: [{type: 'required', warning: true}]
}
```

</DocPage>
