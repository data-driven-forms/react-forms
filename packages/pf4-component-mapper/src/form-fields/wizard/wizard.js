import React, { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { WizardHeader, WizardNav, WizardNavItem, Backdrop, Bullseye } from '@patternfly/react-core';
import WizardStep from './wizard-step';
import './wizard-styles.scss';
import get from 'lodash/get';
import set from 'lodash/set';
import flattenDeep from 'lodash/flattenDeep';
import { selectNext } from './step-buttons';

const DYNAMIC_WIZARD_TYPES = [ 'function', 'object' ];

const Modal = ({ children, container, inModal }) => inModal ? createPortal(<Backdrop>
  <Bullseye>
    { children }
  </Bullseye>
</Backdrop>, container) : children;

class Wizard extends React.Component {
  constructor(props){
    super(props);

    // find if wizard contains any dynamic steps (nextStep is mapper object)
    const isDynamic = this.props.isDynamic || this.props.fields.some(({ nextStep }) => DYNAMIC_WIZARD_TYPES.includes(typeof nextStep));

    this.state = {
      activeStep: this.props.fields[0].stepKey,
      prevSteps: [],
      activeStepIndex: 0,
      maxStepIndex: 0,
      isDynamic,
      navSchema: this.createSchema({ currentIndex: 0, isDynamic }),
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.inModal) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    this.setState({ loading: false });
  }

  componentWillUnmount() {
    if (this.props.inModal && this.container) {
      document.body.removeChild(this.container);
    }
  }

  handleNext = (nextStep, getRegisteredFields) => {
    const newActiveIndex = this.state.activeStepIndex + 1;
    const shouldInsertStepIntoHistory = this.state.prevSteps.includes(this.state.activeStep);

    this.setState(prevState => ({
      registeredFieldsHistory: { ...prevState.registeredFieldsHistory, [prevState.activeStep]: getRegisteredFields() },
      activeStep: nextStep,
      prevSteps: shouldInsertStepIntoHistory ? prevState.prevSteps : [ ...prevState.prevSteps, prevState.activeStep ],
      activeStepIndex: newActiveIndex,
      maxStepIndex: newActiveIndex > prevState.maxStepIndex ? newActiveIndex : prevState.maxStepIndex,
      navSchema: this.state.isDynamic ? this.createSchema({ currentIndex: newActiveIndex }) : prevState.navSchema,
    }));
  }

  handlePrev = () => this.jumpToStep(this.state.activeStepIndex - 1);

  handleSubmit = (values, visitedSteps, getRegisteredFields) => {
    // Add the final step fields to history
    const finalRegisteredFieldsHistory = {
      ...this.state.registeredFieldsHistory,
      [this.state.activeStep]: getRegisteredFields(),
    };

    const finalObject = {};

    // Find only visited fields
    flattenDeep(Object.values([ ...visitedSteps, this.state.activeStep ]
    .reduce((obj, key) => ({ ...obj, [key]: finalRegisteredFieldsHistory[key] }), { })))
    .forEach((key) => set(finalObject, key, get(values, key)));

    return finalObject;
  }

  findCurrentStep = activeStep => this.props.fields.find(({ stepKey }) => stepKey === activeStep)

  jumpToStep = (index, valid) => {
    const clickOnPreviousStep = this.state.prevSteps[index];
    if (clickOnPreviousStep) {
      let originalActiveStep;
      this.setState((prevState) => {
        const includeActiveStep = prevState.prevSteps.includes(prevState.activeStep);
        originalActiveStep = prevState.activeStep;

        return ({
          activeStep: this.state.prevSteps[index],
          prevSteps: includeActiveStep ? prevState.prevSteps : [ ...prevState.prevSteps, prevState.activeStep ],
          activeStepIndex: index,
        });
      }, () => this.setState((prevState) => {
        const INDEXING_BY_ZERO = 1;

        let newState = {};

        const currentStep = this.findCurrentStep(prevState.prevSteps[index]);
        const currentStepHasStepMapper = DYNAMIC_WIZARD_TYPES.includes(typeof currentStep.nextStep);

        const dynamicStepShouldDisableNav = prevState.isDynamic && (currentStepHasStepMapper || !this.props.predictSteps);

        const invalidStepShouldDisableNav = valid === false;

        if (dynamicStepShouldDisableNav) {
          newState = {
            navSchema: this.props.predictSteps ? this.createSchema({ currentIndex: index }) : prevState.navSchema.slice(0, index + INDEXING_BY_ZERO),
            prevSteps: prevState.prevSteps.slice(0, index),
            maxStepIndex: index,
          };
        } else if (currentStep.disableForwardJumping) {
          newState = {
            prevSteps: prevState.prevSteps.slice(0, index),
            maxStepIndex: index,
          };
        } else if (invalidStepShouldDisableNav) {
          const indexOfCurrentStep = prevState.prevSteps.indexOf(originalActiveStep);

          newState = {
            ...newState,
            prevSteps: prevState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO),
            maxStepIndex: prevState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO).length - INDEXING_BY_ZERO,
          };
        }

        return newState;
      }));
    }
  };

  createSchema = ({ currentIndex, isDynamic }) => {
    if (typeof isDynamic === 'undefined'){
      isDynamic = this.state.isDynamic;
    }

    const { formOptions, predictSteps } = this.props;
    const { values } = formOptions.getState();
    let schema = [];
    let field = this.props.fields.find(({ stepKey }) => stepKey === 1 || stepKey === '1'); // find first wizard step
    let index = -1;

    while (field){
      index += 1;
      schema = [
        ...schema,
        { title: field.title,
          substepOf: field.substepOf,
          index,
          primary: (!schema[schema.length - 1] || !field.substepOf || field.substepOf !== schema[schema.length - 1].substepOf) },
      ];

      if (isDynamic && !predictSteps && currentIndex === index) {
        break;
      }

      let nextStep = field.nextStep;

      if (typeof field.nextStep === 'object') {
        nextStep = nextStep.stepMapper[get(values, nextStep.when)];
      }

      if (typeof field.nextStep === 'function') {
        nextStep = field.nextStep({ values });
      }

      if (nextStep) {
        field = this.props.fields.find(({ stepKey }) => stepKey === nextStep);
      } else {
        field = undefined;
      }
    }

    return schema;
  };

  render() {
    if (this.state.loading) {
      return null;
    }

    const {
      title, description, FieldProvider, formOptions, buttonLabels, buttonsClassName, inModal, setFullWidth, setFullHeight, isCompactNav, showTitles,
    } = this.props;
    const { activeStepIndex, navSchema, maxStepIndex } = this.state;

    const handleSubmit = () =>
      formOptions.onSubmit(
        this.handleSubmit(
          formOptions.getState().values,
          [ ...this.state.prevSteps, this.state.activeStep ],
          formOptions.getRegisteredFields,
        ),
        formOptions
      );

    const currentStep = (
      <WizardStep
        { ...this.findCurrentStep(this.state.activeStep) }
        formOptions={{
          ...formOptions,
          handleSubmit,
        }}
        buttonLabels={ buttonLabels }
        FieldProvider={ FieldProvider }
        buttonsClassName={ buttonsClassName }
        showTitles={ showTitles }
      />);

    const createStepsMap = () => navSchema
    .filter(field => field.primary)
    .map(step => {
      const substeps = step.substepOf && navSchema.filter(field => field.substepOf === step.substepOf);

      return <WizardNavItem
        key={ step.substepOf || step.title }
        text={ step.substepOf || step.title }
        isCurrent={ substeps ? activeStepIndex >= step.index && activeStepIndex < step.index + substeps.length : activeStepIndex === step.index }
        isDisabled={ formOptions.valid ? maxStepIndex < step.index : step.index > activeStepIndex }
        onNavItemClick={ (ind) => this.jumpToStep(ind, formOptions.valid) }
        step={ step.index }
      >
        { substeps && <WizardNav returnList>
          { substeps.map(substep => <WizardNavItem
            key={ substep.title }
            text={ substep.title }
            isCurrent={ activeStepIndex === substep.index }
            isDisabled={ formOptions.valid ?
              maxStepIndex < substep.index
              : substep.index > activeStepIndex }
            onNavItemClick={ (ind) => this.jumpToStep(ind, formOptions.valid) }
            step={ substep.index }
          />) }
        </WizardNav> }
      </WizardNavItem>;
    });

    return (
      <Modal inModal={ inModal } container={ this.container }>
        <div className={ `pf-c-wizard ${inModal ? '' : 'no-shadow'} ${isCompactNav ? 'pf-m-compact-nav' : ''} ${setFullWidth ? 'pf-m-full-width' : ''} ${setFullHeight ? 'pf-m-full-height' : ''}` }
          role="dialog"
          aria-modal={ inModal ? 'true' : undefined }
          onKeyDown={ e => {
            if (e.key === 'Enter'){
              const isNotButton = e.target.type !== 'button';

              if (isNotButton) {
                e.preventDefault();

                const schemaNextStep = this.findCurrentStep(this.state.activeStep).nextStep;
                const hasCustomButtons = this.findCurrentStep(this.state.activeStep).buttons;

                let nextStep;
                if (schemaNextStep) {
                  nextStep = selectNext(schemaNextStep, formOptions.getState);
                }

                if (formOptions.valid && nextStep && !hasCustomButtons) {
                  this.handleNext(nextStep, formOptions.getRegisteredFields);
                } else if (formOptions.valid && !schemaNextStep && !hasCustomButtons) {
                  handleSubmit();
                }
              }
            }
          } }
        >
          { title && <WizardHeader
            title={ title }
            description={ description }
            onClose={ () => formOptions.onCancel(formOptions.getState().values) }
          /> }
          <div className="pf-c-wizard__outer-wrap">
            <WizardNav>
              { createStepsMap() }
            </WizardNav>
            { cloneElement(currentStep, {
              handleNext: (nextStep) => this.handleNext(nextStep, formOptions.getRegisteredFields),
              handlePrev: this.handlePrev,
              disableBack: this.state.activeStepIndex === 0,
            }) }
          </div>
        </div>
      </Modal>
    );
  }
}

Wizard.propTypes = {
  buttonLabels: PropTypes.shape({
    submit: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
  }).isRequired,
  buttonsClassName: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.any,
  FieldProvider: PropTypes.PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]).isRequired,
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    getRegisteredFields: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
  }),
  fields: PropTypes.arrayOf(PropTypes.shape({
    stepKey: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
  })).isRequired,
  isCompactNav: PropTypes.bool,
  inModal: PropTypes.bool,
  setFullWidth: PropTypes.bool,
  setFullHeight: PropTypes.bool,
  isDynamic: PropTypes.bool,
  showTitles: PropTypes.bool,
  predictSteps: PropTypes.bool,
};

const defaultLabels = {
  submit: 'Submit',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
};

const WizardFunction = ({ buttonLabels, ...props }) => <Wizard { ...props } buttonLabels={{ ...defaultLabels, ...buttonLabels }}/>;

WizardFunction.propTypes = {
  buttonLabels: PropTypes.shape({
    submit: PropTypes.string,
    cancel: PropTypes.string,
    back: PropTypes.string,
  }),
};

WizardFunction.defaultProps = {
  buttonLabels: {},
};

export default WizardFunction;
