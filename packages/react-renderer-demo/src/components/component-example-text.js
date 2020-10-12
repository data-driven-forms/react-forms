import React from 'react';
import PropTypes from 'prop-types';
import ComponentExample from '@docs/components/component-example';
import { makeStyles } from '@material-ui/core/styles';

import { Heading } from './mdx/mdx-components';
import avalableMappers from '../helpers/available-mappers';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  content: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(768px + 17%)',
      width: 'calc(768px + 17%)'
    }
  }
}));

const ComponentExampleText = ({ linkText, schema, variants, component, activeMapper, ContentText }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Heading level="4" component="h1">
          {`${avalableMappers.find(({ mapper }) => mapper === activeMapper).title} ${linkText}`}
        </Heading>
        <ComponentExample variants={variants} schema={schema} activeMapper={activeMapper} component={component} />
        <br />
        <ContentText activeMapper={activeMapper} component={component} />
      </div>
    </div>
  );
};

ComponentExampleText.propTypes = {
  component: PropTypes.string.isRequired,
  activeMapper: PropTypes.oneOf(avalableMappers.map(({ mapper }) => mapper)),
  linkText: PropTypes.string.isRequired,
  ContentText: PropTypes.elementType,
  schema: PropTypes.object.isRequired,
  variants: PropTypes.arrayOf(PropTypes.object)
};

ComponentExampleText.defaultProps = {
  variants: [],
  ContentText: () => null
};

export default ComponentExampleText;
