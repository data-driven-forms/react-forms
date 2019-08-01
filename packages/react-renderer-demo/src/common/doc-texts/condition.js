import React from 'react';
import ReactMarkdown from '../md-helper';
import TableOfContent from '../helpers/list-of-content';

const text =  `
You can show a field only if it meets a condition:


### Schema

\`\`\`jsx
{
  fields: [
    {
      name: 'Foo', // controlled field
      component: 'text-field',
    }, {
      name: 'BarFoo',
      label: 'Foo is Bar!',
      component: 'text-field',
      condition: {
        when: 'Foo', // name of controlled field
        is: 'Bar', // condition
      },
    },
  ]
}
\`\`\`

\`when\` - is name of field where the value is stored, **always required!**

### Conditions

\`is\` - test if the value is equal

\`\`\`jsx
condition: {
  when: 'Foo',
  is: 'Bar',
}

// Foo == 'Bar' => true
// Foo == 'Not a Bar' => false
\`\`\`

\`isEmpty\` - tests if the value is empty (using [lodash function](https://lodash.com/docs/4.17.11#isEmpty))

\`\`\`jsx
condition: {
  when: 'Foo',
  isEmpty: true,
}

// Foo = 'Bar' => false
// Foo = '' => true
// Foo = [] => true
// Foo = ['aa', 'bb'] => false
// Foo = {} => true
// Foo = { a: 10 } => false
// Foo = 10 => false
// Foo = false => true
// Foo = true => false
\`\`\`

\`isNotEmpty\` - tests if the value is not empty (using [lodash function](https://lodash.com/docs/4.17.11#isEmpty))

\`\`\`jsx
condition: {
  when: 'Foo',
  isNotEmpty: true,
}

// Foo = 'Bar' => true
// Foo = '' => false
// Foo = [] => false
// Foo = ['aa', 'bb'] => true
// Foo = {} => false
// Foo = { a: 10 } => true
// Foo = 10 => true
// Foo = true => false
// Foo = true => true
\`\`\`

\`pattern\` - tests if the value matches the pattern

\`\`\`jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
}

// Foo = 'This is a bar' => true
// Foo = 'Foo foo baar!' => true
\`\`\`

\`notMatch\` - reverse \`is\`/\`pattern\` condition

\`\`\`jsx
condition: {
  when: 'Foo',
  pattern: /bar/,
  notMatch: true,
}

// Foo = 'This is a bar' => false
// Foo = 'Foo foo baar!' => true
\`\`\`

\`\`\`jsx
condition: {
  when: 'Foo',
  is: 'bar',
  notMatch: true,
}

// Foo = 'bar' => false
\`\`\`

### Clearing values

If you need to clear values after switching fields, please see [here](/renderer/unmounting). 

`;

export default <React.Fragment>
  <TableOfContent text= { text } />
  <ReactMarkdown source={ text } />
</React.Fragment>;

