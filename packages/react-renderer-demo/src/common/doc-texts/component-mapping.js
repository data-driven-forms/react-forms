import React from 'react';

import MdxContent from 'docs/components/component-mapping.md';
import ListOfContent from '../helpers/list-of-content';

const reqSource = require.context(
  '!raw-loader!docs/components/',
  true,
  /\.md/,
);

export default (
  <div style={{ display: 'flex' }}>
    <div style={{ width: 'calc(100% - 240px)' }}>
      <MdxContent />
    </div>
    <div style={{ width: 240, position: 'fixed', right: 0, overflow: 'auto', height: 'calc(100vh - 64px - 64px)' }}>
      <ListOfContent text={ reqSource('./component-mapping.md').default } />
    </div>
  </div>
);

