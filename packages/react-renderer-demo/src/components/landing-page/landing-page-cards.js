import React, { useState } from 'react';
import RouterLink from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

import ArchiveIcon from '@material-ui/icons/Archive';
import CreateIcon from '@material-ui/icons/Create';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

import FormExample from './formExample';

import CodeEditor from '@docs/components/code-editor';

const value = `import React from 'react';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper';

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
    Icon: ArchiveIcon,
    href: 'https://final-form.org/react'
  },
  {
    text: 'Multiple provided libraries - MaterialUI included!',
    Icon: LocalLibraryIcon,
    link: '/mappers/component-api'
  },
  {
    text: 'Validation - basic types are provided, supports async validators!',
    Icon: VerifiedUserIcon,
    link: '/schema/introduction#validate'
  },
  {
    text: 'Conditions - hide and modify fields according to values of other fields!',
    Icon: PlaylistAddCheckIcon,
    link: '/schema/introduction#condition'
  },
  {
    text: 'Fully customizable - you can use any components you are using right now!',
    Icon: EditAttributesIcon,
    link: '/mappers/custom-mapper'
  },
  {
    text: 'Online editor - you can build your form using comfy DnD!',
    Icon: CreateIcon,
    link: '/live-editor'
  }
].map(({ text, Icon, href, link }, idx) => {
  const children = (
    <ListItem button>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );

  if (link) {
    return (
      <RouterLink href={link} key={idx}>
        <Link href={link} style={{ textDecoration: 'none', color: 'inherit' }}>
          {children}
        </Link>
      </RouterLink>
    );
  }

  return (
    <Link href={href} rel="noopener noreferrer" target="_blank" key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  );
});

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
  },
  mappersText: {
    marginTop: 16
  },
  logo: {
    height: 100,
    width: 'auto'
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
                <CodeEditor showGutter={false} value={value} fontSize={11} switchable />
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
                Render it
              </Typography>
              <Paper elevation={3} className={classes.formState} square>
                <FormExample setFormState={setFormState} />
                {!formState ? (
                  <Typography variant="body2">Click on the button to show values</Typography>
                ) : (
                  <pre>{JSON.stringify(formState, null, 2)}</pre>
                )}
              </Paper>
              <Typography className={classes.cardQuestion} variant="h6" gutterBottom>
                Available features
              </Typography>
              <List component="nav" aria-label="features">
                {buildFeatures}
              </List>
              <Typography variant="body2" gutterBottom>
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
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className={classes.textBottom}>
                MaterialUI
              </Typography>
              <RouterLink href="/mappers/mui-component-mapper">
                <a href="/mappers/mui-component-mapper">
                  <img className={classes.logo} alt="material ui logo" src="/mui-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className={classes.textBottom}>
                PatternFly 4
              </Typography>
              <RouterLink href="/mappers/pf4-component-mapper">
                <a href="/mappers/pf4-component-mapper">
                  <img className={classes.logo} alt="pf4 logo" src="/pf4-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className={classes.textBottom}>
                PatternFly 3
              </Typography>
              <RouterLink href="/mappers/pf3-component-mapper">
                <a href="/mappers/pf3-component-mapper">
                  <img className={classes.logo} alt="pf4 logo" src="/pf3-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={6} md={3} xl={2}>
              <Typography variant="h6" className={classes.textBottom}>
                BlueprintJS
              </Typography>
              <RouterLink href="/mappers/blueprint-component-mapper">
                <a href="/mappers/blueprint-component-mapper">
                  <img className={classes.logo} alt="blueprintjs logo" src="/blueprintjs-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={6} md={3} xl={2}>
              <Typography variant="h6" className={classes.textBottom}>
                Semantic UI
              </Typography>
              <RouterLink href="/mappers/suir-component-mapper">
                <a href="/mappers/suir-component-mapper">
                  <img className={classes.logo} alt="semantic ui logo" src="/semantic-ui-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={6} md={3} xl={2}>
              <Typography variant="h6" className={classes.textBottom}>
                Ant Design
              </Typography>
              <RouterLink href="/mappers/ant-component-mapper">
                <a href="/mappers/ant-component-mapper">
                  <img className={classes.logo} alt="ant logo" src="/ant-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={12} md={3} xl={12}>
              <Typography variant="h6" className={classes.textBottom}>
                Carbon Design System
              </Typography>
              <RouterLink href="/mappers/carbon-component-mapper">
                <a href="/mappers/carbon-component-mapper">
                  <img className={classes.logo} alt="ant logo" src="/carbon-logo.svg" />
                </a>
              </RouterLink>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" gutterBottom className={classes.mappersText}>
                This list represents a set of provided mappers. Each mapper brings all basic form components from its design system. You can
                immediately use form inputs such as text fields, selects, radios, checkboxes or wizards. However, this selection does not limit you as
                integrating custom components is simple as it can be - all it takes is just{' '}
                <RouterLink href="/hooks/use-field-api">
                  <a href="/hooks/use-field-api">one hook</a>
                </RouterLink>
                .
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LandingPageCards;
