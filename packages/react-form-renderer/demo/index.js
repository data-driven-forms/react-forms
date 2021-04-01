/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FormRenderer, useFieldApi, componentTypes, useFormApi } from '../src';
import MuiTextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { Button as MUIButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FormTemplate from '@data-driven-forms/common/form-template';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    '&>button:not(last-child)': {
      marginLeft: 8
    }
  }
}));

const Form = ({ children, GridContainerProps, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <form noValidate {...props}>
      <Grid container item spacing={2} xs={12} {...GridContainerProps}>
        {children}
      </Grid>
    </form>
  </Grid>
);

Form.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object,
  GridContainerProps: PropTypes.object
};

const Description = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="body1" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

Description.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object
};

const Title = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="h3" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

Title.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object
};

const ButtonGroup = ({ children, GridProps, ...props }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} {...GridProps}>
      <div className={classes.buttonGroup} {...props}>
        {children}
      </div>
    </Grid>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object
};

const Button = ({ label, variant, children, buttonType, ...props }) => (
  <MUIButton color={variant} variant="contained" {...props}>
    {label || children}
  </MUIButton>
);

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  variant: PropTypes.string,
  buttonType: PropTypes.string
};

const MuiFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default MuiFormTemplate;

// eslint-disable-next-line react/prop-types
const TextField = (props) => {
  const { input, label, isRequired, WrapperProps } = useFieldApi(props);
  return (
    <Grid item xs={12} {...WrapperProps}>
      <MuiTextField {...input} label={label} required={isRequired} />
    </Grid>
  );
};

const Spy = () => {
  const formApi = useFormApi();
  console.log(formApi);
  return null;
};

const fields = [{
  name: 'optionsSpy',
  component: 'spy',
}];

for (let index = 0; index < 10; index++) {
  fields.push({
    name: `field-${index}`,
    label: `Text field ${index}`,
    component: 'text-field',
    ...(index > 0 ? {
      condition: {
        when: `field-${index - 1}`,
        isEmpty: true
      }
    } : {})
  });
}

const schema = {
  fields
};

const App = () => {
  // const [values, setValues] = useState({});
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField,
          spy: Spy
        }}
        onSubmit={console.log}
        FormTemplate={MuiFormTemplate}
        schema={schema}
        subscription={{ pristine: false }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
