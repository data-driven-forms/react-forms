import React from 'react';

import MdxContent from 'docs/components/component-mapping.md';
import ListOfContent from '../helpers/list-of-content';

const reqSource = require.context(
  '!raw-loader!docs/components/',
  true,
  /\.md/,
);

export default (
  <React.Fragment>
    <ListOfContent text={ reqSource('./component-mapping.md').default } />
    <MdxContent />
  </React.Fragment>
);

