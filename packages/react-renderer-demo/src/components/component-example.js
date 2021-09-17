import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

import Link from 'next/link';
import clsx from 'clsx';

import * as mui from '../stackblitz-templates/mui-templates';
import * as pf4 from '../stackblitz-templates/pf4-templates';
import * as blueprint from '../stackblitz-templates/blueprint-templates';
import * as suir from '../stackblitz-templates/suir-template';
import * as ant from '../stackblitz-templates/ant-templates';
import * as carbon from '../stackblitz-templates/carbon-templates';

import avalableMappers from '../helpers/available-mappers';
import GhIcon from './common/gh-svg-icon';
import originalComponentLink from '../helpers/original-component-link';

const correctComponent = (component) => (component === 'checkbox-multiple' ? 'checkbox' : component);

const metadata = {
  mui,
  pf4,
  blueprint,
  suir,
  ant,
  carbon,
};

const project = {
  settings: {
    compile: {
      trigger: 'auto',
      action: 'hmr',
      clearConsole: false,
    },
  },
  template: 'javascript',
};

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  smTabDown: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  smTabUp: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tab: {
    minWidth: 'initial',
    '&.active': {
      color: '#000',
      background: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      '&:last-child': {
        marginBottom: 2,
      },
    },
  },
  indicator: {
    width: 4,
  },
  tabLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  spinnerCheat: {
    flex: 1,
    position: 'relative',
    boxShadow: theme.shadows[1],
    '& .longer + #code-target': {
      maxHeight: 'calc(100% - 49px)',
    },
  },
  spinner: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
    zIndex: -1,
  },
  editorContainer: {
    minHeight: 500,
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 16,
      flexDirection: 'column',
    },
    '& iframe': {
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        height: 500,
      },
    },
  },
  buttonGroup: {
    marginTop: 16,
    marginBottom: 16,
  },
  alert: {
    marginBottom: 8,
  },
  variantTabs: {
    height: 49,
    background: '#eaeaea',
  },
  hidden: {
    height: 0,
    minHeight: 0,
  },
  expand: {
    transform: 'rotate(-90deg)',
  },
  hide: {
    transform: 'rotate(90deg)',
  },
  tableHeader: {
    paddingBottom: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tableBody: {
    paddingTop: 0,
  },
  expandButton: {
    width: '100%',
  },
}));

