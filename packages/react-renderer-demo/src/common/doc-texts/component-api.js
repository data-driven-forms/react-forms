import React from 'react';

import MdxContent from 'docs/components/component-api/component-api.md';
import ListOfContent from '../helpers/list-of-content';

const reqSource = require.context(
  '!raw-loader!docs/components/',
  true,
  /\.md/,
);

export default (
  <React.Fragment>
    <ListOfContent text={ reqSource('./component-api/component-api.md').default } />
    <MdxContent />
  </React.Fragment>
);

