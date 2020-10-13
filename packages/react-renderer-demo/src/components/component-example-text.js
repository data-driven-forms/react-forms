import React from 'react';
import PropTypes from 'prop-types';
import ComponentExample from '@docs/components/component-example';
import { makeStyles } from '@material-ui/core/styles';

import { Heading } from './mdx/mdx-components';
import avalableMappers from '../helpers/available-mappers';

import AdditionalComponentText from '@docs/doc-components/additional-component-text';
import useComponentExample from '@docs/hooks/use-component-example';

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

const ComponentExampleText = ({ linkText, schema, variants }) => {
  const classes = useStyles();
  const [activeMapper, component] = useComponentExample();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Heading level="4" component="h1">
          {`${avalableMappers.find(({ mapper }) => mapper === activeMapper)?.title} ${linkText}`}
        </Heading>
        <ComponentExample variants={variants} schema={schema} activeMapper={activeMapper} component={component} />
        <br />
        <AdditionalComponentText activeMapper={activeMapper} component={component} />
      </div>
    </div>
  );
};

ComponentExampleText.propTypes = {
  linkText: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  variants: PropTypes.arrayOf(PropTypes.object)
};

ComponentExampleText.defaultProps = {
  variants: []
};

export default ComponentExampleText;
