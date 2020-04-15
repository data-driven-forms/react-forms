import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Switch from '@data-driven-forms/pf4-component-mapper/dist/cjs/switch';
import Pf3Switch from '@data-driven-forms/pf3-component-mapper/dist/cjs/switch';
import MuiSwitch from '@data-driven-forms/mui-component-mapper/dist/cjs/switch';
import SwitchText from '@docs/components/mui-definitions/switch-text.md';

const mappers = {
  pf4: {
    [componentTypes.SWITCH]: Pf4Switch
  },
  pf3: {
    [componentTypes.SWITCH]: Pf3Switch
  },
  mui: {
    [componentTypes.SWITCH]: MuiSwitch
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />
      {activeMapper === 'mui' && <SwitchText />}
    </Fragment>
  );
};
