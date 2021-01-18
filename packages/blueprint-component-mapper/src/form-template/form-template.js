import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import FormTemplate from '@data-driven-forms/common/form-template';
import { Button, H1, H2 } from '@blueprintjs/core';
import BlueprintContext from '../blueprint-context/blueprint-context';

const Form = ({ children, ...props }) => (
  <form noValidate {...props} style={{ display: 'grid' }}>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node
};

const useStyles = createUseStyles({
  buttonGroup: {
    marginTop: 16,

    '& button:not(:first-child)': {
      marginLeft: 8
    }
  }
});

const ButtonGroup = ({ children, ...props }) => {
  const { buttonGroup } = useStyles();

  return (
    <div className={buttonGroup} {...props}>
      {children}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node
};

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

Title.propTypes = {
  children: PropTypes.node
};

const Description = ({ children, ...props }) => <H2 {...props}>{children}</H2>;

Description.propTypes = {
  children: PropTypes.node
};

const InnerButton = ({ label, buttonType, ...props }) => (
  <Button intent={buttonType === 'submit' ? 'success' : ''} {...props}>
    {label}
  </Button>
);

InnerButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  buttonType: PropTypes.string
};

const BlueprintFormTemplate = ({ requiredLabelInfo, ...props }) => (
  <BlueprintContext.Provider value={{ required: requiredLabelInfo || <span className="bp3-text-muted">(required)</span> }}>
    <FormTemplate FormWrapper={Form} Button={InnerButton} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
  </BlueprintContext.Provider>
);

BlueprintFormTemplate.propTypes = {
  requiredLabelInfo: PropTypes.node
};

export default BlueprintFormTemplate;
