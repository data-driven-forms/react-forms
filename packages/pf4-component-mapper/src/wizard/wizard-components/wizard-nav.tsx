import React, { Fragment, useState, useEffect } from 'react';

import { WizardNav, WizardNavItem } from '@patternfly/react-core';

import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

const memoValues = (initialValue: any) => {
  let valueCache = initialValue;

  return (value: any) => {
    if (!isEqual(value, valueCache)) {
      valueCache = value;
      return true;
    }

    return false;
  };
};

interface WizardNavigationInternalProps {
  navSchema: Array<{
    primary?: boolean;
    isProgressAfterSubmissionStep?: boolean;
    substepOf?: string;
    substepOfTitle?: string;
    name: string;
    title: string;
    index: number;
  }>;
  activeStepIndex: number;
  maxStepIndex: number;
  jumpToStep: (index: number, valid: boolean) => void;
  valid: boolean;
  validating: boolean;
}

const WizardNavigationInternal = React.memo<WizardNavigationInternalProps>(
  ({ navSchema, activeStepIndex, maxStepIndex, jumpToStep, valid, validating }) => (
    <Fragment>
      {navSchema
        .filter((field) => field.primary && !field.isProgressAfterSubmissionStep)
        .map((step) => {
          const substeps = step.substepOf && navSchema.filter((field) => field.substepOf === step.substepOf);

          const isValid = valid && !validating;

          return (
            <WizardNavItem
              key={step.substepOf || step.name}
              content={step.substepOfTitle || step.title}
              isCurrent={substeps ? activeStepIndex >= step.index && activeStepIndex < step.index + substeps.length : activeStepIndex === step.index}
              isDisabled={isValid ? maxStepIndex < step.index : step.index > activeStepIndex}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                jumpToStep(step.index, isValid);
              }}
              step={step.index}
              stepIndex={step.index}
            >
              {substeps && (
                <WizardNav isInnerList>
                  {substeps.map((substep) => (
                    <WizardNavItem
                      key={substep.name}
                      content={substep.title}
                      isCurrent={activeStepIndex === substep.index}
                      isDisabled={isValid ? maxStepIndex < substep.index : substep.index > activeStepIndex}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        jumpToStep(substep.index, isValid);
                      }}
                      step={substep.index}
                      stepIndex={substep.index}
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

WizardNavigationInternal.displayName = 'WizardNavigationInternal';

interface WizardNavigationProps extends WizardNavigationInternalProps {
  setPrevSteps: () => void;
  crossroads?: string[];
  values: any;
  isDynamic?: boolean;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({ setPrevSteps, crossroads, values, ...props }) => {
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
