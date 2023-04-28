import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const wizardSchema = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      buttonLabels: {},
      title: 'Cokoliv',
      stepsInfo: [{ title: 'Add a source' }, { title: 'Configure a source' }, { title: 'Summary' }],
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
          nextStep: 'summary',
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
          nextStep: 'summary',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'google-field',
              label: 'Google field part'
            }
          ]
        },
        {
          title: 'hola title',
          name: 'holaname',
          component: componentTypes.PLAIN_TEXT,
          label: 'Hello this is a test and this shall be a text'
        },
        {
          fields: [
            {
              name: 'summary',
              component: componentTypes.PLAIN_TEXT,
              isDisabled: true,
              label: 'Summary'
            }
          ],
          name: 'summary'
        }
      ]
    }
  ]
};

export default wizardSchema;
