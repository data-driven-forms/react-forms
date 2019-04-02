import React from 'react';
import ReactMarkdown from '../common/md-helper';

const text =  `
### Contribution
Please feel to free to contribute in any of Data-driven-forms repos!
- 
### Links to Github
- a) [React form renderer](https://github.com/data-driven-forms/react-form-renderer)
- b) [Patternfly 3 mapper](https://github.com/data-driven-forms/pf3-component-mapper)
- c) [Patternfly 4 mapper](https://github.com/data-driven-forms/pf4-component-mapper)
- d) [MaterialUI mapper](https://github.com/data-driven-forms/mui-component-mapper)
- e) [Renderer demo](https://github.com/data-driven-forms/react-renderer-demo)

- 
### Links to NPM
- a) [React form renderer](https://www.npmjs.com/package/@data-driven-forms/react-form-renderer)
- b) [Patternfly 3 mapper](https://www.npmjs.com/package/@data-driven-forms/pf3-component-mapper)
- c) [Patternfly 4 mapper](https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper)
- d) [MaterialUI mapper](https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper)
`;

export default () => <ReactMarkdown source={ text } />;
