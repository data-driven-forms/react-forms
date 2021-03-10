import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import Switch from '@data-driven-forms/mui-component-mapper/switch';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const PropsPriority = () => {
  const componentMapper = {
    [componentTypes.SWITCH]: {
      component: Switch,
      FormControlLabelProps: {
        labelPlacement: 'bottom'
      }
    }
  };

  const schema = {
    fields: [
      {
        component: componentTypes.SWITCH,
        name: 'switch-field-bottom',
        label: 'Label is on the bottom of the switch by default'
      },
      {
        component: componentTypes.SWITCH,
        name: 'switch-field-end',
        label: 'Label is on the right because schema props have higher priority',
        FormControlLabelProps: {
          labelPlacement: 'end'
        }
      }
    ]
  };
  return <FormRenderer FormTemplate={FormTemplate} schema={schema} componentMapper={componentMapper} onSubmit={console.log} />;
};

export default PropsPriority;
