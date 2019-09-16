import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/mui-component-mapper';
import { formFieldsMapper as pf4FormFieldsMapper, layoutMapper as pf4LayoutMapper } from '@data-driven-forms/pf4-component-mapper';
import { formFieldsMapper as pf3FormFieldsMapper, layoutMapper as pf3LayoutMapper } from '@data-driven-forms/pf3-component-mapper';
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
import { baseExamples } from './examples-definitions';
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
import MuiWizzard from '../demo-missing-fields/mui-wizzard/wizzard';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CodeEditor from './component/code-editor';

// Text inputs are first, then all other actions are sorted by title
const comparator = (a, b) => {
  if (a.component === 'input') {
    if (a.component !== b.component) {
      return -1;
    }
  } else if (b.component === 'input') {
    return 1;
  }

  if (a.title < b.title) {return -1;}

  if (a.title > b.title) {return 1;}

  return 0;
};

const mapperVariants = {
  mui: { formFieldsMapper: { ...formFieldsMapper, [componentTypes.WIZARD]: MuiWizzard, summary: () => <div>Mui summary</div>  }, layoutMapper },
  pf3: {
    formFieldsMapper: {
      ...pf3FormFieldsMapper,
      summary: () => <div>Pf3 summary</div>,
    },
    layoutMapper: pf3LayoutMapper,
  },
  pf4: { formFieldsMapper: { ...pf4FormFieldsMapper, summary: () => <div>Pf4 summary</div> }, layoutMapper: pf4LayoutMapper },
};

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const CopySnackbar = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={ open }
      autoHideDuration={ 6000 }
      onClose={ handleClose }
      message={ <span>Field was coppied to clipboard</span> }
      action={ [
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={ classes.close }
          onClick={ handleClose }
        >
          <CloseIcon />
        </IconButton>,
      ] }
    />
  );
};

CopySnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

class ComponentExample extends Component {
  constructor(props) {
    super(props);
    const baseStructure = baseExamples.find(item => item.component === props.match.params.component);
    if (!baseStructure) {
      this.state = {
        notFound: true,
        component: props.match.params.component,
      };
    } else {
      this.state = {
        ...baseStructure,
        variants: [
          ...baseStructure.variants,
          { name: 'name', title: 'Name', value: baseStructure.value.fields[0].name, component: 'input' },
          ...(baseStructure.canBeRequired ? [{
            name: 'isRequired',
            title: 'Required',
            validate: [{
              type: validatorTypes.REQUIRED,
            }],
          }] : []),
        ],
        value: JSON.stringify(baseStructure.value, null, 2),
        parsedSchema: baseStructure.value,
        activeMapper: 'mui',
        frameHeight: 360,
        openTooltip: false,
      };
    }
  }

