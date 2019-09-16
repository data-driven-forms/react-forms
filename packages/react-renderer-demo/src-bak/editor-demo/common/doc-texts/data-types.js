import React from 'react';

import MdxContent from 'docs/components/data-types.md';
import ListOfContent from '../helpers/list-of-content';

const reqSource = require.context(
  '!raw-loader!docs/components/',
  true,
  /\.md/,
);

export default (
  <React.Fragment>
    <ListOfContent text={ reqSource('./data-types.md').default } />
    <MdxContent />
  </React.Fragment>
);
