import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import GenericComponentText from './examples-texts/generic-mui-component';
import TabsText from './examples-texts/tabs';
import CustomComponentText from './examples-texts/custom-component';
import WizardText from './examples-texts/wizard';
import SelectText from './examples-texts/select';
import FieldArray from './examples-texts/field-array';
import DatePickerText from './examples-texts/date-picker';
import Slider from './examples-texts/slider';
import DualListSelect from './examples-texts/dual-list-select';
import arraySchemaDDF from './field-array-schema';

const formGroupVariants = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'label',
    type: 'string',
    required: false
  },
  {
    name: 'helperText',
    type: 'string',
    required: false
  },
  {
    name: 'description',
    type: 'string',
    required: false
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    required: false
  },
  {
    name: 'isReadOnly',
    type: 'boolean',
    required: false
  }
];

export const baseExamples = [
  {
    component: componentTypes.TEXT_FIELD,
    link: componentTypes.TEXT_FIELD,
    linkText: 'Text Field',
    ContentText: GenericComponentText,
    value: {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          label: 'First name',
          name: 'first-name'
        }
      ]
    },
    canBeRequired: true,
    variants: [
      ...formGroupVariants,

      {
        name: 'placeholder',
        type: 'string'
      },
      {
        name: 'type',
        type: 'string'
      }
    ]
  },
  {
    component: componentTypes.TEXTAREA,
    link: componentTypes.TEXTAREA,
    linkText: 'Text area',
    ContentText: GenericComponentText,
    canBeRequired: true,
    value: {
      fields: [
        {
          component: componentTypes.TEXTAREA,
          label: 'Long text',
          name: 'long-text'
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'placeholder',
        type: 'string'
      }
    ]
  },
  {
    component: componentTypes.CHECKBOX,
    link: componentTypes.CHECKBOX,
    prev: {
      link: '/renderer/form-template',
      label: 'Form Controls'
    },
    linkText: 'Checkbox',
    ContentText: GenericComponentText,
    value: {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          label: 'Checkbox',
          name: 'checkbox'
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'options',
        type: 'array',
        required: false
      }
    ]
  },
  {
    component: componentTypes.RADIO,
    link: componentTypes.RADIO,
    linkText: 'Radio',
    ContentText: GenericComponentText,
    canBeRequired: true,
    value: {
      fields: [
        {
          component: componentTypes.RADIO,
          label: 'Radio',
          name: 'radio',
          options: [
            { label: 'Dogs', value: '1' },
            { label: 'Cats', value: '2' },
            { label: 'Hamsters', value: '3' }
          ]
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'options',
        type: 'array',
        required: false
      }
    ]
  },
  {
    component: componentTypes.SELECT,
    link: componentTypes.SELECT,
    linkText: 'Select',
    ContentText: SelectText,
    canBeRequired: true,
    value: {
      fields: [
        {
          component: componentTypes.SELECT,
          label: 'Select',
          name: 'select',
          simpleValue: true,
          options: [
            { label: 'Dogs', value: '1' },
            { label: 'Cats', value: '2' },
            { label: 'Hamsters', value: '3' }
          ]
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'options',
        type: 'array'
      },
      {
        name: 'noOptionsMessage',
        type: 'string'
      },
      {
        name: 'placeholder',
        type: 'string'
      },
      {
        name: 'isSearchable',
        type: 'boolean'
      },
      {
        name: 'isClearable',
        type: 'boolean'
      },
      {
        name: 'simpleValue',
        type: 'boolean'
      },
      {
        name: 'loadOptions',
        type: 'func'
      }
    ]
  },
  {
    component: componentTypes.SWITCH,
    link: componentTypes.SWITCH,
    linkText: 'Switch',
    ContentText: GenericComponentText,
    value: {
      fields: [
        {
          component: componentTypes.SWITCH,
          label: 'Switch',
          name: 'switch'
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'onText',
        type: 'string'
      },
      {
        name: 'offText',
        type: 'string'
      }
    ]
  },
  {
    component: componentTypes.DATE_PICKER,
    link: componentTypes.DATE_PICKER,
    linkText: 'Date picker',
    ContentText: DatePickerText,
    canBeRequired: true,
    value: {
      fields: [
        {
          component: componentTypes.DATE_PICKER,
          label: 'Date Picker',
          name: 'date-picker'
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'showTodayButton',
        type: 'boolean',
        required: false
      },
      {
        name: 'todayButtonLabel',
        type: 'string',
        required: false
      },
      {
        name: 'closeOnDaySelect',
        type: 'boolean',
        required: false
      },
      {
        name: 'isClearable',
        type: 'boolean',
        required: false
      }
    ]
  },
  {
    component: componentTypes.TIME_PICKER,
    link: componentTypes.TIME_PICKER,
    linkText: 'Time picker',
    ContentText: GenericComponentText,
    canBeRequired: true,
    value: {
      fields: [
        {
          component: componentTypes.TIME_PICKER,
          label: 'Time Picker',
          name: 'time-picker'
        }
      ]
    },
    variants: [...formGroupVariants]
  },
  {
    component: componentTypes.TABS,
    link: componentTypes.TABS,
    linkText: 'Tabs / Tab item',
    ContentText: TabsText,
    value: {
      fields: [
        {
          component: componentTypes.TABS,
          name: 'tabs',
          fields: [
            {
              component: componentTypes.TAB_ITEM,
              validateFields: ['apple'],
              name: '1',
              title: 'Fruits',
              description: 'Here you can find fruits',
              fields: [
                {
                  name: 'apple',
                  label: 'Apple',
                  title: 'Apple',
                  component: componentTypes.TEXT_FIELD,
                  validate: [
                    {
                      type: validatorTypes.REQUIRED
                    }
                  ]
                }
              ]
            },
            {
              component: componentTypes.TAB_ITEM,
              name: '2',
              title: 'Vegetables',
              description: 'Here you can find vegetables',
              fields: [
                {
                  name: 'carrot',
                  label: 'Carrot',
                  title: 'Carrot',
                  component: componentTypes.TEXT_FIELD
                }
              ]
            }
          ]
        }
      ]
    },
    variants: []
  },
  {
    component: componentTypes.SUB_FORM,
    link: componentTypes.SUB_FORM,
    linkText: 'Subform',
    ContentText: CustomComponentText,
    value: {
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
    },
    variants: [
      {
        name: 'title',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      }
    ]
  },
  {
    component: 'checkbox-multiple',
    link: 'checkbox-multiple',
    linkText: 'Checkbox multiple',
    ContentText: GenericComponentText,
    value: {
      fields: [
        {
          component: componentTypes.CHECKBOX,
          label: 'Checkbox',
          name: 'checkbox',
          options: [
            { label: 'Dog', value: '1' },
            { label: 'Cats', value: '2' },
            { label: 'Hamsters', value: '3' }
          ]
        }
      ]
    },
    variants: [
      ...formGroupVariants,
      {
        name: 'options',
        type: 'array',
        required: false
      }
    ]
  },
  {
    component: componentTypes.PLAIN_TEXT,
    link: 'plain-text',
    linkText: 'Plain Text',
    ContentText: GenericComponentText,
    variants: [
      {
        name: 'name',
        type: 'string',
        required: true
      },
      {
        name: 'label',
        type: 'string',
        required: true
      }
    ],
    value: {
      fields: [
        {
          component: componentTypes.PLAIN_TEXT,
          name: 'plain-text-component',
          label: `Lorem ipsum sem velit. Mauris scelerisque tortor sed lorem dapibus, bibendum scelerisque ligula consequat. Quisque fringilla luctus.
Vestibulum vulputate inceptos himenaeos.`
        }
      ]
    }
  },
  {
    component: componentTypes.DUAL_LIST_SELECT,
    link: componentTypes.DUAL_LIST_SELECT,
    linkText: 'Dual list select',
    ContentText: DualListSelect,
    variants: [...formGroupVariants],
    value: {
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
    }
  },
  {
    component: componentTypes.FIELD_ARRAY,
    link: componentTypes.FIELD_ARRAY,
    linkText: 'Field Array',
    ContentText: FieldArray,
    value: arraySchemaDDF,
    variants: [
      {
        name: 'name',
        type: 'string',
        required: true
      },
      {
        name: 'label',
        type: 'string',
        required: false
      },
      {
        name: 'description',
        type: 'string',
        required: false
      }
    ]
  },
  {
    component: componentTypes.SLIDER,
    link: componentTypes.SLIDER,
    linkText: 'Slider',
    ContentText: Slider,
    value: {
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
    },
    variants: [
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
    ]
  },
  {
    component: componentTypes.WIZARD,
    link: componentTypes.WIZARD,
    linkText: 'Wizard',
    ContentText: WizardText,
    value: {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizzard',
          fields: [
            {
              title: 'Get started with adding source',
              name: 'step-1',
              nextStep: {
                when: 'source-type',
                stepMapper: {
                  aws: 'aws',
                  google: 'google'
                }
              },
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'source-name',
                  type: 'text',
                  label: 'Source name'
                },
                {
                  component: componentTypes.SELECT,
                  name: 'source-type',
                  label: 'Source type',
                  isRequired: true,
                  options: [
                    {
                      label: 'Please Choose'
                    },
                    {
                      value: 'aws',
                      label: 'Aws'
                    },
                    {
                      value: 'google',
                      label: 'Google'
                    }
                  ],
                  validate: [
                    {
                      type: validatorTypes.REQUIRED
                    }
                  ]
                }
              ]
            },
            {
              title: 'Configure AWS',
              name: 'aws',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws-field',
                  label: 'Aws field part'
                }
              ]
            },
            {
              name: 'google',
              title: 'Configure google',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'google-field',
                  label: 'Google field part'
                }
              ]
            }
          ]
        }
      ]
    },
    variants: [
      {
        name: 'name',
        type: 'string',
        required: true
      },
      {
        name: 'fields',
        type: 'array',
        required: true
      }
    ],
    next: {
      link: '/releases',
      label: 'Releases'
    },
    prev: {
      link: '/component-example/time-picker',
      label: 'Time Picker'
    }
  }
];
