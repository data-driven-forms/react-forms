import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4PlainText from '@data-driven-forms/pf4-component-mapper/dist/cjs/plain-text';
import Pf3PlainText from '@data-driven-forms/pf3-component-mapper/dist/cjs/plain-text';
import MuiPlainText from '@data-driven-forms/mui-component-mapper/dist/cjs/plain-text';

const mappers = {
  pf4: {
    [componentTypes.PLAIN_TEXT]: Pf4PlainText
  },
  pf3: {
    [componentTypes.PLAIN_TEXT]: Pf3PlainText
  },
  mui: {
    [componentTypes.PLAIN_TEXT]: MuiPlainText
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
