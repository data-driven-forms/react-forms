import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiCheckbox from '@data-driven-forms/mui-component-mapper/dist/cjs/checkbox';
import CheckboxText from '@docs/components/mui-definitions/checkbox-text.md';

const mappers = {
  mui: {
    [componentTypes.CHECKBOX]: MuiCheckbox
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers.mui} />
      <CheckboxText />
    </Fragment>
  );
};
