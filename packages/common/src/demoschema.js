/* eslint-disable camelcase */
import { validatorTypes as validators } from '@data-driven-forms/react-form-renderer';

const options = [
  { value: 1, label: 'cats' },
  { value: 'dog', label: 'fog' }
];

const genereateField = (component, name = 'standard', optionsOptional = {}) => [
  {
    name: `${component} -- ${name} -- header`,
    component: 'plain-text',
    label: `${component} -- ${name}`
  },
  {
    label: `${component} -- ${name}`,
    name: `${component} -- ${name}`,
    component,
    options: component === 'select' || component === 'radio' ? options : undefined,
    ...optionsOptional
  },
  {
    name: `${component} -- ${name} -- divider 2 `,
    component: 'plain-text',
    label: '\n.  \n.'
  }
];

const componentList = ['text-field', 'checkbox', 'date-picker', 'radio', 'select', 'switch', 'textarea', 'time-picker', 'slider'];

const superSchema = {
  fields: [
    {
      component: 'tabs',
      name: 'tabs',
      fields: componentList.reduce(
        (acc, curr) => [
          ...acc,
          {
            component: 'tab-item',
            name: curr,
            title: curr,
            fields: [
              ...(curr === 'slider' ? [genereateField(curr, 'maxmin', { step: 1, max: 100, min: 0 })] : []),
              ...genereateField(curr),
              ...genereateField(curr, 'helper text', { helperText: 'This is helper text' }),
              ...genereateField(curr, 'placeholder', { placeholder: 'This is placeholder' }),
              ...genereateField(curr, 'description', { description: 'This is this description' }),
              ...genereateField(curr, 'required error', { validate: [{ type: validators.REQUIRED }] }),
              ...genereateField(curr, 'isDisabled', { isDisabled: true }),
              ...genereateField(curr, 'isReadOnly', { isReadOnly: true }),
              ...genereateField(curr, 'is required', { isRequired: true }),
              ...(curr === 'select'
                ? [
                    ...genereateField(curr, 'isClearable', { isClearable: true }),
                    ...genereateField(curr, 'isSearchable', { isSearchable: true }),
                    ...genereateField(curr, 'isMulti', { isMulti: true })
                  ]
                : []),
              ...(curr === 'checkbox'
                ? [
                    ...genereateField(curr, 'multipleoptions', { options }),
                    ...genereateField(curr, 'multipleoptions helper text', { helperText: 'This is helper text', options }),
                    ...genereateField(curr, 'multipleoptions placeholder', { placeholder: 'This is placeholder', options }),
                    ...genereateField(curr, 'multipleoptions description', { description: 'This is this description', options }),
                    ...genereateField(curr, 'multipleoptions required error', { validate: [{ type: validators.REQUIRED }], options }),
                    ...genereateField(curr, 'multipleoptions isDisabled', { isDisabled: true, options }),
                    ...genereateField(curr, 'multipleoptions isReadOnly', { isReadOnly: true, options }),
                    ...genereateField(curr, 'multipleoptions is required', { isRequired: true, options })
                  ]
                : []),
              ...(curr === 'switch'
                ? [
                    ...genereateField(curr, 'onText', { onText: 'Turned on' }),
                    ...genereateField(curr, 'offText', { offText: 'Turned off' }),
                    ...genereateField(curr, 'onText&&offText', { onText: 'Turned on', offText: 'Turned off' })
                  ]
                : [])
            ]
          }
        ],
        []
      )
    }
  ]
};

export default superSchema;
