import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import GenericMuiComponent from '@docs/doc-components/sub-form';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

const schema = {
  fields: [
    {
      component: componentTypes.SUB_FORM,
      title: 'Subform',
      description: 'This is a subform',
      name: 'subform',
      fields: [
        {
          name: 'carrot',
          label: 'Carrot',
          component: componentTypes.TEXT_FIELD
        }
      ]
    }
  ]
};
const variants = [
  {
    name: 'title',
    type: 'string'
  },
  {
    name: 'description',
    type: 'string'
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.SUB_FORM}
        schema={schema}
        variants={variants}
        ComponentText={GenericMuiComponent}
        linkText="Subform"
      />
    </Fragment>
  );
};
