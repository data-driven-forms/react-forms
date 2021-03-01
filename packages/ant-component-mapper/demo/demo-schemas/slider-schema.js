import React from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

const schema = {
  fields: [
    {
      component: componentTypes.SLIDER,
      name: 'simple-slider',
      label: 'Slider'
    },
    {
      component: componentTypes.SLIDER,
      name: 'required-slider',
      label: 'Slider required',
      isRequired: true,
      validate: [{ type: validatorTypes.REQUIRED }]
    },
    {
      component: componentTypes.SLIDER,
      name: 'range-custom-slider',
      label: 'Slider custom range',
      min: 10,
      max: 132,
      tooltipVisible: true
    },
    {
      component: componentTypes.SLIDER,
      name: 'range-slider',
      label: 'Slider range',
      range: true
    },
    {
      component: componentTypes.SLIDER,
      name: 'dost-slider',
      label: 'Slider dots',
      dots: true
    },
    {
      component: componentTypes.SLIDER,
      name: 'included-slider',
      label: 'Slider included',
      included: false
    },
    {
      component: componentTypes.SLIDER,
      name: 'marks-slider',
      label: 'Slider marks',
      marks: {
        25: {
          label: <h1>25 mark</h1>
        }
      }
    },
    {
      component: componentTypes.SLIDER,
      name: 'reverse-slider',
      label: 'Slider reverse',
      reverse: true
    }
  ]
};

export default schema;
