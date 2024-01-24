import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ComponentExample from '@docs/components/component-example';

import { Heading } from './mdx/mdx-components';
import avalableMappers from '../helpers/available-mappers';

import AdditionalComponentText from '@docs/doc-components/additional-component-text';
import useComponentExample from '@docs/hooks/use-component-example';

const PREFIX = 'ComponentExampleText';

const classes = {
  wrapper: `${PREFIX}-wrapper`,
  content: `${PREFIX}-content`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.wrapper}`]: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },

  [`& .${classes.content}`]: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(768px + 17%)',
      width: 'calc(768px + 17%)',
    },
  },
}));

const ComponentExampleText = ({ linkText, schema, variants = [], schemaVariants }) => {
  const [activeMapper, component, activeSchema] = useComponentExample();

  return (
    <Root className={classes.wrapper}>
      <div className={classes.content}>
        <Heading level="4" component="h1">
          {`${avalableMappers.find(({ mapper }) => mapper === activeMapper)?.title} ${linkText}`}
        </Heading>
        <ComponentExample
          variants={variants}
          schema={schema}
          activeMapper={activeMapper}
          component={component}
          schemaVariants={schemaVariants}
          activeSchema={activeSchema}
        />
        <br />
        <AdditionalComponentText activeMapper={activeMapper} component={component} />
      </div>
    </Root>
  );
};

ComponentExampleText.propTypes = {
  linkText: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  variants: PropTypes.arrayOf(PropTypes.object),
  schemaVariants: PropTypes.object,
};

export default ComponentExampleText;
