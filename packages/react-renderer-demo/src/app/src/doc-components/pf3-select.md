### Async Select

PF3 Select allows to load the options asynchronously.


|prop name|type|description|
|---------|----|-----------|
|loadOptions|`func`|A function returning `Promise`, only on mount.|
|loadingMessage|`string`|A message shown during the loading.|

#### loadOptions example

Currently now, PF3 select supports only loading on mounting.

```jsx
const asyncLoadOptions = () => new Promise(resolve => setTimeout(() => resolve(options), 2000));
```