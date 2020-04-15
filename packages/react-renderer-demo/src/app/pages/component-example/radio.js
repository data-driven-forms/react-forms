import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Radio from '@data-driven-forms/pf4-component-mapper/dist/cjs/radio';
import Pf3Radio from '@data-driven-forms/pf3-component-mapper/dist/cjs/radio';
import MuiRadio from '@data-driven-forms/mui-component-mapper/dist/cjs/radio';
import RadioText from '@docs/components/mui-definitions/radio-text.md';

const mappers = {
  pf4: {
    [componentTypes.RADIO]: Pf4Radio
  },
  pf3: {
    [componentTypes.RADIO]: Pf3Radio
  },
  mui: {
    [componentTypes.RADIO]: MuiRadio
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />
      {activeMapper === 'mui' && <RadioText />}
    </Fragment>
  );
};
