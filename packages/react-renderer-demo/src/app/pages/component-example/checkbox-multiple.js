import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Checkbox from '@data-driven-forms/pf4-component-mapper/dist/cjs/checkbox';
import Pf3Checkbox from '@data-driven-forms/pf3-component-mapper/dist/cjs/checkbox';
import MuiCheckbox from '@data-driven-forms/mui-component-mapper/dist/cjs/checkbox';
import CheckboxText from '@docs/components/mui-definitions/checkbox-text.md';

const mappers = {
  pf4: {
    [componentTypes.CHECKBOX]: Pf4Checkbox
  },
  pf3: {
    [componentTypes.CHECKBOX]: Pf3Checkbox
  },
  mui: {
    [componentTypes.CHECKBOX]: MuiCheckbox
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />
      {activeMapper === 'mui' && <CheckboxText />}
    </Fragment>
  );
};
