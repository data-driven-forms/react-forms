import React from 'react';
import WizardStep from './wizard-step';
import PropTypes from 'prop-types';
import { Wizard as PfWizard, Modal, Icon } from 'patternfly-react';

const defaultButtonLabels = {
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
};

class Wizard extends React.Component {
  state = {
    activeStep: this.props.fields[0].stepKey,
    prevSteps: [],
  }

  handleNext = nextStep => this.setState(prevState => ({ activeStep: nextStep, prevSteps: [ ...prevState.prevSteps, prevState.activeStep ]}));

  handlePrev = () => this.setState(({ prevSteps }) => ({ activeStep: prevSteps.pop(), prevSteps: [ ...prevSteps ]}))

  findActiveFields = visitedSteps =>
    visitedSteps.map(key =>this.findCurrentStep(key).fields.map(({ name }) => name))
    .reduce((acc, curr) => curr.concat(acc.map(item => item)), []);

  handleSubmit = (values, visitedSteps) =>
    Object.keys(values)
    .filter(key => this.findActiveFields(visitedSteps).includes(key))
    .reduce((acc, curr) => ({ ...acc, [curr]: values[curr] }), {});

  findCurrentStep = activeStep => this.props.fields.find(({ stepKey }) => stepKey === activeStep)

  renderSteps = () => this.props.stepsInfo.map((step, stepIndex) => <PfWizard.Step
    activeStep={ this.state.prevSteps.length + 1 }
    title={ step.title }
    label={ `${stepIndex + 1}` }
    step={ stepIndex + 1 }
    key={ stepIndex + 1 }
    stepIndex={ stepIndex + 1 }
  />);

  render() {
    const { title, FieldProvider, formOptions, buttonLabels, stepsInfo, inModal } = this.props;
    const handleSubmit = () =>
      formOptions.onSubmit(this.handleSubmit(formOptions.getState().values, [ ...this.state.prevSteps, this.state.activeStep ]));

    const fullButtonLabels = {
      ...defaultButtonLabels,
      ...buttonLabels,
    };

    return (
      <React.Fragment>
        { title && <Modal.Header>
          { inModal &&  <button className="close" onClick={ formOptions.onCancel } aria-hidden="true" aria-label="Close">
            <Icon type="pf" name="close" />
          </button> }
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header> }
        { stepsInfo && <PfWizard.Steps steps={ this.renderSteps() } /> }
        <WizardStep
          handleNext={ this.handleNext }
          handlePrev={ this.handlePrev }
          disableBack={ this.state.prevSteps.length === 0 }
          buttonLabels={ fullButtonLabels }
          { ...this.findCurrentStep(this.state.activeStep) }
          formOptions={{
            ...formOptions,
            handleSubmit,
          }}
          FieldProvider={ FieldProvider }
        />
      </React.Fragment>
    );
  }
}

Wizard.propTypes = {
  title: PropTypes.string,
  FieldProvider: PropTypes.PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]).isRequired,
  formOptions: PropTypes.object,
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.array,
  inModal: PropTypes.bool,
};

Wizard.defaultProps = {
  title: undefined,
  buttonLabels: defaultButtonLabels,
  stepsInfo: undefined,
  inModal: false,
  formOptions: undefined,
};

export default Wizard;
