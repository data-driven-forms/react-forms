import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import Pf4DualListSelect from '@data-driven-forms/pf4-component-mapper/dist/cjs/dual-list-select';

const mappers = {
  pf4: {
    'dual-list-select': Pf4DualListSelect
  },
  pf3: {
    'dual-list-select': () => <h2>Not implemented</h2>
  },
  mui: {
    'dual-list-select': () => <h2>Not implemented</h2>
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
