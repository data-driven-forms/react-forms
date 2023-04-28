import React from 'react';
import { styled } from '@mui/material/styles';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import Switch from '@data-driven-forms/mui-component-mapper/switch';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const StyledTextInput = styled(TextField)(() => ({
  '&.root': {
    '& label': {
      color: 'tomato',
    },
  },
}));

const AddGlobalPropToComponent = () => {
  const componentMapper = {
    [componentTypes.TEXT_FIELD]: {
      component: StyledTextInput,
      classNamep: 'root',
    },
    [componentTypes.SWITCH]: {
      component: Switch,
      FormControlLabelProps: {
        labelPlacement: 'bottom',
      },
    },
  };

  const schema = {
    fields: [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'custom-text-field',
        label: 'Custom label color',
        helperText: 'nice',
      },
      {
        component: componentTypes.SWITCH,
        name: 'custom-switch-field',
        label: 'Label is on the bottom of the switch',
      },
    ],
  };
  return <FormRenderer FormTemplate={FormTemplate} schema={schema} componentMapper={componentMapper} onSubmit={console.log} />;
};

AddGlobalPropToComponent.displayName = 'Add global prop to component';

export default AddGlobalPropToComponent;
