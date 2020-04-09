import React, { useState } from 'react';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { Button } from '@patternfly/react-core';

const ValidateButtons = ({ disableBack, handlePrev, buttonLabels: { back, cancel }, formOptions, renderNextButton }) => {
  const [ state, setState ] = useState('init');

  const setValidating = () => {
    setState('validating');
    setTimeout(() => setState('done'), 0);
  };

  return (
    <React.Fragment>
      { state === 'init' ? <Button
        variant="primary"
        type="button"
        isDisabled={ !formOptions.valid }
        onClick={ setValidating }
      >
        Validate
      </Button> :
        state === 'validating' ? <Button type="button" variant="primary" isDisabled={ true } onClick={ () => {} }>Validating...</Button> :
          renderNextButton() }
      <Button type="button" variant="secondary" isDisabled={ disableBack } onClick={ handlePrev }>{ back }</Button>
      <Button type="button" variant="link" onClick={ formOptions.onCancel }>{ cancel }</Button>
    </React.Fragment>
  );
};

export const wizardSchema = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    crossroads: ['source.source-type'],
    predictSteps: true,
    //inModal: true,
    title: 'Title',
    showTitles: true,
    description: 'Description',
    buttonsPosition: 'left',
    fields: [{
      title: 'Get started with adding source',
      name: 'step-1',
      stepKey: 1,
      nextStep: {
        when: 'source.source-type',
        stepMapper: {
          aws: 'aws',
          google: 'google',
        },
      },
      fields: [{
        component: componentTypes.TEXTAREA_FIELD,
        name: 'source.source-name',
        type: 'text',
        label: 'Source name',
      }, {
        component: componentTypes.SELECT_COMPONENT,
        name: 'source.source-type',
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
      buttons: ValidateButtons,
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'aws-field',
        label: 'Aws field part',
        validate: [{
          type: validatorTypes.REQUIRED,
        }],
        isRequired: true,
      }],
    }, {
      stepKey: 'google',
      title: 'Configure google',
      name: 'step-3',
      nextStep: 'summary',
      showTitle: false,
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'google.google-field',
        label: 'Google field part',
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
      substepOf: 'Summary',
      title: 'Summary',
    }],
  }],
};

export const wizardSchemaWithFunction = {
  fields: [{
    component: componentTypes.WIZARD,
    name: 'wizzard',
    predictSteps: true,
    //inModal: true,
    title: 'Title',
    showTitles: true,
    description: 'Description',
    buttonsPosition: 'left',
    fields: [{
      title: 'Get started with adding source',
      name: 'step-1',
      stepKey: 1,
      nextStep: ({ values }) => values.source && values.source['source-type'],
      fields: [{
        component: componentTypes.TEXTAREA_FIELD,
        name: 'source.source-name',
        type: 'text',
        label: 'Source name',
      }, {
        component: componentTypes.SELECT_COMPONENT,
        name: 'source.source-type',
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
      buttons: ValidateButtons,
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'aws-field',
        label: 'Aws field part',
        validate: [{
          type: validatorTypes.REQUIRED,
        }],
        isRequired: true,
      }],
    }, {
      stepKey: 'google',
      title: 'Configure google',
      name: 'step-3',
      nextStep: 'summary',
      showTitle: false,
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'google.google-field',
        label: 'Google field part',
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
      showTitle: true,
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
    isDynamic: true,
    name: 'wizzard',
    title: 'Dynamic with steps predicting',
    description: 'Description',
    buttonsPosition: 'left',
    predictSteps: true,
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
      title: 'Configure AWS part 2 - disabled jumping',
      name: 'step-88',
      disableForwardJumping: true,
      stepKey: 'aws2',
      nextStep: 'summary',
      substepOf: 'Summary',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'aws-field-1',
        label: 'Aws field part 1',
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
