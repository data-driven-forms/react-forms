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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import clsx from 'clsx';

import { muiCode, muiWizardCode, muiHtml, muiDependencies } from '../stackblitz-templates/mui-templates';
import { pf4Code, pf4WizardCode, pf4Html, pf4Dependencies } from '../stackblitz-templates/pf4-templates';
import { pf3Code, pf3WizardCode, pf3Html, pf3Dependencies } from '../stackblitz-templates/pf3-templates';

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
  tab: {
    minWidth: 'initial'
  },
  indicator: {
    width: 4
  },
  tabLink: {
    textDecoration: 'none',
    color: 'inherit',
    '&.active': {
      color: '#000',
      background: theme.palette.common.white,
      boxShadow: theme.shadows[1]
    }
  },
  editorContainer: {
    height: '100%',
    '& iframe': {
      border: 'none'
    }
  }
}));

const blitzFiles = {
  mui: {
    'index.html': muiHtml,
    'index.js': muiCode
  },
  pf4: {
    'index.html': pf4Html,
    'index.js': pf4Code
  },
  pf3: {
    'index.html': pf3Html,
    'index.js': pf3Code
  }
};

const blitzWizards = {
  mui: muiWizardCode,
  pf4: pf4WizardCode,
  pf3: pf3WizardCode
};

const blitzDependencies = {
  mui: muiDependencies,
  pf4: pf4Dependencies,
  pf3: pf3Dependencies
};

const mapperTab = {
  mui: 0,
  pf4: 1,
  pf3: 2
};

const ComponentExample = ({ baseStructure, activeMapper, component }) => {
  const activeTab = mapperTab[activeMapper];
  const router = useRouter();
  const classes = useStyles();
  useEffect(() => {
    sdk.embedProject(
      'code-target',
      {
        ...project,
        dependencies: blitzDependencies[activeMapper],
        files: {
          ...blitzFiles[activeMapper],
          ...(component === 'wizard' && { 'index.js': blitzWizards[activeMapper] }),
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
        <Box display="flex" className={classes.editorContainer}>
          <Tabs
            value={activeTab}
            orientation="vertical"
            variant="scrollable"
            classes={{
              indicator: classes.indicator
            }}
          >
            <Link href={`${router.pathname}?mapper=mui`}>
              <a href={`${router.pathname}?mapper=mui`} className={clsx(classes.tabLink, { active: activeTab === 0 })}>
                <Tab className={classes.tab} label="Mui" />
              </a>
            </Link>
            <Link href={`${router.pathname}?mapper=pf4`}>
              <a href={`${router.pathname}?mapper=pf4`} className={clsx(classes.tabLink, { active: activeTab === 1 })}>
                <Tab className={classes.tab} label="PF4" />
              </a>
            </Link>
            <Link href={`${router.pathname}?mapper=pf3`}>
              <a href={`${router.pathname}?mapper=pf3`} className={clsx(classes.tabLink, { active: activeTab === 2 })}>
                <Tab className={classes.tab} label="PF3" />
              </a>
            </Link>
          </Tabs>
          <div id="code-target"></div>
        </Box>
      </Grid>
    </Grid>
  );
};

ComponentExample.propTypes = {
  component: PropTypes.string.isRequired,
  activeMapper: PropTypes.string.isRequired,
  baseStructure: PropTypes.shape({
    variants: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired
  }).isRequired
};

export default ComponentExample;
