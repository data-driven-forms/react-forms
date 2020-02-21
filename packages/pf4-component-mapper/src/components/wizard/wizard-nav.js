import React from 'react';

import { WizardNavItem } from '@patternfly/react-core/dist/js/components/Wizard/WizardNavItem';
import { WizardNav } from '@patternfly/react-core/dist/js/components/Wizard/WizardNav';

import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import PropTypes from 'prop-types';

const memoValues = (initialValue) => {
  let valueCache = initialValue;

  return (value) => {
    if (!isEqual(value, valueCache)) {
      valueCache = value;
      return true;
    }

    return false;
  };
};

const WizardNavigationInternal = React.memo(({ navSchema, activeStepIndex, maxStepIndex, jumpToStep, formOptions: { valid } }) => {
  return navSchema
  .filter((field) => field.primary)
  .map((step) => {
    const substeps = step.substepOf && navSchema.filter((field) => field.substepOf === step.substepOf);

    return (
      <WizardNavItem
        key={step.substepOf || step.title}
        text={step.substepOf || step.title}
        isCurrent={substeps ? activeStepIndex >= step.index && activeStepIndex < step.index + substeps.length : activeStepIndex === step.index}
        isDisabled={valid ? maxStepIndex < step.index : step.index > activeStepIndex}
        onNavItemClick={(ind) => jumpToStep(ind, valid)}
        step={step.index}
      >
        {substeps && (
          <WizardNav returnList>
            {substeps.map((substep) => (
              <WizardNavItem
                key={substep.title}
                text={substep.title}
                isCurrent={activeStepIndex === substep.index}
                isDisabled={valid ? maxStepIndex < substep.index : substep.index > activeStepIndex}
                onNavItemClick={(ind) => jumpToStep(ind, valid)}
                step={substep.index}
              />
            ))}
          </WizardNav>
        )}
      </WizardNavItem>
    );
  });
}, isEqual);

WizardNavigationInternal.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  maxStepIndex: PropTypes.number.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  navSchema: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    valid: PropTypes.bool.isRequired
  }).isRequired
};

class WizardNavigationClass extends React.Component {
  constructor(props) {
    super(props);

    const { crossroads, values } = this.props;

    this.state = {
      memoValue: memoValues(
        crossroads
          ? crossroads.reduce(
            (acc, curr) => ({
              ...acc,
              [curr]: get(values, curr)
            }),
            {}
          )
          : {}
      ),
      maxStepIndex: undefined
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.crossroads) {
      const modifiedRoad = this.props.crossroads.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: get(this.props.values, curr)
        }),
        {}
      );

      if (this.state.memoValue(modifiedRoad)) {
        this.setState({
          maxStepIndex: this.props.activeStepIndex
        });
        this.props.setPrevSteps();
      } else {
        if (prevProps.activeStepIndex !== this.props.activeStepIndex) {
          this.setState({ maxStepIndex: undefined });
        }
      }
    }
  }

  render() {
    const { activeStepIndex, maxStepIndex, jumpToStep, navSchema, formOptions } = this.props;

    const { maxStepIndex: maxStepIndexState } = this.state;

    const maxIndex = typeof maxStepIndexState === 'number' ? maxStepIndexState : maxStepIndex;

    return (
      <WizardNavigationInternal
        navSchema={navSchema}
        activeStepIndex={activeStepIndex}
        maxStepIndex={maxIndex}
        jumpToStep={jumpToStep}
        formOptions={formOptions}
      />
    );
  }
}

WizardNavigationClass.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  maxStepIndex: PropTypes.number.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  setPrevSteps: PropTypes.func.isRequired,
  navSchema: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  crossroads: PropTypes.arrayOf(PropTypes.string),
  formOptions: PropTypes.object.isRequired
};

export default WizardNavigationClass;
