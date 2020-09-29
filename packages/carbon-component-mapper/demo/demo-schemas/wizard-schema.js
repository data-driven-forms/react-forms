import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

export const wizardSchema = {
  fields: [
    {
      component: componentTypes.WIZARD,
      name: 'wizzard',
      crossroads: ['source.source-type'],
      stepsInfo: [{ title: 'Configure source' }, { title: 'Enter details' }, { title: 'Review' }],
      title: 'Title',
      description: 'Description',
      vertical: true,
      fields: [
        {
          title: 'Get started with adding source',
          name: 1,
          nextStep: {
            when: 'source.source-type',
            stepMapper: {
              aws: 'aws',
              google: 'google'
            }
          },
          fields: [
            {
              component: componentTypes.TEXTAREA,
              name: 'source.source-name',
              type: 'text',
              label: 'Source name'
            },
            {
              component: componentTypes.SELECT,
              name: 'source.source-type',
              label: 'Source type',
              isRequired: true,
              options: [
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
          substepOf: 'Summary',
          nextStep: 'summary',
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ],
              isRequired: true
            }
          ]
        },
        {
          name: 'google',
          title: 'Configure google',
          nextStep: 'summary',
          showTitle: false,
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'google.google-field',
              label: 'Google field part',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          fields: [
            {
              name: 'summary',
              component: componentTypes.TEXT_FIELD
            }
          ],
          name: 'summary',
          substepOf: 'Summary',
          title: 'Summary'
        }
      ]
    }
  ]
};
