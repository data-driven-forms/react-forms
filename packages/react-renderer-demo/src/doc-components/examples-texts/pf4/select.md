## Menu portaling

In order to show menu properly in dialogs like modals, you can use `menuIsPortal`. This will append menu as portal to body.

|prop name|type|description|
|---------|----|-----------|
|menuIsPortal|`bool`|Append menu to body instead of to select wrapper.See more [here](https://react-select.com/advanced#portaling)|

## PF4 Async Select

PF4 Select allows to load the options asynchronously.

|prop name|type|description|
|---------|----|-----------|
|loadOptions|`func`|A function returning `Promise`: `(searchValue) => new Promise`|
|loadingMessage|`node`|A message shown during the initial loading.|
|updatingMessage|`node`|A message shown during the loading|
|noValueUpdates|`bool`|When set on true, the select won't deselect values not found in options.|

### loadOptions example

`loadOptions` receives a search input text as an argument.

```jsx
const asyncLoadOptions = (searchValue) => new Promise(resolve => setTimeout(() => {
  if (searchValue && searchValue.trim() !== '') {
    return resolve(asyncOptions.filter(({ label }) => label.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase())));
  }

  return resolve(options);
}, 2000));
```