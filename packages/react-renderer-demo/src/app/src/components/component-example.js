import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import sdk from '@stackblitz/sdk';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';

const indexHtml = `
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const jsCode = `import React, { Component } from 'react';
import { render } from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import componentMapper from '@data-driven-forms/mui-component-mapper/dist/cjs/component-mapper';

import schema from './schema'

class App extends Component {
  render() {
    return (
      <div style={{margin: 24}}>
        <FormRenderer
          schema={schema}
          FormTemplate={FormTemplate}
          componentMapper={componentMapper}
          onSubmit={console.log}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));`;

const dependencies = {
  react: '^16.12.0',
  'react-dom': '^16.12.0',
  '@data-driven-forms/react-form-renderer': 'latest',
  '@data-driven-forms/mui-component-mapper': 'latest',
  '@material-ui/core': 'latest',
  '@material-ui/icons': 'latest',
  'prop-types': 'latest'
};

const project = {
  files: {
    'index.html': indexHtml,
    'index.js': jsCode
  },
  settings: {
    compile: {
      trigger: 'auto',
      action: 'hmr',
      clearConsole: false
    }
  },
  dependencies,
  template: 'javascript'
};

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  },
  radioLink: {
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const ComponentExample = ({ baseStructure, activeMapper, componentMapper, component, ...props }) => {
  useEffect(() => {
    sdk.embedProject(
      'code-target',
      {
        ...project,
        files: {
          ...project.files,
          'schema.js': `export default ${JSON.stringify(baseStructure.value, null, 2)};`
        }
      },
      { height: 500, hideNavigation: true, forceEmbedLayout: true, openFile: 'schema.js' }
    );
  }, []);

  return (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={false} md={3}>
        <Card style={{ minHeight: '100%' }} square>
          <CardContent>
            <Typography component="h3">Options</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Required</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {baseStructure.variants.map(({ name, type, required }) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{`${type}`}</TableCell>
                    <TableCell>{required && <CheckIcon fontSize="small" />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={9}>
        <div id="code-target"></div>
      </Grid>
    </Grid>
  );
};

ComponentExample.propTypes = {
  component: PropTypes.string.isRequired,
  activeMapper: PropTypes.string.isRequired,
  componentMapper: PropTypes.object.isRequired,
  baseStructure: PropTypes.shape({
    variants: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired
  }).isRequired
};

export default ComponentExample;
