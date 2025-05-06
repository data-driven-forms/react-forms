import React, { Fragment, useState, useEffect } from 'react';

import { WizardNav, WizardNavItem } from '@patternfly/react-core';

import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

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
    <Fragment>
      {navSchema
        .filter((field) => field.primary)
        .map((step) => {
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
                jumpToStep(step.index, isValid);
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
    </Fragment>
  ),
  isEqual
);

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

export default WizardNavigation;
