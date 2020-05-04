import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiSwitch from '@data-driven-forms/mui-component-mapper/dist/cjs/switch';
import SwitchText from '@docs/components/mui-definitions/switch-text.md';

const mappers = {
  mui: {
    [componentTypes.SWITCH]: MuiSwitch
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />
      {activeMapper === 'mui' && <SwitchText />}
    </Fragment>
  );
};
