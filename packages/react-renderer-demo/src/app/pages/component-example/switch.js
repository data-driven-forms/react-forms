import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import SwitchText from '@docs/components/mui-definitions/switch-text.md';

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} />
      {activeMapper === 'mui' && <SwitchText />}
    </Fragment>
  );
};
