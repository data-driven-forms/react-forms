import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import dynamic from 'next/dynamic'
const CodeEditor = dynamic(import('../code-editor'), {
  ssr: false
});

const value = `import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'name',
    label: 'Your name'
  }]
}

const Form = () => (
  <FormRenderer
    schema={schema}
    formFieldsMapper={formFieldsMapper}
    layoutMapper={layoutMapper}
    onSubmit={console.log}
  />
)
`;

const useStyles = makeStyles(theme => ({
  cardsContainer: {
    backgroundColor: theme.palette.common.white,
    minHeight: '100vh',
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
    maxWidth: 'calc(100vw - 64px)',
  },
  languageSh: {
    padding: '2px 6px',
  },
  card: {
    backgroundColor: theme.palette.grey[100],
    margin: 16,
    padding: 24,
    borderRadius: 2,
  },
  divider: {
    marginBottom: 16,
  },
  cardQuestion: {
    color: '#F28D63',
  },
}));

const LandingPageCards = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      className={ classes.cardsContainer }
    >
      <Grid item xs={ 11 } md={ 5 }>
        <Paper elevation={ 0 } className={ classes.card }>
          <Typography className={ classes.cardQuestion } variant="h6" gutterBottom>How to install it?</Typography>
          <Typography variant="h5" gutterBottom>Installation</Typography>
          <Typography color="textSecondary" gutterBottom>Add react form renderer</Typography>
          <pre className={ classes.codeSnippet }>
            <code className={ classes.languageSh }>$ npm install @data-driven-forms/react-form-renderer -S</code>
          </pre>
          <pre className={ classes.codeSnippet }>
            <code className={ classes.languageSh }>$ yarn add @data-driven-forms/react-form-renderer</code>
          </pre>
          <Divider className={ classes.divider } />
          <Typography color="textSecondary" gutterBottom>Choose your component mapper</Typography>
          <pre className={ classes.codeSnippet }>
            <code className={ classes.languageSh }>$ npm install @data-driven-forms/pf4-component-mapper -S</code>
          </pre>
          <pre className={ classes.codeSnippet }>
            <code className={ classes.languageSh }>$ yarn add @data-driven-forms/pf4-component-mapper</code>
          </pre>
        </Paper>
      </Grid>
      <Grid item xs={ 11 } md={ 5 }>
        <Paper elevation={ 0 } className={ classes.card }>
          <Typography className={ classes.cardQuestion } variant="h6" gutterBottom>How can i use it?</Typography>
          <Typography variant="h5" gutterBottom>Usage</Typography>
          <Typography color="textSecondary" gutterBottom>Create your form schema and render it</Typography>
          <div style={{ background: '#1d1f21', paddingTop: 16 }}>
            <CodeEditor value={ value } />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LandingPageCards;
