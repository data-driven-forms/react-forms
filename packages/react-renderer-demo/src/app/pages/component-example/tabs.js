import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiTabs from '@data-driven-forms/mui-component-mapper/dist/cjs/tabs';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';
import TabsText from '@docs/components/mui-definitions/tabs-text.md';

const mappers = {
  mui: {
    [componentTypes.TABS]: MuiTabs,
    [componentTypes.TEXT_FIELD]: MuiTextField
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />
      {activeMapper === 'mui' && <TabsText />}
    </Fragment>
  );
};
