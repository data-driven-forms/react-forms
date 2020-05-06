/* eslint-disable */
import { componentTypes as components, validatorTypes as validators } from '@data-driven-forms/react-form-renderer';

const asyncOptions = [
  { label: 'async-option-1', value: 'async-option-1' },
  { label: 'async-option-2', value: 'async-option-2' },
  { label: 'async-option-3', value: 'async-option-3' },
  { label: 'async option pepa 1', value: 'async-option-4' },
  { label: 'async option pepa 2', value: 'async-option-5' }
];

const baseOptions = asyncOptions.slice(0, 3);

const asyncLoadOptions = (searchValue) =>
  new Promise((resolve) =>
    setTimeout(() => {
      if (searchValue && searchValue.trim() !== '') {
        return resolve(asyncOptions.filter(({ label }) => label.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase())));
      }

      return resolve(baseOptions);
    }, 2000)
  );

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
              name: 'check_box_1',
              label: 'Check Box',
              title: 'Check Box',
              helperText: 'aaaa',
              description: 'description',
              component: components.CHECKBOX,
              options: [
                {
                  label: 'Dog',
                  value: '1'
                },
                {
                  label: 'Cats',
                  value: '2'
                },
                {
                  label: 'Hamsters',
                  value: '3'
                }
              ]
            },
            {
              title: 'Text boxes',
              name: '637',
              fields: [
                {
                  name: 'text_box_1',
                  label: 'Text Box',
                  title: 'Text Box',
                  component: components.SWITCH,
                  onText: 'True',
                  offText: 'False'
                },
                {
                  name: 'text_box_111',
                  label: 'Switch conditional',
                  title: 'Text Box',
                  component: components.SWITCH,
                  isDisabled: true,
                  condition: {
                    when: 'text_box_1',
                    is: true
                  }
                },
                {
                  name: 'text_box_1111',
                  label: 'Text Box',
                  title: 'Text Box',
                  component: components.SWITCH,
                  isReadOnly: true
                },
                {
                  name: 'text_box_11111',
                  label: 'Text Box',
                  title: 'Text Box',
                  component: components.SWITCH,
                  placeholder: 'hello',
                  onText: 'turned onsssssssssssssssssss',
                  offText: 'turnedOff'
                },
                {
                  name: 'text_box_2',
                  label: 'Text Box with help',
                  title: 'Text Box with help',
                  helperText: 'Helper text',
                  component: components.TEXT_FIELD
                },
                {
                  name: 'text_box_3',
                  label: 'Text Box required',
                  title: 'Text Box required',
                  isRequired: true,
                  component: components.TEXT_FIELD,
                  validateOnMount: true,
                  validate: [{ type: validators.REQUIRED }]
                },
                {
                  name: 'text_box_4',
                  label: 'Text Box readonly',
                  title: 'Text Box readonly',
                  isReadOnly: true,
                  component: components.TEXT_FIELD
                },
                {
                  name: 'text_box_5',
                  label: 'Text Box default',
                  title: 'Text Box default',
                  component: components.TEXT_FIELD
                },
                {
                  name: 'text_box_6',
                  label: 'Text Box unvisible',
                  title: 'Text Box unvisible',
                  component: components.TEXT_FIELD
                },
                {
                  name: 'text_box_7',
                  label: 'Text Box with validator',
                  title: 'Text Box with validator',
                  validate: [
                    {
                      type: validators.PATTERN,
                      pattern: '[0-9]'
                    }
                  ],
                  component: components.TEXT_FIELD
                },
                {
                  name: 'text_box_8',
                  label: 'Text Box integer value',
                  title: 'Text Box integer value',
                  dataType: 'integer',
                  component: components.TEXT_FIELD,
                  type: 'number'
                },
                {
                  name: 'text_box_9',
                  label: 'Text Box string value',
                  title: 'Text Box string value',
                  dataType: 'string',
                  component: components.TEXT_FIELD
                }
              ],
              component: components.SUB_FORM
            },
            {
              title: 'Text areas',
              name: '638',
              fields: [
                {
                  name: 'textarea_box_1',
                  label: 'Text Area',
                  title: 'Text Area',
                  component: components.TEXTAREA
                }
              ],
              component: components.SUB_FORM
            }
          ],
          component: components.TAB_ITEM
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
                  component: components.CHECKBOX,
                  options: [
                    {
                      label: 'Dog',
                      value: '1'
                    },
                    {
                      label: 'Cats',
                      value: '2'
                    },
                    {
                      label: 'Hamsters',
                      value: '3'
                    }
                  ]
                },
                {
                  name: 'check_box_2',
                  label: 'Check Box checked',
                  title: 'Check Box checked',
                  component: components.CHECKBOX
                }
              ],
              component: components.SUB_FORM
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
                  component: components.RADIO,
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
                  component: components.RADIO,
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
                  component: components.RADIO,
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
              component: components.SUB_FORM
            }
          ],
          component: components.TAB_ITEM
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
                  component: components.SELECT,
                  initialValue: ['1'],
                  isSearchable: true,
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
                  component: components.SELECT,
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
                  component: components.SELECT,
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
                  component: components.SELECT,
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
                },
                {
                  name: 'select_clear',
                  label: 'Clearable dropdown',
                  title: 'Clearable dropdown',
                  component: components.SELECT,
                  isMulti: true,
                  isClearable: true,
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
                }
              ],
              component: components.SUB_FORM
            }
          ],
          component: components.TAB_ITEM
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
                  component: components.SELECT,
                  name: 'date_control_select',
                  label: 'Select',
                  options: [
                    {
                      value: 'foo',
                      label: 'Foo'
                    },
                    {
                      value: 'bar',
                      label: 'Bar'
                    }
                  ]
                },
                {
                  name: 'date_control_1',
                  label: 'Datepicker',
                  title: 'Datepicker with disabled days',
                  component: components.DATE_PICKER,
                  isClearable: true,
                  disabledDays: [
                    'today',
                    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5),
                    {
                      before: 'Tue Oct 08 2019 10:23:03 GMT+0200 (Central European Summer Time)'
                    }
                  ]
                },
                {
                  name: 'date_control_2',
                  label: 'Datepicker with past days',
                  title: 'Datepicker with past days',
                  component: components.DATE_PICKER,
                  variant: 'date-time',
                  initialValue: '2019-11-04T12:31:00.000Z'
                }
              ],
              component: components.SUB_FORM
            },
            {
              title: 'Timepickers',
              name: '643',
              fields: [
                {
                  name: 'date_time_control_1',
                  label: 'Timepicker',
                  title: 'Timepicker',
                  component: components.TIME_PICKER
                },
                {
                  name: 'date_time_control_2',
                  label: 'Timepicker with past days',
                  title: 'Timepicker with past days',
                  component: components.TIME_PICKER
                }
              ],
              component: components.SUB_FORM
            }
          ],
          component: components.TAB_ITEM
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
                  component: components.TEXT_FIELD
                },
                {
                  name: 'textarea_box_2',
                  label: 'Text Area',
                  title: 'Text Area',
                  component: components.TEXTAREA
                },
                {
                  name: 'check_box_3',
                  label: 'Check Box',
                  title: 'Check Box',
                  component: components.CHECKBOX
                },
                {
                  name: 'check_box_4',
                  label: 'Check Box',
                  title: 'Check Box',
                  component: components.CHECKBOX
                },
                {
                  name: 'dropdown_list_5',
                  label: 'Dropdown',
                  title: 'Dropdown',
                  dataType: 'string',
                  component: components.SELECT,
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
                  component: components.RADIO,
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
                  component: components.TIME_PICKER
                }
              ],
              component: components.SUB_FORM
            }
          ],
          component: components.TAB_ITEM
        }
      ],
      component: components.TABS,
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
