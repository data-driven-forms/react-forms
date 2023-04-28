[![npm version](https://badge.fury.io/js/%40data-driven-forms%2Fpf4-component-mapper.svg)](https://badge.fury.io/js/%40data-driven-forms%2Fpf4-component-mapper)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20DataDrivenForms%20React%20library%21%20https%3A%2F%2Fdata-driven-forms.org%2F&hashtags=react,opensource,datadrivenforms)
[![Twitter Follow](https://img.shields.io/twitter/follow/DataDrivenForms.svg?style=social)](https://twitter.com/DataDrivenForms)

[![Data Driven Form logo](../../images/logo.png)](https://data-driven-forms.org/)

Parsers for [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

:book: For more information please visit the [documentation](https://data-driven-forms.org/). :book:

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [More information](#more-information)
- [LICENSE](#license)

# Installation

```console
$ npm install @data-driven-forms/parsers -S
```

```console
$ yarn add @data-driven-forms/parsers
```


# Usage

**THIS REPO IS NOT CURRENTLY MAINTAINED, IF YOU WANT TO USE IT, PLEASE LET US KNOW**

For using Data Driven Forms in your component you need the renderer and a component mapper, which provides formFields components and layoutFields components.

```jsx
import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper';

import { mozilla } from '@data-driven-forms/parsers';

const mozillaSchema = [
  "namespace": "myapi",
  "properties": {
    "SOME_PROPERTY": {
     "value": 24,
     "description": "Description of my property here."
    }
  }
]

const parsedSchema = mozilla(mozillaSchema)

const Form = () => (
  <FormRenderer
    schema={parsedSchema}
    componentMapper={componentMapper}
    FormTemplate={FormTemplate}
    onSubmit={console.log}
  />
)
```

# More information

For more information please check the root [repository](https://github.com/data-driven-forms/react-forms) or our [documentation page](https://data-driven-forms.org/).

# LICENSE

Apache License 2.0