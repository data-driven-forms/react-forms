import React, { useState, useEffect } from 'react';

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

const WizardNavigationInternal = React.memo(
  ({ navSchema, activeStepIndex, maxStepIndex, jumpToStep, formOptions: { valid }}) =>
    navSchema
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
    }),
  isEqual
);

WizardNavigationInternal.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  maxStepIndex: PropTypes.number.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  navSchema: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    valid: PropTypes.bool.isRequired
  }).isRequired
};

const WizardNavigation = ({ activeStepIndex, maxStepIndex, jumpToStep, navSchema, formOptions, setPrevSteps, crossroads, values }) => {
  const [memoValue] = useState(() =>
    memoValues(
      crossroads
        ? crossroads.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: get(values, curr)
          }),
          {}
        )
        : {}
    )
  );

  useEffect(() => {
    if (crossroads) {
      const modifiedRoad = crossroads.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: get(values, curr)
        }),
        {}
      );

      if (memoValue(modifiedRoad)) {
        setPrevSteps();
      }
    }
  });

  return (
    <WizardNavigationInternal
      navSchema={navSchema}
      activeStepIndex={activeStepIndex}
      maxStepIndex={maxStepIndex}
      jumpToStep={jumpToStep}
      formOptions={formOptions}
    />
  );
};

WizardNavigation.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  maxStepIndex: PropTypes.number.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  setPrevSteps: PropTypes.func.isRequired,
  navSchema: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  crossroads: PropTypes.arrayOf(PropTypes.string),
  formOptions: PropTypes.object.isRequired
};

export default WizardNavigation;
