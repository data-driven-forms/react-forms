import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import sdk from '@stackblitz/sdk';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LinkIcon from '@mui/icons-material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

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
import DocLink from './common/doc-link';

const PREFIX = 'ComponentExample';

const classes = {
  box: `${PREFIX}-box`,
  smTabDown: `${PREFIX}-smTabDown`,
  smTabUp: `${PREFIX}-smTabUp`,
  tab: `${PREFIX}-tab`,
  indicator: `${PREFIX}-indicator`,
  tabLink: `${PREFIX}-tabLink`,
  spinnerCheat: `${PREFIX}-spinnerCheat`,
  spinner: `${PREFIX}-spinner`,
  editorContainer: `${PREFIX}-editorContainer`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  alert: `${PREFIX}-alert`,
  variantTabs: `${PREFIX}-variantTabs`,
  hidden: `${PREFIX}-hidden`,
  expand: `${PREFIX}-expand`,
  hide: `${PREFIX}-hide`,
  tableHeader: `${PREFIX}-tableHeader`,
  tableBody: `${PREFIX}-tableBody`,
  expandButton: `${PREFIX}-expandButton`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.box}`]: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },

  [`& .${classes.smTabDown}`]: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },

  [`& .${classes.smTabUp}`]: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.tab}`]: {
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

  [`& .${classes.indicator}`]: {
    width: 4,
    backgroundColor: '#f50057',
  },

  [`& .${classes.tabLink}`]: {
    textDecoration: 'none',
    color: 'inherit',
  },

  [`& .${classes.spinnerCheat}`]: {
    flex: 1,
    position: 'relative',
    boxShadow: theme.shadows[1],
    '& .longer + #code-target': {
      maxHeight: 'calc(100% - 49px)',
    },
  },

  [`& .${classes.spinner}`]: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
    zIndex: -1,
    color: '#f50057',
  },

  [`& .${classes.editorContainer}`]: {
    minHeight: 500,
    flex: 1,
    [theme.breakpoints.down('md')]: {
      marginBottom: 16,
      flexDirection: 'column',
    },
    '& iframe': {
      border: 'none',
      [theme.breakpoints.down('md')]: {
        height: 500,
      },
    },
  },

  [`& .${classes.buttonGroup}`]: {
    marginTop: 16,
    marginBottom: 16,
  },

  [`& .${classes.alert}`]: {
    marginBottom: 8,
  },

  [`& .${classes.variantTabs}`]: {
    height: 49,
    background: '#eaeaea',

    '& .Mui-selected': {
      color: 'black',
    },

    '& .MuiTabs-indicator': {
      backgroundColor: '#f50057',
    },
  },

  [`& .${classes.hidden}`]: {
    height: 0,
    minHeight: 0,
  },

  [`& .${classes.expand}`]: {
    transform: 'rotate(-90deg)',
  },

  [`& .${classes.hide}`]: {
    transform: 'rotate(90deg)',
  },

  [`& .${classes.tableHeader}`]: {
    paddingBottom: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.tableBody}`]: {
    paddingTop: 0,
  },

  [`& .${classes.expandButton}`]: {
    width: '100%',
  },
}));

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

const stringifyWithFunctions = (string) =>
  JSON.stringify(string, null, 2)
    .replace(/<NEWLINE>/g, '\n')
    .replace(/"<FUNCTION/g, '')
    .replace(/FUNCTION>"/g, '');

const ComponentExample = ({ variants, schema, activeMapper, component, schemaVariants, activeSchema }) => {
  const [expanded, setExpanded] = useState(true);

  const { pathname, push } = useRouter();
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
          <DocLink
            style={{ textDecoration: 'none', color: 'inherit' }}
            href={`${pathname}?mapper=${mapper}${activeSchema ? `&schema=${activeSchema}` : ''}`}
          >
            <a href={`${pathname}?mapper=${mapper}${activeSchema ? `&schema=${activeSchema}` : ''}`} className={classes.tabLink}>
              {title}
            </a>
          </DocLink>
        }
      />
    ));

  const activeComponent = correctComponent(component);

  return (
    <Root>
      <Box display="flex" className={classes.box}>
        {expanded && (
          <Card style={{ minHeight: 500 }} square>
            <CardHeader
              className={clsx(classes.tableHeader)}
              title={expanded ? 'Options' : ''}
              action={
                <IconButton aria-label="hide options" onClick={() => setExpanded(!expanded)} size="large">
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
              <IconButton className={classes.expandButton} aria-label="expand options" onClick={() => setExpanded(!expanded)} size="large">
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
                    <DocLink href={`${pathname}?mapper=${activeMapper}&schema=${variant.value}`}>
                      <a href={`${pathname}?mapper=${activeMapper}&schema=${variant.value}`} className={classes.tabLink}>
                        {variant.label}
                      </a>
                    </DocLink>
                  }
                  value={variant.value}
                  key={variant.value}
                />
              ))}
            </Tabs>
            <div id="code-target" className="pepa"></div>
            <div className={classes.spinner}>
              <CircularProgress color="inherit" size={80} />
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
          color="inherit"
          sx={{ borderColor: '#c6c6c6' }}
        >
          Original documentation
        </Button>
        <Button
          component="a"
          rel="noopener noreferrer"
          target="_blank"
          href={`https://github.com/data-driven-forms/react-forms/blob/master/packages/${activeMapper}-component-mapper/src/${activeComponent}/${activeComponent}.js`}
          startIcon={<GhIcon />}
          color="inherit"
          sx={{ borderColor: '#c6c6c6' }}
        >
          DDF implementation
        </Button>
      </ButtonGroup>
    </Root>
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
