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
import { muiCode, muiHtml, muiDependencies } from '../stackblitz-templates/mui-templates';

const project = {
  settings: {
    compile: {
      trigger: 'auto',
      action: 'hmr',
      clearConsole: false
    }
  },
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

const blitzFiles = {
  mui: {
    'index.html': muiHtml,
    'index.js': muiCode
  }
};

const blitzDependencies = {
  mui: muiDependencies
};

const ComponentExample = ({ baseStructure, activeMapper, componentMapper, component }) => {
  useEffect(() => {
    sdk.embedProject(
      'code-target',
      {
        ...project,
        dependencies: blitzDependencies[activeMapper],
        files: {
          ...blitzFiles[activeMapper],
          'schema.js': `export default ${JSON.stringify(baseStructure.value, null, 2)};`
        }
      },
      { height: '100%', hideNavigation: true, forceEmbedLayout: true, openFile: 'schema.js' }
    );
  }, [activeMapper, baseStructure.value]);

  return (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={false} md={3}>
        <Card style={{ minHeight: 500 }} square>
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
