/* eslint-disable camelcase */
import validatorTypes from '../../validator-types';
import componentTypes from '../../component-types';

const output = {
  title: 'Testing dialog',
  description: 'Description of testing Dialog',
  fields: [
    {
      fields: [
        {
          title: 'Tab 1',
          description: 'Text boxes and text areas',
          name: '553',
          fields: [
            {
              title: 'Text boxes',
              name: '637',
              fields: [
                {
                  name: 'text_box_1',
                  label: 'Text Box',
                  title: 'Text Box',
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'text_box_2',
                  label: 'Text Box with help',
                  title: 'Text Box with help',
                  helperText: 'Helper text',
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'text_box_3',
                  label: 'Text Box required',
                  title: 'Text Box required',
                  isRequired: true,
                  component: componentTypes.TEXT_FIELD,
                  validate: [{ type: validatorTypes.REQUIRED }]
                },
                {
                  name: 'text_box_4',
                  label: 'Text Box readonly',
                  title: 'Text Box readonly',
                  isReadOnly: true,
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'text_box_5',
                  label: 'Text Box default',
                  title: 'Text Box default',
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'text_box_6',
                  label: 'Text Box unvisible',
                  title: 'Text Box unvisible',
                  isVisible: false,
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'text_box_7',
                  label: 'Text Box with validator',
                  title: 'Text Box with validator',
                  validate: [
                    {
                      type: validatorTypes.PATTERN,
                      pattern: '[0-9]'
                    }
                  ],
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'text_box_8',
                  label: 'Text Box integer value',
                  title: 'Text Box integer value',
                  dataType: 'integer',
                  component: componentTypes.TEXT_FIELD,
                  type: 'number'
                },
                {
                  name: 'text_box_9',
                  label: 'Text Box string value',
                  title: 'Text Box string value',
                  dataType: 'string',
                  component: componentTypes.TEXT_FIELD
                }
              ],
              component: componentTypes.SUB_FORM
            },
            {
              title: 'Text areas',
              name: '638',
              fields: [
                {
                  name: 'textarea_box_1',
                  label: 'Text Area',
                  title: 'Text Area',
                  component: componentTypes.TEXTAREA
                }
              ],
              component: componentTypes.SUB_FORM
            }
          ],
          component: componentTypes.TAB_ITEM
        },
        {
          title: 'Tab 2',
          description: 'Checks',
          name: '554',
          fields: [
            {
              title: 'Check boxes',
              name: '639',
              fields: [
                {
                  name: 'check_box_1',
                  label: 'Check Box',
                  title: 'Check Box',
                  component: componentTypes.CHECKBOX
                },
                {
                  name: 'check_box_2',
                  label: 'Check Box checked',
                  title: 'Check Box checked',
                  component: componentTypes.CHECKBOX
                }
              ],
              component: componentTypes.SUB_FORM
            },
            {
              title: 'Radios',
              name: '640',
              fields: [
                {
                  name: 'radio_button_1',
                  label: 'Radio Button',
                  title: 'Radio Button',
                  dataType: 'string',
                  component: componentTypes.RADIO,
                  options: [
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    }
                  ]
                },
                {
                  name: 'radio_button_2',
                  label: 'Radio Button sorted by',
                  title: 'Radio Button sorted by',
                  dataType: 'string',
                  component: componentTypes.RADIO,
                  options: [
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    }
                  ]
                },
                {
                  name: 'radio_button_4',
                  label: 'Radio Button default',
                  title: 'Radio Button default',
                  dataType: 'string',
                  component: componentTypes.RADIO,
                  options: [
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    }
                  ]
                }
              ],
              component: componentTypes.SUB_FORM
            }
          ],
          component: componentTypes.TAB_ITEM
        },
        {
          title: 'Tab 3',
          description: '',
          name: '555',
          fields: [
            {
              title: 'Dropdowns',
              name: '641',
              fields: [
                {
                  name: 'dropdown_list_1',
                  label: 'Dropdown',
                  title: 'Dropdown',
                  dataType: 'string',
                  component: componentTypes.SELECT,
                  options: [
                    {
                      label: '<None>',
                      value: null
                    },
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    }
                  ]
                },
                {
                  name: 'dropdown_list_2',
                  label: 'Dropdown default value',
                  title: 'Dropdown default value',
                  dataType: 'string',
                  component: componentTypes.SELECT,
                  options: [
                    {
                      label: '<None>',
                      value: null
                    },
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    }
                  ]
                },
                {
                  name: 'dropdown_list_3',
                  label: 'Dropdown multiselect',
                  title: 'Dropdown multiselect',
                  dataType: 'string',
                  component: componentTypes.SELECT,
                  isMulti: true,
                  options: [
                    {
                      label: '<None>',
                      value: null
                    },
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    }
                  ]
                },
                {
                  name: 'dropdown_list_4',
                  label: 'Dropdown sort by value',
                  title: 'Dropdown sort by value',
                  dataType: 'string',
                  component: componentTypes.SELECT,
                  options: [
                    {
                      label: '<None>',
                      value: null
                    },
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    }
                  ]
                }
              ],
              component: componentTypes.SUB_FORM
            }
          ],
          component: componentTypes.TAB_ITEM
        },
        {
          title: 'Tab 4',
          description: '',
          name: '556',
          fields: [
            {
              title: 'Datepickers',
              name: '642',
              fields: [
                {
                  name: 'date_control_1',
                  label: 'Datepicker',
                  title: 'Datepicker',
                  component: componentTypes.DATE_PICKER
                },
                {
                  name: 'date_control_2',
                  label: 'Datepicker with past days',
                  title: 'Datepicker with past days',
                  component: componentTypes.DATE_PICKER
                }
              ],
              component: componentTypes.SUB_FORM
            },
            {
              title: 'Timepickers',
              name: '643',
              fields: [
                {
                  name: 'date_time_control_1',
                  label: 'Timepicker',
                  title: 'Timepicker',
                  component: componentTypes.TIME_PICKER
                },
                {
                  name: 'date_time_control_2',
                  label: 'Timepicker with past days',
                  title: 'Timepicker with past days',
                  component: componentTypes.TIME_PICKER
                }
              ],
              component: componentTypes.SUB_FORM
            }
          ],
          component: componentTypes.TAB_ITEM
        },
        {
          title: 'Mixed',
          description: '',
          name: '558',
          fields: [
            {
              title: 'New Section',
              name: '645',
              fields: [
                {
                  name: 'text_box_10',
                  label: 'Text Box',
                  title: 'Text Box',
                  component: componentTypes.TEXT_FIELD
                },
                {
                  name: 'textarea_box_2',
                  label: 'Text Area',
                  title: 'Text Area',
                  component: componentTypes.TEXTAREA
                },
                {
                  name: 'check_box_3',
                  label: 'Check Box',
                  title: 'Check Box',
                  component: componentTypes.CHECKBOX
                },
                {
                  name: 'check_box_4',
                  label: 'Check Box',
                  title: 'Check Box',
                  component: componentTypes.CHECKBOX
                },
                {
                  name: 'dropdown_list_5',
                  label: 'Dropdown',
                  title: 'Dropdown',
                  dataType: 'string',
                  component: componentTypes.SELECT,
                  options: [
                    {
                      label: '<None>',
                      value: null
                    },
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    }
                  ]
                },
                {
                  name: 'radio_button_3',
                  label: 'Radio Button',
                  title: 'Radio Button',
                  dataType: 'string',
                  component: componentTypes.RADIO,
                  options: [
                    {
                      label: 'One',
                      value: '1'
                    },
                    {
                      label: 'Two',
                      value: '2'
                    },
                    {
                      label: 'Three',
                      value: '3'
                    }
                  ]
                },
                {
                  name: 'date_time_control_3',
                  label: 'Timepicker',
                  title: 'Timepicker',
                  component: componentTypes.TIME_PICKER
                }
              ],
              component: componentTypes.SUB_FORM
            }
          ],
          component: componentTypes.TAB_ITEM
        }
      ],
      component: componentTypes.TABS,
      name: '57'
    }
  ]
};

export const defaultValues = {
  text_box_5: '"hello"',
  check_box_2: 'true',
  radio_button_4: '2',
  dropdown_list_2: '2'
};

export default output;
