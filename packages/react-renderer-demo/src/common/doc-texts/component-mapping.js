import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import MdxContent from 'docs/components/component-mapping.md';
import ListOfContent from '../helpers/list-of-content';

const reqSource = require.context(
  '!raw-loader!docs/components/',
  true,
  /\.md/,
);

const useStyles = makeStyles(() => ({
  demoWrapper: {
    displa: 'flex',
  },
  mdxWrapper: {
    width: 'calc(100% - 240px)',
  },
  contentWrapper: {
    width: 240,
    position: 'fixed',
    right: 0,
    top: 96,
    overflow: 'auto',
    height: 'calc(100vh - 96px)',
  },
}));

const ComponentMapping = () => {
  const classes = useStyles();
  return (
    <div className={ classes.demoWrapper }>
      <div className={ classes.mdxWrapper }>
        <MdxContent />
      </div>
      <div className={ classes.contentWrapper }>
        <ListOfContent text={ reqSource('./component-mapping.md').default } />
      </div>
    </div>
  );
};

export default <ComponentMapping />;

