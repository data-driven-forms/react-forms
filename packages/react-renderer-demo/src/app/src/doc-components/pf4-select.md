### Async Select

PF4 Select allows to load the options asynchronously.


|prop name|type|description|
|---------|----|-----------|
|loadOptions|`func`|A function returning `Promise`: `(searchValue) => new Promise`|
|loadingMessage|`node`|A message shown during the initial loading.|
|updatingMessage|`node`|A message shown during the loading|

#### loadOptions example

`loadOptions` receives a search input text as an argument.

```jsx
const asyncLoadOptions = (searchValue) => new Promise(resolve => setTimeout(() => {
  if (searchValue && searchValue.trim() !== '') {
    return resolve(asyncOptions.filter(({ label }) => label.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase())));
  }

  return resolve(options);
}, 2000));
```