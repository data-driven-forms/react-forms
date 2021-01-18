import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import WizardCommon from '@data-driven-forms/common/wizard/wizard';
import { FormSpy, WizardContext } from '@data-driven-forms/react-form-renderer';
import { Button, Column, Grid, Row } from 'carbon-components-react';

import { ProgressStep, ProgressIndicator } from 'carbon-components-react/lib/components/ProgressIndicator/ProgressIndicator';

const useStyles = createUseStyles({
  horizontalNav: {
    marginBottom: 48
  },
  buttonSet: {
    marginTop: 48,
    flexFirection: 'row-reverse',
    display: 'flex'
  },
  body: {
    '&>:not(:last-child)': {
      marginBottom: 32
    }
  }
});

const WizardNav = ({ stepsInfo, jumpToStep, ...props }) => {
  const { horizontalNav } = useStyles();

  return (
    <ProgressIndicator
      onChange={(index) => (props.currentIndex > index ? jumpToStep(index, true) : undefined)}
      {...props}
      className={clsx(horizontalNav, props.className)}
    >
      {stepsInfo.map(({ title, ...step }, index) => (
        <ProgressStep key={index} label={title} disabled={index > props.currentIndex} {...step} />
      ))}
    </ProgressIndicator>
  );
};

WizardNav.propTypes = {
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node
    })
  ),
  currentIndex: PropTypes.number,
  jumpToStep: PropTypes.func,
  className: PropTypes.string
};

const defaultLabels = {
  submit: 'Submit',
  back: 'Back',
  next: 'Next'
};

const Layout = ({ nav, fields, WizardBodyProps }) => {
  const { body } = useStyles();

  return (
    <React.Fragment>
      {nav}
      <div {...WizardBodyProps} className={clsx(body, WizardBodyProps?.className)}>
        {fields}
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  nav: PropTypes.node,
  fields: PropTypes.node,
  WizardBodyProps: PropTypes.object
};

const VerticalLayout = ({ nav, fields, WizardBodyProps }) => {
  const { body } = useStyles();

  return (
    <Grid narrow>
      <Row>
        <Column sm={1} md={2} lg={3}>
          {nav}
        </Column>
        <Column {...WizardBodyProps} className={clsx(body, WizardBodyProps?.className)}>
          {fields}
        </Column>
      </Row>
    </Grid>
  );
};

VerticalLayout.propTypes = {
  nav: PropTypes.node,
  fields: PropTypes.node,
  WizardBodyProps: PropTypes.object
};

const WizardInternal = ({
  stepsInfo,
  buttonLabels,
  ButtonSetProps,
  BackButtonProps,
  NextButtonProps,
  SubmitButtonProps,
  ProgressIndicatorProps,
  vertical,
  WizardBodyProps,
  ...props
}) => {
  const { formOptions, currentStep, handlePrev, onKeyDown, handleNext, activeStepIndex, selectNext, jumpToStep } = useContext(WizardContext);

  const { buttonSet } = useStyles();

  const finalButtoLabels = {
    ...defaultLabels,
    ...buttonLabels
  };

  const nav = stepsInfo && (
    <WizardNav vertical={vertical} stepsInfo={stepsInfo} currentIndex={activeStepIndex} jumpToStep={jumpToStep} {...ProgressIndicatorProps} />
  );
  const fields = currentStep.fields.map((item) => formOptions.renderForm([item], formOptions));

  const WizardLayout = vertical && nav ? VerticalLayout : Layout;

  return (
    <div onKeyDown={onKeyDown} {...props}>
      <WizardLayout nav={nav ? nav : null} fields={fields} WizardBodyProps={WizardBodyProps} />
      <FormSpy>
        {({ invalid, validating, submitting }) => (
          <div {...ButtonSetProps} className={clsx(buttonSet, ButtonSetProps.className)}>
            {currentStep.nextStep ? (
              <Button
                onClick={() => handleNext(selectNext(currentStep.nextStep, formOptions.getState))}
                disabled={!formOptions.valid || invalid || validating || submitting}
                {...NextButtonProps}
              >
                {finalButtoLabels.next}
              </Button>
            ) : (
              <Button
                onClick={() => formOptions.handleSubmit()}
                disabled={!formOptions.valid || invalid || validating || submitting}
                {...SubmitButtonProps}
              >
                {finalButtoLabels.submit}
              </Button>
            )}
            <Button kind="secondary" onClick={handlePrev} disabled={activeStepIndex === 0} {...BackButtonProps}>
              {finalButtoLabels.back}
            </Button>
          </div>
        )}
      </FormSpy>
    </div>
  );
};

WizardInternal.propTypes = {
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node
    })
  ),
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node,
    back: PropTypes.node,
    next: PropTypes.node
  }),
  BackButtonProps: PropTypes.object,
  NextButtonProps: PropTypes.object,
  SubmitButtonProps: PropTypes.object,
  ButtonSetProps: PropTypes.object,
  ProgressIndicatorProps: PropTypes.object,
  vertical: PropTypes.bool,
  WizardBodyProps: PropTypes.object
};

WizardInternal.defaultProps = {
  BackButtonProps: {},
  NextButtonProps: {},
  SubmitButtonProps: {},
  ButtonSetProps: {},
  ProgressIndicatorProps: {},
  WizardBodyProps: {}
};

const Wizard = (props) => <WizardCommon Wizard={WizardInternal} {...props} />;

export default Wizard;
