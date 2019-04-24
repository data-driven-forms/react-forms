import React, { cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  TextContent,
  Text,
  TextVariants,
  Title,
} from '@patternfly/react-core';
import WizardStep from './wizard-step';
import './wizard-styles.scss';

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

  render() {
    const { title, description, FieldProvider, formOptions, buttonLabels, buttonsClassName } = this.props;
    console.log('Foo: ', buttonsClassName)
    const handleSubmit = () =>
      formOptions.onSubmit(this.handleSubmit(formOptions.getState().values, [ ...this.state.prevSteps, this.state.activeStep ]));

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
      />);

    return (
      <Fragment>
        { typeof title === 'string' ? (
          <Title size="3xl" >{ title }</Title>
        ) : title }
        { typeof description === 'string' ? (
          <TextContent>
            <Text component={ TextVariants.p } >{ description }</Text>
          </TextContent>
        ) : description }
        { cloneElement(currentStep, {
          handleNext: this.handleNext,
          handlePrev: this.handlePrev,
          disableBack: this.state.prevSteps.length === 0,
        }) }
      </Fragment>
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
