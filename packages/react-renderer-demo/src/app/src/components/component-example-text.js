import React from 'react';
import PropTypes from 'prop-types';
import ComponentExample from '@docs/components/component-example';
import { Heading } from './mdx/mdx-components';
import avalableMappers from '../helpers/available-mappers';

const ComponentExampleText = ({ linkText, schema, variants, component, activeMapper, ContentText }) => (
  <React.Fragment>
    <Heading level="4" component="h1">
      {linkText}
    </Heading>
    <ComponentExample variants={variants} schema={schema} activeMapper={activeMapper} component={component} />
    {avalableMappers.map(({ mapper, title }) => (
      <div key={mapper} hidden={activeMapper !== mapper}>
        <Heading level="5" component="h2">{`${title} ${linkText}`}</Heading>
        <ContentText activeMapper={activeMapper} component={component} />
      </div>
    ))}
  </React.Fragment>
);

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
