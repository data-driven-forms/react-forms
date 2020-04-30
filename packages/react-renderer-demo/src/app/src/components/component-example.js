import React, { useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import RouterLink from 'next/link';
import Link from '@material-ui/core/Link';

import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';

import dynamic from 'next/dynamic';

const CodeEditor = dynamic(import('@docs/components/code-editor'), {
  ssr: false
});

const Summary = ({ title }) => <div>{title}</div>;
Summary.propTypes = {
  title: PropTypes.node.isRequired
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

const PropsActions = ({ variants, handleExampleVariantChange }) =>
  variants.length === 0 ? (
    <Typography variant="h6">No props</Typography>
  ) : (
    variants.sort(comparator).map(({ name, options, title, component }, index) => {
      if (options) {
        return (
          <Grid item xs={12} key={name}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor={name}>{title}</InputLabel>
                <Select
                  value={variants[index].value || ''}
                  onChange={({ target: { value } }) => handleExampleVariantChange(value, index)}
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
              value={variants[index].value || ''}
              onChange={({ target: { value } }) => handleExampleVariantChange(value, index)}
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
              value={variants[index].value || ''}
              onChange={({ target: { value } }) => handleExampleVariantChange(value, index)}
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
                  checked={variants[index].value || false}
                  onChange={(_e, value) => handleExampleVariantChange(value, index)}
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

PropsActions.propTypes = {
  variants: PropTypes.array.isRequired,
  handleExampleVariantChange: PropTypes.func.isRequired
};

const variantChange = (prevState, value, index) => {
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
};

const componentExampleReducer = (state, action) => {
  switch (action.type) {
    case 'setValue':
      return { ...state, value: action.payload };
    case 'setParsedSchema':
      return { ...state, parsedSchema: action.payload };
    case 'exampleVariantChange':
      return { ...state, ...variantChange(state, action.payload.value, action.payload.index) };
    default:
      break;
  }
};

const ComponentExample = ({ baseStructure, activeMapper, componentMapper, component, ...props }) => {
  const [{ value, variants, parsedSchema }, dispatch] = useReducer(componentExampleReducer, {
    value: JSON.stringify(baseStructure.value, null, 2),
    parsedSchema: baseStructure.value,
    variants: baseStructure.variants
  });
  const [openTooltip, setOpenTooltip] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const editedValue = value
    .replace(/^{\n {2}"fields": \[\n/, '')
    .replace(/ {2}\]\n}$/, '')
    .replace(/\n {4}/g, '\n')
    .replace(/ {2}"validate": \[\],\n/g, '')
    .replace(/ {4}/, '');

  const onChange = (value) => {
    try {
      dispatch({ type: 'setParsedSchema', payload: JSON.parse(value) });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('not a json', error);
    } finally {
      dispatch({ type: 'setValue', payload: value });
    }
  };

  const handleExampleVariantChange = (value, index) => dispatch({ type: 'exampleVariantChange', payload: { value, index } });

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
            <CopyToClipboard text={editedValue} onCopy={() => setOpenTooltip(true)}>
              <Button variant="outlined" color="secondary" style={{ margin: 10 }}>
                Copy
              </Button>
            </CopyToClipboard>
            <CopySnackbar open={openTooltip} handleClose={() => setOpenTooltip(false)} />
          </Grid>
          <CodeEditor
            readOnly
            mode="json"
            onChange={onChange}
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
          <CardContent>
            <PropsActions variants={variants} handleExampleVariantChange={handleExampleVariantChange} />
          </CardContent>
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
              <RadioGroup aria-label="component-mapper" name="component-mapper" value={activeMapper} style={{ flexDirection: 'row' }}>
                <RouterLink href={`${router.pathname}?mapper=mui`}>
                  <Link href={`${router.pathname}?mapper=mui`} className={classes.radioLink}>
                    <FormControlLabel value="mui" control={<Radio />} label="MUI" />
                  </Link>
                </RouterLink>
                <RouterLink href={`${router.pathname}?mapper=pf3`}>
                  <Link href={`${router.pathname}?mapper=pf3`} className={classes.radioLink}>
                    <FormControlLabel value="pf3" control={<Radio />} label="PF3" />
                  </Link>
                </RouterLink>
                <RouterLink href={`${router.pathname}?mapper=pf4`}>
                  <Link href={`${router.pathname}?mapper=pf4`} className={classes.radioLink}>
                    <FormControlLabel value="pf4" control={<Radio />} label="PF4" />
                  </Link>
                </RouterLink>
              </RadioGroup>
            </FormControl>

            <CardContent>
              <div className={activeMapper}>
                <div style={{ paddingLeft: 8 }}>
                  <Grid container xs={12} spacing={4}>
                    <FormRenderer
                      componentMapper={componentMapper}
                      schema={parsedSchema}
                      onSubmit={console.log /* eslint-disable-line no-console */}
                      FormTemplate={(props) => <FormTemplate {...props} showFormControls={component !== 'wizard'} />}
                    />
                  </Grid>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
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
