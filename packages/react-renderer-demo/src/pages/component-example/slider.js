import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import Slider from '@docs/doc-components/slider';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

const schema = {
  fields: [
    {
      component: componentTypes.SLIDER,
      name: 'slider',
      label: 'Distance',
      min: 1,
      max: 100,
      step: 1
    }
  ]
};

const variants = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'label',
    type: 'string'
  },
  {
    name: 'helperText',
    type: 'string'
  },
  {
    name: 'description',
    type: 'string'
  },
  {
    name: 'min',
    type: 'number'
  },
  {
    name: 'max',
    type: 'number'
  },
  {
    name: 'step',
    type: 'number'
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.SLIDER}
        schema={schema}
        ContentText={Slider}
        variants={variants}
        linkText="Slider"
      />
    </Fragment>
  );
};
