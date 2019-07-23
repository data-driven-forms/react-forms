import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

export const wizardSchema = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    //inModal: true,
    title: 'Title',
    description: 'Description',
    buttonsPosition: 'left',
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
      substepOf: 'Summary',
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
      }],
      stepKey: 'summary',
      name: 'summary',
      substepOf: 'Summary',
      title: 'Summary',
    }],
  }],
};

export const wizardSchemaSimple = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    title: 'Title',
    description: 'Description',
    buttonsPosition: 'left',
    fields: [{
      title: 'Get started with adding source',
      name: 'step-1',
      stepKey: 1,
      nextStep: 'aws',
      fields: [{
        component: componentTypes.TEXTAREA_FIELD,
        name: 'source-name',
        type: 'text',
        label: 'Source name',
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
        isRequired: true,
        validate: [{
          type: validatorTypes.REQUIRED,
        }],
      }],
    }, {
      fields: [{
        name: 'summary',
        component: 'summary',
      }],
      stepKey: 'summary',
      name: 'summary',
      title: 'Summary',
    }],
  }],
};

export const wizardSchemaSubsteps = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    title: 'Title',
    description: 'Description',
    buttonsPosition: 'left',
    fields: [{
      title: 'Get started with adding source',
      name: 'step-1',
      stepKey: 1,
      nextStep: 'aws',
      fields: [{
        component: componentTypes.TEXTAREA_FIELD,
        name: 'source-name',
        type: 'text',
        label: 'Source name',
      }],
    }, {
      title: 'Configure AWS',
      name: 'step-2',
      stepKey: 'aws',
      nextStep: 'summary',
      substepOf: 'Summary',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'aws-field',
        label: 'Aws field part',
      }],
    }, {
      fields: [{
        name: 'summary',
        component: 'summary',
      }],
      stepKey: 'summary',
      name: 'summary',
      title: 'Summary',
      substepOf: 'Summary',
    }],
  }],
};

export const wizardSchemaMoreSubsteps = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    title: 'Title',
    description: 'Description',
    buttonsPosition: 'left',
    fields: [{
      title: 'Get started with adding source',
      name: 'step-1',
      stepKey: 1,
      nextStep: 'aws',
      fields: [{
        component: componentTypes.TEXTAREA_FIELD,
        name: 'source-name',
        type: 'text',
        label: 'Source name',
      }],
    }, {
      title: 'Configure AWS',
      name: 'step-2',
      stepKey: 'aws',
      nextStep: 'aws2',
      substepOf: 'Summary',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'aws-field',
        label: 'Aws field part',
      }],
    }, {
      title: 'Configure AWS part 2',
      name: 'step-88',
      stepKey: 'aws2',
      nextStep: 'summary',
      substepOf: 'Summary',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'aws-field',
        label: 'Aws field part',
      }],
    },
    {
      fields: [{
        name: 'summary',
        component: 'summary',
      }],
      stepKey: 'summary',
      name: 'summary',
      title: 'Summary',
      substepOf: 'Finish',
      nextStep: 'summary2',
    }, {
      fields: [{
        name: 'summary',
        component: 'summary',
      }],
      stepKey: 'summary2',
      name: 'summary2',
      title: 'Summary2',
      substepOf: 'Finish',
    }],
  }],
};