const stringifyWithFunctions = (string) =>
  JSON.stringify(string, null, 2)
    .replace(/<NEWLINE>/g, '\n')
    .replace(/"<FUNCTION/g, '')
    .replace(/FUNCTION>"/g, '');

const ComponentExample = ({ variants, schema, activeMapper, component, schemaVariants, activeSchema }) => {
  const [expanded, setExpanded] = useState(true);

  const { pathname, push } = useRouter();
  const classes = useStyles();

  const availableVariants = schemaVariants?.[activeMapper];
  const selectedSchema =
    availableVariants?.find(({ value }) => value === activeSchema)?.schema ||
    availableVariants?.find(({ value }) => value === 'basic')?.schema ||
    schema;
  const basicConfiguration = {
    ...project,
    dependencies: metadata[activeMapper].dependencies,
    files: {
      'index.html': metadata[activeMapper].html,
      'index.js': metadata[activeMapper].code,
      ...(component === 'wizard' && { 'index.js': metadata[activeMapper].wizardCode }),
      'schema.js': `export default ${stringifyWithFunctions(selectedSchema)};`,
    },
  };
  const basicEditorSettings = { height: '100%', hideNavigation: true, forceEmbedLayout: true, openFile: 'schema.js' };

  useEffect(() => {
    if (activeSchema && !availableVariants?.find(({ value }) => value === activeSchema)) {
      push(`${pathname}?mapper=${activeMapper}&schema=basic`);
    }

    sdk.embedProject('code-target', basicConfiguration, basicEditorSettings);
  }, [activeMapper, schema, activeSchema]);

  const renderMapperTabs = () =>
    avalableMappers.map(({ title, mapper }) => (
      <Tab
        key={mapper}
        value={mapper}
        onClick={() => push(`${pathname}?mapper=${mapper}${activeSchema ? `&schema=${activeSchema}` : ''}`)}
        className={clsx(classes.tab, { active: activeMapper === mapper })}
        label={
          <Link href={`${pathname}?mapper=${mapper}${activeSchema ? `&schema=${activeSchema}` : ''}`}>
            <a href={`${pathname}?mapper=${mapper}${activeSchema ? `&schema=${activeSchema}` : ''}`} className={classes.tabLink}>
              {title}
            </a>
          </Link>
        }
      />
    ));

  const activeComponent = correctComponent(component);

  return (
    <React.Fragment>
      <Box display="flex" className={classes.box}>
        {expanded && (
          <Card style={{ minHeight: 500 }} square>
            <CardHeader
              className={clsx(classes.tableHeader)}
              title={expanded ? 'Options' : ''}
              action={
                <IconButton aria-label="hide options" onClick={() => setExpanded(!expanded)}>
                  <ExpandMoreIcon className={classes.hide} />
                </IconButton>
              }
            />
            <CardContent className={classes.tableBody}>
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
        )}
        <Box display="flex" className={classes.editorContainer}>
          <div className={classes.smTabDown}>
            <Tabs
              value={activeMapper}
              orientation="horizontal"
              variant="fullWidth"
              classes={{
                indicator: classes.indicator,
              }}
            >
              {renderMapperTabs()}
            </Tabs>
          </div>
          <div className={classes.smTabUp}>
            {!expanded && (
              <IconButton className={classes.expandButton} aria-label="expand options" onClick={() => setExpanded(!expanded)}>
                <ExpandMoreIcon className={classes.expand} />
              </IconButton>
            )}
            <Tabs
              value={activeMapper}
              orientation="vertical"
              variant="scrollable"
              classes={{
                indicator: classes.indicator,
              }}
            >
              {renderMapperTabs()}
            </Tabs>
          </div>
          <div className={classes.spinnerCheat}>
            <Tabs
              hidden={!availableVariants}
              value={activeSchema || 'basic'}
              className={clsx(availableVariants && classes.variantTabs, availableVariants ? 'longer' : classes.hidden)}
            >
              {(availableVariants || []).map((variant) => (
                <Tab
                  onClick={() => push(`${pathname}?mapper=${activeMapper}&schema=${variant.value}`)}
                  label={
                    <Link href={`${pathname}?mapper=${activeMapper}&schema=${variant.value}`}>
                      <a href={`${pathname}?mapper=${activeMapper}&schema=${variant.value}`} className={classes.tabLink}>
                        {variant.label}
                      </a>
                    </Link>
                  }
                  value={variant.value}
                  key={variant.value}
                />
              ))}
            </Tabs>
            <div id="code-target" className="pepa"></div>
            <div className={classes.spinner}>
              <CircularProgress color="secondary" size={80} />
            </div>
          </div>
        </Box>
      </Box>
      <ButtonGroup fullWidth className={classes.buttonGroup}>
        <Button
          component="a"
          rel="noopener noreferrer"
          target="_blank"
          href={originalComponentLink(activeMapper, activeComponent)}
          startIcon={<LinkIcon />}
        >
          Original documentation
        </Button>
        <Button
          component="a"
          rel="noopener noreferrer"
          target="_blank"
          href={`https://github.com/data-driven-forms/react-forms/blob/master/packages/${activeMapper}-component-mapper/src/${activeComponent}/${activeComponent}.js`}
          startIcon={<GhIcon />}
        >
          DDF implementation
        </Button>
      </ButtonGroup>
    </React.Fragment>
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
      required: PropTypes.bool,
    })
  ).isRequired,
  schemaVariants: PropTypes.object,
  activeSchema: PropTypes.string,
};

export default ComponentExample;
