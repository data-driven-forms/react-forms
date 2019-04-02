import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import GenericComponentText from './examples-texts/generic-mui-component';
import TabsText from './examples-texts/tabs';
import CustomComponentText from './examples-texts/custom-component';
import WizardText from './examples-texts/wizard';

export const baseExamples = [{
  component: componentTypes.TEXT_FIELD,
  linkText: 'Text Field',
  ContentText: GenericComponentText,
  value: { fields: [{
    component: componentTypes.TEXT_FIELD,
    label: 'First name',
    name: 'first-name',
  }]},
  canBeRequired: true,
  variants: [{
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'helperText',
    title: 'Helper text',
    component: 'input',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'First name',
  }, {
    title: 'Input Type',
    name: 'type',
    options: [ 'text', 'number', 'password' ],
  }, {
    name: 'placeholder',
    title: 'Placeholder',
    component: 'input',
  },  {
    name: 'isReadOnly',
    title: 'Read only',
  }],
}, {
  component: componentTypes.TEXTAREA_FIELD,
  linkText: 'Text area',
  ContentText: GenericComponentText,
  canBeRequired: true,
  value: { fields: [{
    component: componentTypes.TEXTAREA_FIELD,
    label: 'Long text',
    name: 'long-text',
  }]},
  variants: [{
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'helperText',
    title: 'Helper text',
    component: 'input',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Long text',
  }, {
    name: 'placeholder',
    title: 'Placeholder',
    component: 'input',
  },  {
    name: 'isReadOnly',
    title: 'Read only',
  }],
},
{
  component: componentTypes.CHECKBOX,
  linkText: 'Checkbox',
  ContentText: GenericComponentText,
  value: { fields: [{
    component: componentTypes.CHECKBOX,
    label: 'Checkbox',
    name: 'checkbox',
  }]},
  variants: [{
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Checkbox',
  }],
},
{
  component: componentTypes.RADIO,
  linkText: 'Radio',
  ContentText: GenericComponentText,
  canBeRequired: true,
  value: { fields: [{
    component: componentTypes.RADIO,
    label: 'Radio',
    name: 'radio',
    options: [
      { label: 'Dogs', value: '1' },
      { label: 'Cats', value: '2' },
      { label: 'Hamsters', value: '3' },
    ],
  }]},
  variants: [{
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Radio',
  }],
},
{
  component: componentTypes.SELECT_COMPONENT,
  linkText: 'Select',
  ContentText: GenericComponentText,
  canBeRequired: true,
  value: { fields: [{
    component: componentTypes.SELECT_COMPONENT,
    label: 'Select',
    name: 'select',
    options: [
      { label: 'Dogs', value: '1' },
      { label: 'Cats', value: '2' },
      { label: 'Hamsters', value: '3' },
    ],
  }]},
  variants: [{
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Select',
  }, {
    name: 'multi',
    title: 'Multi',
  },
  {
    name: 'noOptionsMessage',
    title: 'No options message',
    component: 'input',
  },
  {
    name: 'placeholder',
    title: 'Placeholder',
    component: 'input',
  },
  {
    name: 'isSearchable',
    title: 'Searchable',
  }],
},
{
  component: componentTypes.SWITCH,
  linkText: 'Switch',
  ContentText: GenericComponentText,
  value: { fields: [{
    component: componentTypes.SWITCH,
    label: 'Switch',
    name: 'switch',
  }]},
  variants: [{
    name: 'isReadOnly',
    title: 'Read only',
  }, {
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Switch',
  },
  ],
},
{
  component: componentTypes.DATE_PICKER,
  linkText: 'Date picker',
  ContentText: GenericComponentText,
  canBeRequired: true,
  value: { fields: [{
    component: componentTypes.DATE_PICKER,
    label: 'Date Picker',
    name: 'date-picker',
  }]},
  variants: [{
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Date Picker',
  },
  ],
},
{
  component: componentTypes.TIME_PICKER,
  linkText: 'Time picker',
  ContentText: GenericComponentText,
  canBeRequired: true,
  value: { fields: [{
    component: componentTypes.TIME_PICKER,
    label: 'Time Picker',
    name: 'time-picker',
  }]},
  variants: [{
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Time Picker',
  },
  ],
},
{
  component: componentTypes.TABS,
  linkText: 'Tabs / Tab item',
  ContentText: TabsText,
  value: { fields: [{
    component: componentTypes.TABS,
    name: 'tabs',
    fields: [
      {
        component: componentTypes.TAB_ITEM,
        key: '1',
        title: 'Fruits',
        description: 'Here you can find fruits',
        fields: [
          {
            name: 'apple',
            label: 'Apple',
            title: 'Apple',
            component: componentTypes.TEXT_FIELD,
          },
        ],
      },
      {
        component: componentTypes.TAB_ITEM,
        key: '2',
        title: 'Vegetables',
        description: 'Here you can find vegetables',
        fields: [
          {
            name: 'carrot',
            label: 'Carrot',
            title: 'Carrot',
            component: componentTypes.TEXT_FIELD,
          },
        ],
      },
    ],
  }]},
  variants: [],
},
{
  component: componentTypes.SUB_FORM,
  linkText: 'Subform',
  ContentText: CustomComponentText,
  value: { fields: [{
    component: componentTypes.SUB_FORM,
    title: 'Subform',
    description: 'This is a subform',
    name: 'subform',
    key: '1',
    fields: [
      {
        name: 'carrot',
        label: 'Carrot',
        title: 'Carrot',
        component: componentTypes.TEXT_FIELD,
      },
    ],
  }]},
  variants: [{
    name: 'description',
    title: 'Description',
    component: 'input',
    value: 'This is a subform',
  }, {
    name: 'title',
    title: 'Title',
    component: 'input',
    value: 'Subform',
  },
  ],
},
{
  component: 'checkbox-multiple',
  linkText: 'Checkbox multiple',
  ContentText: GenericComponentText,
  value: { fields: [{
    component: componentTypes.CHECKBOX,
    label: 'Checkbox',
    name: 'checkbox',
    options: [
      { label: 'Dog', value: '1' },
      { label: 'Cats', value: '2' },
      { label: 'Hamsters', value: '3' },
    ],
  }]},
  variants: [{
    name: 'isDisabled',
    title: 'Disabled',
  }, {
    name: 'label',
    title: 'Label',
    component: 'input',
    value: 'Checkbox',
  }],
}, {
  component: componentTypes.WIZARD,
  linkText: 'Wizard',
  ContentText: WizardText,
  value: {
    fields: [{
      component: componentTypes.WIZARD,
      name: 'wizzard',
      assignFieldProvider: true,
      fields: [{
        title: 'Get started with adding source',
        name: 'step-1',
        stepKey: 1,
        nextStep: {
          when: 'source-type',
          stepMapper: {
            aws: 'aws',
            google: 'google',
          },
        },
        fields: [{
          component: componentTypes.TEXTAREA_FIELD,
          name: 'source-name',
          type: 'text',
          label: 'Source name',
        }, {
          component: componentTypes.SELECT_COMPONENT,
          name: 'source-type',
          label: 'Source type',
          isRequired: true,
          options: [{
            label: 'Please Choose',
          }, {
            value: 'aws',
            label: 'Aws',
          }, {
            value: 'google',
            label: 'Google',
          }],
          validate: [{
            type: validatorTypes.REQUIRED,
          }],
        }],
      }, {
        title: 'Configure AWS',
        name: 'step-2',
        stepKey: 'aws',
        nextStep: 'summary',
        fields: [{
          component: componentTypes.TEXT_FIELD,
          name: 'aws-field',
          label: 'Aws field part',
        }],
      }, {
        stepKey: 'google',
        title: 'Configure google',
        name: 'step-3',
        nextStep: 'summary',
        fields: [{
          component: componentTypes.TEXT_FIELD,
          name: 'google-field',
          label: 'Google field part',
        }],
      }, {
        fields: [{
          name: 'summary',
          component: 'summary',
          assignFieldProvider: true,
        }],
        stepKey: 'summary',
        name: 'summary',
      }],
    }],
  },
  variants: [],
},
];
