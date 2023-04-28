import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

import ArchiveIcon from '@mui/icons-material/Archive';
import CreateIcon from '@mui/icons-material/Create';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import FormExample from './formExample';

import CodeEditor from '@docs/components/code-editor';
import DocLink from '../common/doc-link';

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
    href: 'https://final-form.org/react',
  },
  {
    text: 'Multiple provided libraries - MaterialUI included!',
    Icon: LocalLibraryIcon,
    link: '/provided-mappers/component-api',
  },
  {
    text: 'Validation - basic types are provided, supports async validators!',
    Icon: VerifiedUserIcon,
    link: '/schema/introduction#validate',
  },
  {
    text: 'Conditions - hide and modify fields according to values of other fields!',
    Icon: PlaylistAddCheckIcon,
    link: '/schema/introduction#condition',
  },
  {
    text: 'Fully customizable - you can use any components you are using right now!',
    Icon: EditAttributesIcon,
    link: '/mappers/custom-mapper',
  },
  {
    text: 'Online editor - you can build your form using comfy DnD!',
    Icon: CreateIcon,
    link: '/live-editor',
  },
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
      <DocLink href={link} style={{ textDecoration: 'none', color: 'inherit' }} key={idx}>
        {children}
      </DocLink>
    );
  }

  return (
    <Link href={href} rel="noopener noreferrer" target="_blank" key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  );
});

const Root = styled(Grid)(({ theme }) => ({
  '&.cardsContainer': {
    backgroundColor: theme.palette.common.white,
    minHeight: '100vh',
  },
  '& .codeSnippet': {
    margin: '8px 0px',
    padding: '8px 0px',
    marginBottom: 23,
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    overflow: 'auto',
    fontSize: 14,
    borderRadius: 3,
    border: '1px solid #979797',
    maxWidth: 'calc(100vw - 64px)',
  },
  '& .languageSh': {
    padding: '2px 6px',
  },
  '& .card': {
    backgroundColor: theme.palette.grey[100],
    margin: 16,
    padding: 24,
    borderRadius: 2,
  },
  '& .cardCenter': {
    backgroundColor: theme.palette.grey[100],
    margin: 16,
    padding: 24,
    borderRadius: 2,
    textAlign: 'center',
  },
  '& .divider': {
    marginBottom: 16,
  },
  '& .cardQuestion': {
    color: '#F28D63',
  },
  '& .editorWrapper': {
    background: '#1D1F21',
    padding: 16,
    borderRadius: 4,
  },
  '& .formState': {
    marginTop: 7,
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
  '& .textBottom': {
    marginBottom: 16,
  },
  '& .mappersText': {
    marginTop: 16,
  },
  '& .logo': {
    height: 100,
    width: 'auto',
  },
}));

const LandingPageCards = () => {
  const [formState, setFormState] = useState(undefined);

  return (
    <Root container direction="row" justifyContent="space-evenly" className="cardsContainer">
      <Grid item xs={11} md={11}>
        <Paper elevation={0} className="card">
          <Grid container direction="row" justifyContent="space-evenly">
            <Grid item xs={12} md={5}>
              <Typography className="cardQuestion" variant="h6" gutterBottom>
                Write a schema
              </Typography>
              <div className="editorWrapper">
                <CodeEditor showGutter={false} value={value} fontSize={11} />
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography className="cardQuestion" variant="h6" gutterBottom>
                Render it
              </Typography>
              <Paper elevation={3} className="formState" square>
                <FormExample setFormState={setFormState} />
                {!formState ? (
                  <Typography variant="body2">Click on the button to show values</Typography>
                ) : (
                  <pre>{JSON.stringify(formState, null, 2)}</pre>
                )}
              </Paper>
              <Typography className="cardQuestion" variant="h6" gutterBottom>
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
        <Paper elevation={0} className="cardCenter">
          <Typography className="cardQuestion" variant="h6" gutterBottom>
            Available mappers
          </Typography>
          <Grid container direction="row" justifyContent="space-evenly">
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className="textBottom">
                MaterialUI
              </Typography>
              <DocLink href="/provided-mappers/mui-component-mapper">
                <img className="logo" alt="material ui logo" src="/mui-logo.svg" />
              </DocLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className="textBottom">
                PatternFly 4
              </Typography>
              <DocLink href="/provided-mappers/pf4-component-mapper">
                <img className="logo" alt="pf4 logo" src="/pf4-logo.svg" />
              </DocLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className="textBottom">
                BlueprintJS
              </Typography>
              <DocLink href="/provided-mappers/blueprint-component-mapper">
                <img className="logo" alt="blueprintjs logo" src="/blueprintjs-logo.svg" />
              </DocLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className="textBottom">
                Semantic UI
              </Typography>
              <DocLink href="/provided-mappers/suir-component-mapper">
                <img className="logo" alt="semantic ui logo" src="/semantic-ui-logo.svg" />
              </DocLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className="textBottom">
                Ant Design
              </Typography>
              <DocLink href="/provided-mappers/ant-component-mapper">
                <img className="logo" alt="ant logo" src="/ant-logo.svg" />
              </DocLink>
            </Grid>
            <Grid item xs={6} md={4} xl={2}>
              <Typography variant="h6" className="textBottom">
                Carbon Design System
              </Typography>
              <DocLink href="/provided-mappers/carbon-component-mapper">
                <img className="logo" alt="ant logo" src="/carbon-logo.svg" />
              </DocLink>
            </Grid>
            <Grid item xs={8} md={8} xl={8}>
              <Typography variant="body2" gutterBottom className="mappersText">
                This list represents a set of provided mappers. Each mapper brings all basic form components from its design system. You can
                immediately use form inputs such as text fields, selects, radios, checkboxes or wizards. However, this selection does not limit you as
                integrating custom components is simple as it can be - all it takes is just <DocLink href="/hooks/use-field-api">one hook</DocLink>.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Root>
  );
};

export default LandingPageCards;