  componentDidUpdate({ match: { params: { component }}}){
    if (component !== this.props.match.params.component) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      const baseStructure = baseExamples.find(item => item.component === this.props.match.params.component);
      if (baseStructure) {
        this.setState({
          component: undefined,
          notFound: undefined,
          ...baseStructure,
          variants: [
            ...baseStructure.variants,
            { name: 'name', title: 'Name', value: baseStructure.value.fields[0].name, component: 'input' },
            ...(baseStructure.canBeRequired ? [{
              name: 'isRequired',
              title: 'Required',
              validate: [{
                type: validatorTypes.REQUIRED,
              }],
            }] : []),
          ],
          value: JSON.stringify(baseStructure.value, null, 2),
          parsedSchema: baseStructure.value,
        });
      } else if (!baseStructure && !!component) {
        this.setState({ notFound: true, component: this.props.match.params.component });
      }
    }
  }

  handleMapperChange = (_event, value) => {
    this.setState({ activeMapper: value });
  }

  handleTooltipClose = () => {
    this.setState({ openTooltip: false });
  }

  handleTooltipOpen = () => {
    this.setState({ openTooltip: true });
  }

  handleExampleVariantChange = (value, index) => this.setState(prevState => {
    const variants = prevState.variants.map((item, i) => {
      if (i !== index) {
        return item;
      }

      return { ...item, value };
    });

    const previousValue = JSON.parse(prevState.value);
    const newVariants = variants.reduce((acc, curr) => {
      return ({
        ...acc,
        [curr.name]: curr.value,
        validate: curr.name === 'isRequired' && !curr.value ? acc.validate.filter(({ type }) =>
          type === validatorTypes.REQUIRED) : curr.validate ? [ ...acc.validate, ...curr.validate ] : [ ...acc.validate ],
      });}, { validate: []});
    const newValue = { ...previousValue, fields: previousValue.fields.map(item => ({
      ...item,
      ...newVariants,
    })) };
    const newState = {
      variants,
      value: JSON.stringify(newValue, null, 2),
      parsedSchema: newValue,
    };

    return newState;
  });

  renderActions = (actions) => actions.length === 0 ? <Typography variant="h6">No props</Typography> :
    actions.sort(comparator).map(({ name, options, title, component }, index) => {
      if (options) {
        return (
          <Grid item xs={ 12 } key={ name }>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor={ name }>{ title }</InputLabel>
                <Select
                  value={ this.state.variants[index].value || '' }
                  onChange={ ({ target: { value }}) => this.handleExampleVariantChange(value, index) }
                  inputProps={{
                    name,
                    id: name,
                  }}
                >
                  { options.map(option => (<MenuItem key={ option } value={ option }>{ option }</MenuItem>)) }
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
        );
      }

      if (component === 'input'){
        return (
          <Grid item xs={ 12 } key={ name }>
            <TextField
              id={ name }
              label={ title }
              value={ this.state.variants[index].value || '' }
              onChange={ ({ target: { value }}) => this.handleExampleVariantChange(value, index) }
              margin="normal"
            />
          </Grid>
        );
      }

      return (
        <Grid item xs={ 12 } key={ name }>
          <FormGroup >
            <FormControlLabel
              control={ <Checkbox
                checked={ this.state.variants[index].value || false }
                onChange={ (_e, value) => this.handleExampleVariantChange(value, index) }
                value="checkedB"
                color="primary"
              /> }
              label={ title }
            />
          </FormGroup>
        </Grid>
      );
    })

  onChange = value => {
    try {
      this.setState({ parsedSchema: JSON.parse(value) });
    } catch (error) {
      console.warn('not a json', error);
    } finally {
      this.setState({ value });
    }

  }
  render () {
    const { value, parsedSchema, linkText, ContentText, activeMapper, component, openTooltip, variants, notFound } = this.state;
    if (!this.props.match.params.component) {
      return <Redirect to="/component-example/checkbox" />;
    }

    if (notFound) {
      return <Redirect to="/not-found" />;
    }

    const editedValue = value.replace(/^{\n {2}"fields": \[\n/, '')
    .replace(/ {2}\]\n}$/, '')
    .replace(/\n {4}/g, '\n')
    .replace(/ {2}"validate": \[\],\n/g, '')
    .replace(/ {4}/, '');

    return (
      <Grid
        container
        direction="row"
        spacing={ 4 }
      >
        <Grid item xs={ 12 } >
          <Typography variant="h4" gutterBottom>
            { linkText }
          </Typography>

        </Grid>
        <Grid item xs={ 4 } >
          <Typography variant="h5" gutterBottom>
              Schema
          </Typography>
        </Grid>
        <Grid item xs={ 3 } >
          <Typography variant="h5" gutterBottom>
              Props
          </Typography>
        </Grid>
        <Grid item xs={ 5 } >
          <Typography variant="h5" gutterBottom>
              Preview
          </Typography>
        </Grid>
        <Grid item xs={ 4 } >
          <div style={{ background: '#1d1f21', position: 'relative' }}>
            <Grid item xs={ 12 } container={ true } justify='flex-end' style={{ position: 'absolute', zIndex: 100 }}>
              <CopyToClipboard text={ editedValue } onCopy={ this.handleTooltipOpen }>
                <Button variant="outlined" color="secondary" style={{ margin: 10 }}>
                  Copy
                </Button>
              </CopyToClipboard>
              <CopySnackbar open={ openTooltip } handleClose={ this.handleTooltipClose } />
            </Grid>
            <CodeEditor
              readOnly
              mode="json"
              onChange={ this.onChange }
              editorProps={{ $blockScrolling: true }}
              value={ editedValue }
              fontSize={ 14 }
              showPrintMargin={ false }
              showGutter={ true }
              highlightActiveLine={ true }
              style={{ width: '100%' }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={ 3 }>
          <Card square>
            <CardContent>
              { this.renderActions(variants) }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 5 } >
          <Card square style={{ overflow: 'initial' }}>
            <div style={{ padding: 8 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Component mapper</FormLabel>
                <RadioGroup
                  aria-label="component-mapper"
                  name="component-mapper"
                  value={ activeMapper }
                  onChange={ this.handleMapperChange }
                  style={{ flexDirection: 'row' }}
                >
                  <FormControlLabel value="mui" control={ <Radio /> } label="MUI" />
                  <FormControlLabel value="pf3" control={ <Radio /> } label="PF3" />
                  <FormControlLabel value="pf4" control={ <Radio /> } label="PF4" />
                </RadioGroup>
              </FormControl>
            </div>
            <CardContent>
              <div className={ activeMapper }>
                <div style={{ paddingLeft: 8 }}>
                  <FormRenderer
                    { ...mapperVariants[activeMapper] }
                    schema={ parsedSchema }
                    onSubmit={ console.log }
                    showFormControls={ component !== 'wizard' }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 12 } >
          <Typography variant="h5" gutterBottom>
              Notes
          </Typography>
        </Grid>
        <Grid item xs={ 12 } >
          <ContentText activeMapper={ activeMapper } component={ component } />
        </Grid>
      </Grid>
    );
  }
}

ComponentExample.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      component: PropTypes.string,
    }),
  }),
};

export default withRouter(ComponentExample);
