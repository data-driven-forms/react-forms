### Select

There are some additional props for PF3 variant to match PF3 requirements.

|prop name|type|default value|description|
|---------|----|-------------|-----------|
|pluckSingleValue|`bool`|`true`|If a value is an array, component will pick its first item and set it as a new value. This will override the value in state from `[2, 4, 5]` to `2` for example.|

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