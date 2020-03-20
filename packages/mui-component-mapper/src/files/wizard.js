import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import WizardStep from './wizard/wizard-step';
import { Grid, Typography } from '@material-ui/core';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const Wizard = ({ fields, title, description }) => {
  const [activeStep, setActiveStep] = useState(fields[0].name);
  const [prevSteps, setPrevSteps] = useState([]);

  const formOptions = useFormApi();

  const handleNext = (nextStep) => {
    setPrevSteps([...prevSteps, activeStep]);
    setActiveStep(nextStep);
  };

  const handlePrev = () => {
    setActiveStep(prevSteps[prevSteps.length - 1]);

    const newSteps = prevSteps;
    newSteps.pop();
    setPrevSteps(newSteps);
  };

  const findCurrentStep = (activeStep) => fields.find(({ name }) => name === activeStep);

  const findActiveFields = (visitedSteps) =>
    visitedSteps.map((key) => findCurrentStep(key).fields.map(({ name }) => name)).reduce((acc, curr) => curr.concat(acc.map((item) => item)), []);

  const getValues = (values, visitedSteps) =>
    Object.keys(values)
      .filter((key) => findActiveFields(visitedSteps).includes(key))
      .reduce((acc, curr) => ({ ...acc, [curr]: values[curr] }), {});

  const handleSubmit = () => formOptions.onSubmit(getValues(formOptions.getState().values, [...prevSteps, activeStep]));

  const currentStep = (
    <WizardStep
      {...findCurrentStep(activeStep)}
      formOptions={{
        ...formOptions,
        handleSubmit
      }}
    />
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography component="h3">{title}</Typography>
        <Typography paragraph>{description}</Typography>
        <Typography component="h5">{`Step ${prevSteps.length + 1}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        {cloneElement(currentStep, {
          handleNext,
          handlePrev,
          disableBack: prevSteps.length === 0
        })}
      </Grid>
    </Grid>
  );
};

Wizard.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired
};

export default Wizard;
