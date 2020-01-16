import React from 'react';
import PropTypes from 'prop-types';
import ComponentText from '@docs/components/component-example-text';

const Page = ({ activeMapper = 'mui' }) => <ComponentText activeMapper={ activeMapper }/>;

Page.propTypes = {
  activeMapper: PropTypes.string,
};

Page.getInitialProps = ({ query }) => ({ activeMapper: query.mapper });

export default Page;
