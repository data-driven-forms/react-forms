/* eslint-disable camelcase */
import { componentTypes, validatorTypes } from '../src';

const output = {
  title: 'Testing dialog',
  description: 'Description of testing Dialog',
  fields: [
    {
      name: 'select_1',
      label: 'Test select',
      component: componentTypes.SELECT,
      options: [
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        }
      ]
    },
    {
      name: 'text_box_1',
      label: 'Text Box 1',
      title: 'Text Box',
      component: componentTypes.TEXT_FIELD
    },
    {
      name: 'text_box_1_condition',
      label: 'Text Box conditional',
      title: 'Text Box',
      component: componentTypes.TEXT_FIELD,
      condition: [
        {
          when: ['text_box_1', 'text_box_4'],
          is: 'a'
        },
        {
          when: 'text_box_3',
          is: 'x'
        }
      ]
    },
    {
      name: 'text_box_2',
      label: 'Text Box 2',
      helperText: 'Helper text',
      component: componentTypes.TEXT_FIELD,
      hideField: true
    },
    {
      name: 'text_box_3',
      label: 'Text Box 3',
      isRequired: true,
      component: componentTypes.TEXT_FIELD,
      clearedValue: 'override',
      validate: [{ type: validatorTypes.MIN_LENGTH, threshold: 12, message: 'bar' }]
    },
    {
      name: 'text_box_4',
      label: 'Text Box 4',
      isReadOnly: true,
      component: componentTypes.TEXT_FIELD
    },
    {
      name: 'foo',
      label: 'Uaaaaaaaaaaaaaaaaa',
      component: componentTypes.TEXT_FIELD,
      condition: {
        when: 'text_box_1',
        is: 'a'
      }
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
          type: validatorTypes.PATTERN_VALIDATOR,
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
    },
    {
      name: 'dataShower',
      id: 'shower 1',
      label: 'Test select',
      component: 'dataShower',
      loadOptions: () => new Promise((resolve) => setTimeout(() => resolve({ custom: 'data' }), 1500))
    },
    {
      name: 'dataShower',
      label: 'Test select',
      id: 'shower 2',
      component: 'dataShower',
      actions: {
        loadOptions: ['loadData', { x: 'y', pp: 'adsad' }],
        label: ['loadLabel', 'cosi']
      }
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
