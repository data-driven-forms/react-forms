import React, { useState, useEffect } from 'react';

import { WizardNavItem, WizardNav } from '@patternfly/react-core';

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
  ({ navSchema, activeStepIndex, maxStepIndex, jumpToStep, valid, validating }) => (
    <WizardNav>
      {navSchema
        .filter((field) => field.primary)
        .map((step, ind) => {
          const substeps = step.substepOf && navSchema.filter((field) => field.substepOf === step.substepOf);

          const isValid = valid && !validating;

          return (
            <WizardNavItem
              key={step.substepOf || step.name}
              content={step.substepOfTitle || step.title}
              isCurrent={substeps ? activeStepIndex >= step.index && activeStepIndex < step.index + substeps.length : activeStepIndex === step.index}
              isDisabled={isValid ? maxStepIndex < step.index : step.index > activeStepIndex}
              onClick={(e) => {
                e.preventDefault();
                jumpToStep(ind, isValid);
              }}
              step={step.index}
              type="button"
            >
              {substeps && (
                <WizardNav isInnerList>
                  {substeps.map((substep) => (
                    <WizardNavItem
                      type="button"
                      key={substep.name}
                      content={substep.title}
                      isCurrent={activeStepIndex === substep.index}
                      isDisabled={isValid ? maxStepIndex < substep.index : substep.index > activeStepIndex}
                      onClick={(e) => {
                        e.preventDefault();
                        jumpToStep(substep.index, isValid);
                      }}
                      step={substep.index}
                    />
                  ))}
                </WizardNav>
              )}
            </WizardNavItem>
          );
        })}
    </WizardNav>
  ),
  isEqual
);

WizardNavigationInternal.propTypes = {
  activeStepIndex: PropTypes.number.isRequired,
  maxStepIndex: PropTypes.number.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  navSchema: PropTypes.array.isRequired,
  valid: PropTypes.bool.isRequired,
  validating: PropTypes.bool.isRequired,
};

const WizardNavigation = ({ setPrevSteps, crossroads, values, ...props }) => {
  const [memoValue] = useState(() =>
    memoValues(
      crossroads
        ? crossroads.reduce(
            (acc, curr) => ({
              ...acc,
              [curr]: get(values, curr),
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
          [curr]: get(values, curr),
        }),
        {}
      );

      if (memoValue(modifiedRoad)) {
        setPrevSteps();
      }
    }
  });

  return <WizardNavigationInternal {...props} />;
};

WizardNavigation.propTypes = {
  setPrevSteps: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  crossroads: PropTypes.arrayOf(PropTypes.string),
};

export default WizardNavigation;
