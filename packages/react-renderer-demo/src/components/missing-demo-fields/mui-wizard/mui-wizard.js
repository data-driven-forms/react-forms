import React, { cloneElement } from 'react';
import WizardStep from './wizard-step';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    const { title, description, FieldProvider, formOptions } = this.props;
    const handleSubmit = () =>
      formOptions.onSubmit(this.handleSubmit(formOptions.getState().values, [ ...this.state.prevSteps, this.state.activeStep ]));

    const currentStep = (
      <WizardStep
        { ...this.findCurrentStep(this.state.activeStep) }
        formOptions={{
          ...formOptions,
          handleSubmit,
        }}
        FieldProvider={ FieldProvider }
      />);

    return (
      <Grid container spacing={ 6 }>
        <Grid item xs={ 12 }>
          <Typography component="h3">{ title }</Typography>
          <Typography paragraph>{ description }</Typography>
          <Typography component="h5">{ `Step ${this.state.prevSteps.length + 1}` }</Typography>
        </Grid>
        <Grid item xs={ 12 }>
          { cloneElement(currentStep, {
            handleNext: this.handleNext,
            handlePrev: this.handlePrev,
            disableBack: this.state.prevSteps.length === 0,
          }) }
        </Grid>
      </Grid>
    );
  }
}

const WizardFunction = props => <Wizard { ...props }/>;

export default WizardFunction;
