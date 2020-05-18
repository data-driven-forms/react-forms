import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import { blueprintCode, blueprintWizardCode, blueprintHtml, blueprintDependencies } from '../stackblitz-templates/blueprint-templates';
import { suirCode, suirWizardCode, suirHtml, suirDependencies } from '../stackblitz-templates/suir-template';
import avalableMappers from '../helpers/available-mappers';

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
  box: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  smTabDown: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  smTabUp: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tab: {
    minWidth: 'initial',
    '&.active': {
      color: '#000',
      background: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      '&:last-child': {
        marginBottom: 2
      }
    }
  },
  indicator: {
    width: 4
  },
  tabLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  spinnerCheat: {
    flex: 1,
    position: 'relative',
    boxShadow: theme.shadows[1]
  },
  spinner: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
    zIndex: -1
  },
  editorContainer: {
    minHeight: 500,
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 16,
      flexDirection: 'column'
    },
    '& iframe': {
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        height: 500
      }
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
  },
  blueprint: {
    'index.html': blueprintHtml,
    'index.js': blueprintCode
  },
  suir: {
    'index.html': suirHtml,
    'index.js': suirCode
  }
};

const blitzWizards = {
  mui: muiWizardCode,
  pf4: pf4WizardCode,
  pf3: pf3WizardCode,
  blueprint: blueprintWizardCode,
  suir: suirWizardCode
};

const blitzDependencies = {
  mui: muiDependencies,
  pf4: pf4Dependencies,
  pf3: pf3Dependencies,
  blueprint: blueprintDependencies,
  suir: suirDependencies
};

const mapperTab = {
  mui: 0,
  pf4: 1,
  pf3: 2,
  blueprint: 3,
  suir: 4
};

const ComponentExample = ({ variants, schema, activeMapper, component }) => {
  const activeTab = mapperTab[activeMapper];
  const { pathname, push } = useRouter();
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
          'schema.js': `export default ${JSON.stringify(schema, null, 2)};`
        }
      },
      { height: '100%', hideNavigation: true, forceEmbedLayout: true, openFile: 'schema.js' }
    );
  }, [activeMapper, schema]);

  const renderMapperTabs = () =>
    avalableMappers.map(({ title, mapper }, index) => (
      <Tab
        key={mapper}
        value={index}
        onClick={() => push(`${pathname}?mapper=${mapper}`)}
        className={clsx(classes.tab, { active: activeMapper === mapper })}
        label={
          <Link href={`${pathname}?mapper=${mapper}`}>
            <a href={`${pathname}?mapper=${mapper}`} className={classes.tabLink}>
              {title}
            </a>
          </Link>
        }
      />
    ));

  return (
    <Box display="flex" className={classes.box}>
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
              {variants.map(({ name, type, required }) => (
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
      <Box display="flex" className={classes.editorContainer}>
        <div className={classes.smTabDown}>
          <Tabs
            value={activeTab}
            orientation="horizontal"
            variant="fullWidth"
            classes={{
              indicator: classes.indicator
            }}
          >
            {renderMapperTabs()}
          </Tabs>
        </div>
        <div className={classes.smTabUp}>
          <Tabs
            value={activeTab}
            orientation="vertical"
            variant="scrollable"
            classes={{
              indicator: classes.indicator
            }}
          >
            {renderMapperTabs()}
          </Tabs>
        </div>
        <div className={classes.spinnerCheat}>
          <div id="code-target"></div>
          <div className={classes.spinner}>
            <CircularProgress color="secondary" size={80} />
          </div>
        </div>
      </Box>
    </Box>
  );
};

ComponentExample.propTypes = {
  component: PropTypes.string.isRequired,
  activeMapper: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  variants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool
    })
  ).isRequired
};

export default ComponentExample;
