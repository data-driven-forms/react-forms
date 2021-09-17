/* eslint no-console: "off" */
import React, { useState } from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormBuilder from '@data-driven-forms/form-builder/form-builder';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { pickerMapper, propertiesMapper, builderMapper, BuilderTemplate, fieldProperties } from '@data-driven-forms/form-builder/mui-builder-mappers';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PanToolIcon from '@material-ui/icons/PanTool';
import PropTypes from 'prop-types';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';

import CodeEditor from '../components/code-editor';
import {
  ALL_TO_LEFT,
  ALL_TO_RIGHT,
  CHECKBOX_VARIANT,
  FILTER_OPTIONS_TEXT,
  FILTER_OPTIONS_TITLE,
  FILTER_VALUE_TEXT,
  FILTER_VALUE_TITLE,
  LEFT_TITLE,
  MAX,
  MIN,
  NO_OPTIONS_TITLE,
  NO_VALUE_TITLE,
  RIGHT_TITLE,
  STEP,
} from '../helpers/field-properties';

const useStyles = makeStyles((theme) => ({
  builderWrapper: {
    width: '100%',
  },
  close: {
    padding: theme.spacing(0.5),
  },
  builderControlsWrapper: {
    width: '100%',
  },
  builderButton: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
  expansionPanel: {
    marginBottom: 8,
  },
  emptyTarget: {
    height: '100%',
  },
  editor: {
    width: '100%',
  },
}));

const EmptyTarget = () => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={classes.emptyTarget}>
      <Typography variant="h3" gutterBottom>
        There are no fields yet.
      </Typography>
      <Typography variant="h4">
        <PanToolIcon />
        &nbsp; You can add fields by dragging from the menu on the left.
      </Typography>
    </Box>
  );
};

const reducedMapper = {
  ...builderMapper,
  [componentTypes.DATE_PICKER]: undefined,
  'sub-form': undefined,
  EmptyTarget,
};

const componentProperties = {
  [componentTypes.TEXT_FIELD]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.HELPER_TEXT,
      fieldProperties.PLACEHOLDER,
      fieldProperties.INPUT_TYPE,
      fieldProperties.IS_DISABLED,
      fieldProperties.IS_READ_ONLY,
      fieldProperties.HIDE_FIELD,
    ],
  },
  [componentTypes.CHECKBOX]: {
    attributes: [fieldProperties.LABEL, fieldProperties.IS_DISABLED, fieldProperties.OPTIONS, fieldProperties.HIDE_FIELD],
  },
  [componentTypes.SELECT]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.OPTIONS,
      fieldProperties.IS_DISABLED,
      fieldProperties.PLACEHOLDER,
      fieldProperties.HELPER_TEXT,
      fieldProperties.HIDE_FIELD,
    ],
  },
  [componentTypes.PLAIN_TEXT]: { attributes: [fieldProperties.MULTI_LINE_LABEL] },
  [componentTypes.RADIO]: { attributes: [fieldProperties.LABEL, fieldProperties.IS_DISABLED, fieldProperties.OPTIONS, fieldProperties.HIDE_FIELD] },
  [componentTypes.SWITCH]: {
    attributes: [fieldProperties.LABEL, fieldProperties.IS_READ_ONLY, fieldProperties.IS_DISABLED, fieldProperties.HIDE_FIELD],
  },
  [componentTypes.TEXTAREA]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.HELPER_TEXT,
      fieldProperties.IS_READ_ONLY,
      fieldProperties.IS_DISABLED,
      fieldProperties.HIDE_FIELD,
    ],
  },
  [componentTypes.SLIDER]: {
    attributes: [fieldProperties.LABEL, fieldProperties.HELPER_TEXT, fieldProperties.DESCRIPTION, fieldProperties.HIDE_FIELD, MIN, MAX, STEP],
  },
  [componentTypes.DUAL_LIST_SELECT]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.HELPER_TEXT,
      fieldProperties.DESCRIPTION,
      fieldProperties.OPTIONS,
      fieldProperties.HIDE_FIELD,
      LEFT_TITLE,
      RIGHT_TITLE,
      ALL_TO_LEFT,
      ALL_TO_RIGHT,
      NO_VALUE_TITLE,
      NO_OPTIONS_TITLE,
      FILTER_OPTIONS_TITLE,
      FILTER_VALUE_TITLE,
      FILTER_VALUE_TEXT,
      FILTER_OPTIONS_TEXT,
      CHECKBOX_VARIANT,
    ],
  },
};

const CopySnackbar = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={<span>Form schema was copied to clipboard</span>}
      action={[
        <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

CopySnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const LiveEditor = () => {
  const classes = useStyles();
  const [openTooltip, setOpenTooltip] = useState(false);
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Form builder
      </Typography>
      <FormBuilder
        builderMapper={reducedMapper}
        pickerMapper={pickerMapper}
        componentProperties={componentProperties}
        componentMapper={componentMapper}
        propertiesMapper={propertiesMapper}
        cloneWhileDragging
        disableDrag={false}
        disableAdd={false}
        mode="subset"
        debug={false}
        render={({ isValid, getSchema, ...props }) => (
          <BuilderTemplate {...props} className={classes.builderWrapper}>
            <Accordion className={classes.expansionPanel}>
              <AccordionSummary>
                <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.builderControlsWrapper}>
                  <Typography>Click to preview schema</Typography>
                  <CopyToClipboard text={JSON.stringify(getSchema())} onCopy={() => setOpenTooltip(true)}>
                    <Button variant="contained" color="primary" className={classes.builderButton} onClick={(event) => event.stopPropagation()}>
                      Copy schema
                    </Button>
                  </CopyToClipboard>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CodeEditor keepLastLine editorClassname={classes.editor} value={JSON.stringify(getSchema(), null, 2)} />
              </AccordionDetails>
            </Accordion>
            <CopySnackbar open={openTooltip} handleClose={() => setOpenTooltip(false)} />
          </BuilderTemplate>
        )}
      />
    </div>
  );
};

export default LiveEditor;
