import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import Switch from '@data-driven-forms/mui-component-mapper/switch';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import { makeStyles } from '@material-ui/core/styles';

const useInputClasses = makeStyles({
  root: {
    '& label': {
      color: 'tomato'
    }
  }
});

const AddGlobalPropToComponent = () => {
  const inputClasses = useInputClasses();
  const componentMapper = {
    [componentTypes.TEXT_FIELD]: {
      component: TextField,
      classes: inputClasses
    },
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
        component: componentTypes.TEXT_FIELD,
        name: 'custom-text-field',
        label: 'Custom label color',
        helperText: 'nice'
      },
      {
        component: componentTypes.SWITCH,
        name: 'custom-switch-field',
        label: 'Label is on the bottom of the switch'
      }
    ]
  };
  return <FormRenderer FormTemplate={FormTemplate} schema={schema} componentMapper={componentMapper} onSubmit={console.log} />;
};

export default AddGlobalPropToComponent;
