/* eslint no-console: "off" */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { componentTypes as components, validatorTypes as validators, defaultSchemaValidator } from '@data-driven-forms/react-form-renderer';
import { formTemplate, componentMapper } from '@data-driven-forms/pf4-component-mapper';

import dynamic from 'next/dynamic';
const CodeEditor = dynamic(import('@docs/components/code-editor'), {
  ssr: false
});

const baseStructure = {
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
                  name: 'switch_1',
                  label: 'Switch',
                  title: 'Switch',
                  component: components.SWITCH
                },
                {
                  name: 'switch_2',
                  label: 'Switch disabled',
                  component: components.SWITCH,
                  isDisabled: true
                },
                {
                  name: 'switch_3',
                  label: 'Switch readOnly',
                  component: components.SWITCH,
                  isReadOnly: true
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
                  hideField: true,
                  component: components.TEXT_FIELD
                },
                {
                  name: 'text_box_7',
                  label: 'Text Box with validator',
                  title: 'Text Box with validator',
                  validate: [
                    {
                      type: validators.PATTERN_VALIDATOR,
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
                  component: components.CHECKBOX
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
                  multi: true,
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
                  name: 'date_control_1',
                  label: 'Datepicker',
                  title: 'Datepicker',
                  component: components.DATE_PICKER
                },
                {
                  name: 'date_control_2',
                  label: 'Datepicker with past days',
                  title: 'Datepicker with past days',
                  component: components.DATE_PICKER
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

const LiveEditor = () => {
  const [state, setState] = useState({
    value: JSON.stringify(baseStructure, null, 2),
    parsedSchema: baseStructure
  });

  const onChange = (value) => {
    let schema;
    try {
      schema = JSON.parse(value);
      setState((state) => ({ ...state, value }));
    } catch (error) {
      console.warn('not a json', error);
    }

    try {
      defaultSchemaValidator(schema, componentMapper);
      setState((state) => ({ ...state, parsedSchema: schema }));
    } catch (error) {
      console.warn('not correct json schema', error);
    }
  };

  const { value, parsedSchema } = state;
  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <div style={{ width: '100%', paddingTop: 10, background: '#1d1f21' }}>
          <CodeEditor readOnly={false} mode="json" onChange={onChange} value={value} maxLines={50} />
        </div>
      </Grid>
      <Grid item md={6} xs={12}>
        <Paper square style={{ padding: 16, paddingLeft: 24 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className="pf4">
                <FormRenderer
                  componentMapper={componentMapper}
                  formTemplate={formTemplate()}
                  schema={parsedSchema}
                  onSubmit={console.log}
                  onCancel={() => console.log('Cancel clicked')}
                  canReset
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LiveEditor;
