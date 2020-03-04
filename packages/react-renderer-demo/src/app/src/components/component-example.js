import React, { Component } from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import { baseExamples } from '@docs/components/navigation/examples-definitions';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MuiWizard from '@docs/components/missing-demo-fields/mui-wizard/mui-wizard';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import RouterLink from 'next/link';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import dynamic from 'next/dynamic';

import MapperContext from '@docs/components/mappers-context';
const CodeEditor = dynamic(import('@docs/components/code-editor'), {
  ssr: false
});

const Summary = ({ title }) => <div>{title}</div>;
Summary.propTypes = {
  title: PropTypes.string.isRequired
};

// Text inputs are first, then all other actions are sorted by title
const comparator = (a, b) => {
  if (a.component === 'input') {
    if (a.component !== b.component) {
      return -1;
    }
  } else if (b.component === 'input') {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
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

const CopySnackbar = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={<span>Field was copied to clipboard</span>}
      action={[
        <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

CopySnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};

class ComponentExample extends Component {
  constructor(props) {
    super(props);

    const { component } = this.props;

    const baseStructure = baseExamples.find((item) => item.component === component);
    if (!baseStructure) {
      this.state = {
        notFound: true,
        component: props.router.query.component
      };
    } else {
      this.state = {
        ...baseStructure,
        variants: [
          ...baseStructure.variants,
          { name: 'name', title: 'Name', value: baseStructure.value.fields[0].name, component: 'input' },
          ...(baseStructure.canBeRequired
            ? [
                {
                  name: 'isRequired',
                  title: 'Required',
                  validate: [
                    {
                      type: validatorTypes.REQUIRED
                    }
                  ]
                }
              ]
            : [])
        ],
        value: JSON.stringify(baseStructure.value, null, 2),
        parsedSchema: baseStructure.value,
        frameHeight: 360,
        openTooltip: false
      };
    }

    this.mapperVariants = {
      mui: {
        componentMapper: {
          ...props.mappers.mui.componentMapper,
          [componentTypes.WIZARD]: MuiWizard,
          summary: Summary
        },
        formTemplate: props.mappers.mui.formTemplate
      },
      pf3: {
        componentMapper: {
          ...props.mappers.pf3.componentMapper,
          summary: Summary
        },
        formTemplate: props.mappers.pf3.formTemplate
      },
      pf4: {
        componentMapper: {
          ...props.mappers.pf4.componentMapper,
          summary: Summary
        },
        formTemplate: props.mappers.pf4.formTemplate
      }
    };
  }

  handleTooltipClose = () => {
    this.setState({ openTooltip: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openTooltip: true });
  };

  handleExampleVariantChange = (value, index) =>
    this.setState((prevState) => {
      const variants = prevState.variants.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return { ...item, value };
      });

      const previousValue = JSON.parse(prevState.value);
      const newVariants = variants.reduce(
        (acc, curr) => {
          return {
            ...acc,
            [curr.name]: curr.value,
            validate:
              curr.name === 'isRequired' && !curr.value
                ? acc.validate.filter(({ type }) => type === validatorTypes.REQUIRED)
                : curr.validate
                ? [...acc.validate, ...curr.validate]
                : [...acc.validate]
          };
        },
        { validate: [] }
      );
      const newValue = {
        ...previousValue,
        fields: previousValue.fields.map((item) => ({
          ...item,
          ...newVariants
        }))
      };
      const newState = {
        variants,
        value: JSON.stringify(newValue, null, 2),
        parsedSchema: newValue
      };

      return newState;
    });

  renderActions = (actions) =>
    actions.length === 0 ? (
      <Typography variant="h6">No props</Typography>
    ) : (
      actions.sort(comparator).map(({ name, options, title, component }, index) => {
        if (options) {
          return (
            <Grid item xs={12} key={name}>
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor={name}>{title}</InputLabel>
                  <Select
                    value={this.state.variants[index].value || ''}
                    onChange={({ target: { value } }) => this.handleExampleVariantChange(value, index)}
                    inputProps={{
                      name,
                      id: name
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
          );
        }

        if (component === 'input') {
          return (
            <Grid item xs={12} key={name}>
              <TextField
                id={name}
                label={title}
                value={this.state.variants[index].value || ''}
                onChange={({ target: { value } }) => this.handleExampleVariantChange(value, index)}
                margin="normal"
              />
            </Grid>
          );
        }

        if (component === 'textarea') {
          return (
            <Grid item xs={12} key={name}>
              <TextField
                id={name}
                label={title}
                value={this.state.variants[index].value || ''}
                onChange={({ target: { value } }) => this.handleExampleVariantChange(value, index)}
                margin="normal"
                fullWidth
                multiline
              />
            </Grid>
          );
        }

        return (
          <Grid item xs={12} key={name}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.variants[index].value || false}
                    onChange={(_e, value) => this.handleExampleVariantChange(value, index)}
                    value="checkedB"
                    color="primary"
                  />
                }
                label={title}
              />
            </FormGroup>
          </Grid>
        );
      })
    );

  onChange = (value) => {
    try {
      this.setState({ parsedSchema: JSON.parse(value) });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('not a json', error);
    } finally {
      this.setState({ value });
    }
  };

  render() {
    const { value, parsedSchema, component, openTooltip, variants } = this.state;
    const { activeMapper, classes } = this.props;
    const { FormTemplate } = this.mapperVariants[activeMapper];

    const editedValue = value
      .replace(/^{\n {2}"fields": \[\n/, '')
      .replace(/ {2}\]\n}$/, '')
      .replace(/\n {4}/g, '\n')
      .replace(/ {2}"validate": \[\],\n/g, '')
      .replace(/ {4}/, '');

    return (
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Schema
            </Typography>
          </Grid>
          <div style={{ background: '#1d1f21', position: 'relative' }}>
            <Grid item xs={12} container={true} justify="flex-end" style={{ position: 'absolute', zIndex: 100 }}>
              <CopyToClipboard text={editedValue} onCopy={this.handleTooltipOpen}>
                <Button variant="outlined" color="secondary" style={{ margin: 10 }}>
                  Copy
                </Button>
              </CopyToClipboard>
              <CopySnackbar open={openTooltip} handleClose={this.handleTooltipClose} />
            </Grid>
            <CodeEditor
              readOnly
              mode="json"
              onChange={this.onChange}
              editorProps={{ $blockScrolling: true }}
              value={editedValue}
              fontSize={14}
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              style={{ width: '100%' }}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Props
            </Typography>
          </Grid>
          <Card square>
            <CardContent>{this.renderActions(variants)}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Preview
            </Typography>
          </Grid>
          <Card square style={{ overflow: 'initial' }}>
            <div style={{ padding: 8 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Component mapper</FormLabel>
                <RadioGroup
                  aria-label="component-mapper"
                  name="component-mapper"
                  value={activeMapper}
                  onChange={this.handleMapperChange}
                  style={{ flexDirection: 'row' }}
                >
                  <RouterLink href={`${this.props.router.pathname}?mapper=mui`}>
                    <Link href={`${this.props.router.pathname}?mapper=mui`} className={classes.radioLink}>
                      <FormControlLabel value="mui" control={<Radio />} label="MUI" />
                    </Link>
                  </RouterLink>
                  <RouterLink href={`${this.props.router.pathname}?mapper=pf3`}>
                    <Link href={`${this.props.router.pathname}?mapper=pf3`} className={classes.radioLink}>
                      <FormControlLabel value="pf3" control={<Radio />} label="PF3" />
                    </Link>
                  </RouterLink>
                  <RouterLink href={`${this.props.router.pathname}?mapper=pf4`}>
                    <Link href={`${this.props.router.pathname}?mapper=pf4`} className={classes.radioLink}>
                      <FormControlLabel value="pf4" control={<Radio />} label="PF4" />
                    </Link>
                  </RouterLink>
                </RadioGroup>
              </FormControl>
            </div>
            <CardContent>
              <div className={activeMapper}>
                <div style={{ paddingLeft: 8 }}>
                  <FormRenderer
                    {...this.mapperVariants[activeMapper]}
                    schema={parsedSchema}
                    onSubmit={console.log /* eslint-disable-line no-console */}
                    FormTemplate={(props) => <FormTemplate {...props} showFormControls={component !== 'wizard'} />}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

ComponentExample.propTypes = {
  component: PropTypes.string.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      component: PropTypes.string,
      mapper: PropTypes.string
    }),
    push: PropTypes.func.isRequired,
    pathname: PropTypes.string
  }),
  mappers: PropTypes.object,
  activeMapper: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    radioLink: PropTypes.string.isRequired
  }).isRequired
};

export default (props) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <MapperContext.Consumer>
      {({ loaded, mappers }) =>
        loaded ? (
          <ComponentExample {...props} router={router} mappers={mappers} classes={classes} />
        ) : (
          <Grid container direction="row" justify="center" alignItems="center">
            <CircularProgress disableShrink />
          </Grid>
        )
      }
    </MapperContext.Consumer>
  );
};
