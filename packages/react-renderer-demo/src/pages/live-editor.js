/* eslint no-console: "off" */
import React, { useState } from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormBuilder from '@data-driven-forms/form-builder/form-builder';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { pickerMapper, propertiesMapper, builderMapper, BuilderTemplate, fieldProperties } from '@data-driven-forms/form-builder/mui-builder-mappers';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PanToolIcon from '@mui/icons-material/PanTool';
import PropTypes from 'prop-types';
import componentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import Alert from '@mui/material/Alert';

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
import Link from 'next/link';

const Root = styled('div')(({ theme }) => ({
  '& .builderWrapper': {
    width: '100%',
  },
  '& .builderControlsWrapper': {
    width: '100%',
  },
  '& .builderButton': {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
  '& .expansionPanel': {
    marginBottom: 8,
  },
  '& .editor': {
    width: '100%',
  },
}));

const StyledBox = styled(Box)(() => ({
  '&.emptyTarget': {
    height: '100%',
  },
}));

const EmptyTarget = () => (
  <StyledBox display="flex" justifyContent="center" alignItems="center" flexDirection="column" className={'emptyTarget'}>
    <Typography variant="h3" gutterBottom>
      There are no fields yet.
    </Typography>
    <Typography variant="h4">
      <PanToolIcon />
      &nbsp; You can add fields by dragging from the menu on the left.
    </Typography>
  </StyledBox>
);

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

const StyledClose = styled(IconButton)(({ theme }) => ({
  '& .close': {
    padding: theme.spacing(0.5),
  },
}));

const CopySnackbar = ({ open, handleClose }) => {
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
        <StyledClose key="close" aria-label="close" color="inherit" className={'close'} onClick={handleClose} size="large">
          <CloseIcon />
        </StyledClose>,
      ]}
    />
  );
};

CopySnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const LiveEditor = () => {
  const [openTooltip, setOpenTooltip] = useState(false);
  return (
    <Root>
      <Typography variant="h4" component="h1" gutterBottom>
        Form builder
      </Typography>
      <Alert severity="warning">
        This editor is no longer supported. Please check <Link href="/editor/pro-editor">Pro Editor</Link> instead.
      </Alert>
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
          <BuilderTemplate {...props} className={'builderWrapper'}>
            <Accordion className={'expansionPanel'}>
              <AccordionSummary>
                <Box display="flex" justifyContent="space-between" alignItems="center" className={'builderControlsWrapper'}>
                  <Typography>Click to preview schema</Typography>
                  <CopyToClipboard text={JSON.stringify(getSchema())} onCopy={() => setOpenTooltip(true)}>
                    <Button variant="contained" color="primary" className={'builderButton'} onClick={(event) => event.stopPropagation()}>
                      Copy schema
                    </Button>
                  </CopyToClipboard>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CodeEditor keepLastLine editorClassname={'editor'} value={JSON.stringify(getSchema(), null, 2)} />
              </AccordionDetails>
            </Accordion>
            <CopySnackbar open={openTooltip} handleClose={() => setOpenTooltip(false)} />
          </BuilderTemplate>
        )}
      />
    </Root>
  );
};

export default LiveEditor;
