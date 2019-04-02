import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const wizardSchema = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    buttonLabels: {
    },
    title: 'Cokoliv',
    stepsInfo: [
      { title: 'Add a source' },
      { title: 'Configure a source' },
      { title: 'Summary' },
    ],
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
        component: componentTypes.TEXT_FIELD,
        isDisabled: true,
        label: 'Summary',
      }],
      stepKey: 'summary',
      name: 'summary',
    }],
  }],
};

export default wizardSchema;
