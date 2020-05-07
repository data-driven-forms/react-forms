import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiRadio from '@data-driven-forms/mui-component-mapper/dist/cjs/radio';
import RadioText from '@docs/components/mui-definitions/radio-text.md';

const mappers = {
  mui: {
    [componentTypes.RADIO]: MuiRadio
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers.mui} />
      {activeMapper === 'mui' && <RadioText />}
    </Fragment>
  );
};
