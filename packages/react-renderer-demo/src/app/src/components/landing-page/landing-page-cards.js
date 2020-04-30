import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ArchiveIcon from '@material-ui/icons/Archive';
import CreateIcon from '@material-ui/icons/Create';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

import dynamic from 'next/dynamic';
import FormExample from './formExample';
import MaterialUILogo from '../common/material-logo';
import PF3Logo from '../common/pf3-logo';
import PF4Logo from '../common/pf4-logo';

const CodeEditor = dynamic(import('@docs/components/code-editor'), {
  ssr: false
});

const value = `import React from 'react';
import
  FormRenderer, { componentTypes }
from '@data-driven-forms/react-form-renderer';
import
  { componentMapper, FormTemplate }
from '@data-driven-forms/pf4-component-mapper';

const validatorMapper = {
    'same-email': () => (
      value, allValues
      ) => (
        value !== allValues.email ?
          'Email does not match' :
          undefined
      )
}

const schema = {
  fields: [{
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Your name',
      isRequired: true,
      validate: [{ type: validatorTypes.REQUIRED }]
    }, {
      component: componentTypes.TEXT_FIELD,
      name: 'email',
      label: 'Email',
      isRequired: true,
      validate: [
        { type: validatorTypes.REQUIRED },
        {
          type: validatorTypes.PATTERN,
          pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
          message: 'Not valid email'
        }
      ]
    },{
      component: componentTypes.TEXT_FIELD,
      name: 'confirm-email',
      label: 'Confirm email',
      type: 'email',
      isRequired: true,
      validate: [{ type: 'same-email' }]
    },{
      component: componentTypes.CHECKBOX,
      name: 'newsletters',
      label: 'I want to receive newsletter'
    }]
}

const Form = () => (
  <FormRenderer
    schema={schema}
    componentMapper={componentMapper}
    FormTemplate={FormTemplate}
    onSubmit={console.log}
    validatorMapper={validatorMapper}
  />
)`;

const buildFeatures = [
  {
    text: 'State management provided by Final Form!',
    Icon: ArchiveIcon
  },
  {
    text: 'Multiple provided libraries - MaterialUI included!',
    Icon: LocalLibraryIcon
  },
  {
    text: 'Validation - basic types are provided, supports async validators!',
    Icon: VerifiedUserIcon
  },
  {
    text: 'Conditions - hide and modify fields according to values of other fields!',
    Icon: PlaylistAddCheckIcon
  },
  {
    text: 'Fully customizable - you can use any components you are using right now!',
    Icon: EditAttributesIcon
  },
  {
    text: 'Online editor - you can build your form using comfy DnD!',
    Icon: CreateIcon
  }
].map(({ text, Icon, href, link }, idx) => (
  <ListItem button key={idx}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
));

const useStyles = makeStyles((theme) => ({
  cardsContainer: {
    backgroundColor: theme.palette.common.white,
    minHeight: '100vh'
  },
  codeSnippet: {
    margin: '8px 0px',
    padding: '8px 0px',
    marginBottom: 23,
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    overflow: 'auto',
    fontSize: 14,
    borderRadius: 3,
    border: '1px solid #979797',
    maxWidth: 'calc(100vw - 64px)'
  },
  languageSh: {
    padding: '2px 6px'
  },
  card: {
    backgroundColor: theme.palette.grey[100],
    margin: 16,
    padding: 24,
    borderRadius: 2
  },
  cardCenter: {
    backgroundColor: theme.palette.grey[100],
    margin: 16,
    padding: 24,
    borderRadius: 2,
    textAlign: 'center'
  },
  divider: {
    marginBottom: 16
  },
  cardQuestion: {
    color: '#F28D63'
  },
  editorWrapper: {
    background: '#1d1f21',
    padding: 16
  },
  formState: {
    marginTop: 16,
    padding: 16,
    marginBottom: 16
  },
  textBottom: {
    marginBottom: 16
  }
}));

const LandingPageCards = () => {
  const [formState, setFormState] = useState(undefined);
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-evenly" className={classes.cardsContainer}>
      <Grid item xs={11} md={11}>
        <Paper elevation={0} className={classes.card}>
          <Grid container direction="row" justify="space-evenly">
            <Grid item xs={12} md={5}>
              <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
                Write a schema
              </Typography>
              <div className={classes.editorWrapper}>
                <CodeEditor showGutter={false} value={value} fontSize={11} />
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
                Render it
              </Typography>
              <Paper elevation={3} className={classes.formState} square>
                <FormExample setFormState={setFormState} />
                {!formState ? <Typography variant="p">Click on submit to show values</Typography> : <pre>{JSON.stringify(formState, null, 2)}</pre>}
              </Paper>
              <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
                Available features
              </Typography>
              <List component="nav" aria-label="features">
                {buildFeatures}
              </List>
              <Typography variant="p" gutterBottom>
                ... and many more!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={11} md={11}>
        <Paper elevation={0} className={classes.cardCenter}>
          <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
            Available mappers
          </Typography>
          <Grid container direction="row" justify="space-evenly">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className={classes.textBottom}>
                MaterialUI
              </Typography>
              <a href="https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper" rel="noopener noreferrer" target="_blank">
                <MaterialUILogo style={{ fontSize: 100 }} />
              </a>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className={classes.textBottom}>
                PatternFly 4
              </Typography>
              <a href="https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper" rel="noopener noreferrer" target="_blank">
                <PF4Logo style={{ fontSize: 200, height: '50%' }} />
              </a>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className={classes.textBottom}>
                PatternFly 3
              </Typography>
              <a href="https://www.npmjs.com/package/@data-driven-forms/pf3-component-mapper" rel="noopener noreferrer" target="_blank">
                <PF3Logo style={{ fontSize: 100 }} />
              </a>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" gutterBottom>
                This list represents a set of provided mappers. Each mapper brings all basic form components from its design system. You can
                immediately use form inputs such as text fields, selects, radios, checkboxes or wizards. However, this selection does not limit you as
                integrating custom coponents is simple as it can be - all it takes is just one hook.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LandingPageCards;

/*
        <Paper elevation={0} className={classes.card}>
          <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
            How to install it?
          </Typography>
          <Typography variant="h5" gutterBottom>
            Installation
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Add react form renderer
          </Typography>
          <pre className={classes.codeSnippet}>
            <code className={classes.languageSh}>$ npm install @data-driven-forms/react-form-renderer -S</code>
          </pre>
          <pre className={classes.codeSnippet}>
            <code className={classes.languageSh}>$ yarn add @data-driven-forms/react-form-renderer</code>
          </pre>
          <Divider className={classes.divider} />
          <Typography color="textSecondary" gutterBottom>
            Choose your component mapper
          </Typography>
          <pre className={classes.codeSnippet}>
            <code className={classes.languageSh}>$ npm install @data-driven-forms/pf4-component-mapper -S</code>
          </pre>
          <pre className={classes.codeSnippet}>
            <code className={classes.languageSh}>$ yarn add @data-driven-forms/pf4-component-mapper</code>
          </pre>
        </Paper>

                  <div style={{ background: '#1d1f21', paddingTop: 16 }}>
            <CodeEditor value={value} />
          </div>

*/
