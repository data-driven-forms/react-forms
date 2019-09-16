import React, { useState, useEffect, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListOfContents from '../helpers/list-of-content';

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

const PageLoadingIndicator = () => (
  <div style={{ height: 'calc(100vh - 96px)', display: 'flex', justifyContent: 'center' }}>
    <CircularProgress/>
  </div>
);

const RendererDocPage = ({ match: { params: { component }}}) => {
  const [ Component, setComponent ] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (component) {
      const OtherComponent = lazy(() => import(`docs/components/${component}.md`).then((m) => {
        setImmediate(() => {
          const h = window.location.hash;
          window.location.hash = '';
          window.location.hash = h.replace('#', '');
        });
        return m;
      }));
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setComponent(OtherComponent);
    }
  }, [ component ]);

  if (!component) {
    return <Redirect to="/renderer/installation" />;
  }

  return (
    <Suspense fallback={ <PageLoadingIndicator/> }>
      <div className={ classes.demoWrapper }>
        <div className={ classes.mdxWrapper }>
          { Component && (
            <Component />
          ) }
        </div>
        <div className={ classes.contentWrapper }>
          <ListOfContents text={ reqSource(`./${component}.md`).default } />
        </div>
      </div>
    </Suspense>
  );
};

RendererDocPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      component: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(RendererDocPage);
