import React from 'react';
import PropTypes from 'prop-types';

import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';

const PlainText = ({ label, name }) => (
  <TextContent>
    { label.split('\n').map((paragraph, index) => <Text component={ TextVariants.p } key={ `${name}-${index}` }>{ paragraph }</Text>) }
  </TextContent>
);

PlainText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlainText;
