import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import DualListSelect from '@docs/doc-components/dual-list-select';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import baseFieldProps from '../../src/helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'dual-list-select',
      options: [
        {
          value: 'cats',
          label: 'cats'
        },
        {
          value: 'cats_1',
          label: 'cats_1'
        },
        {
          value: 'cats_2',
          label: 'cats_2'
        },
        {
          value: 'zebras',
          label: 'zebras'
        },
        {
          value: 'pigeons',
          label: 'pigeons'
        }
      ]
    }
  ]
};

const variants = [...baseFieldProps];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.DUAL_LIST_SELECT}
        schema={schema}
        ContentText={DualListSelect}
        variants={variants}
        linkText="Dual list select"
      />
    </Fragment>
  );
};
