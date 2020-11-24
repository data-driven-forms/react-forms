import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

export const docsLinks = {
  mui: 'https://material-ui.com/api/',
  pf4: 'https://patternfly-react.surge.sh/documentation/react/components/',
  pf3: 'https://patternfly-react-pf3.surge.sh/?path=/story/*',
  blueprint: 'https://blueprintjs.com/docs/',
  suir: 'https://react.semantic-ui.com/',
  ant: 'https://ant.design/components/',
  carbon: 'https://react.carbondesignsystem.com/?path=/story/'
};

const mapperLinks = {
  pf4: {
    'date-picker': 'textintput',
    'text-field': 'textinput',
    'time-picker': 'textinput',
    'checkbox-multiple': 'checkbox'
  },
  mui: {
    'date-picker': 'text-field',
    'text-field': 'text-field',
    'time-picker': 'text-field',
    'checkbox-multiple': 'checkbox',
    'text-area': 'textarea',
    'plain-text': 'typography'
  },
  blueprint: {
    [componentTypes.TEXT_FIELD]: '#core/components/text-inputs',
    [componentTypes.FIELD_ARRAY]: '',
    [componentTypes.CHECKBOX]: '#core/components/checkbox',
    [componentTypes.SUB_FORM]: '',
    [componentTypes.RADIO]: '#core/components/radio',
    [componentTypes.TABS]: '#core/components/tabs',
    [componentTypes.DATE_PICKER]: '#datetime/datepicker',
    [componentTypes.TIME_PICKER]: '#datetime/timepicker',
    [componentTypes.WIZARD]: '',
    [componentTypes.SWITCH]: '#core/components/switch',
    [componentTypes.TEXTAREA]: '#core/components/text-inputs.text-area',
    [componentTypes.SELECT]: '#select',
    [componentTypes.PLAIN_TEXT]: '#core/components/text',
    [componentTypes.BUTTON]: '#core/components/button',
    [componentTypes.DUAL_LIST_SELECT]: '',
    [componentTypes.SLIDER]: '#core/components/sliders'
  },
  ant: {
    [componentTypes.TEXT_FIELD]: 'input',
    [componentTypes.CHECKBOX]: 'checkbox',
    [componentTypes.SUB_FORM]: '',
    [componentTypes.RADIO]: 'radio/#RadioGroup',
    [componentTypes.TABS]: 'tabs',
    [componentTypes.DATE_PICKER]: 'date-picker',
    [componentTypes.TIME_PICKER]: 'time-picker',
    [componentTypes.WIZARD]: '',
    [componentTypes.SWITCH]: 'switch',
    [componentTypes.TEXTAREA]: 'input/#Input.TextArea',
    [componentTypes.SELECT]: 'select',
    [componentTypes.PLAIN_TEXT]: 'typography/#Typography.Paragraph',
    [componentTypes.BUTTON]: 'button',
    [componentTypes.DUAL_LIST_SELECT]: 'transfer',
    [componentTypes.SLIDER]: 'slider'
  },
  carbon: {
    [componentTypes.TEXT_FIELD]: 'textinput',
    [componentTypes.CHECKBOX]: 'checkbox',
    [componentTypes.SUB_FORM]: '',
    [componentTypes.RADIO]: 'radiobutton',
    [componentTypes.TABS]: 'tabs',
    [componentTypes.DATE_PICKER]: 'datepicker',
    [componentTypes.TIME_PICKER]: 'timepicker',
    [componentTypes.WIZARD]: 'progressindicator',
    [componentTypes.SWITCH]: 'toggle',
    [componentTypes.TEXTAREA]: 'textarea',
    [componentTypes.SELECT]: 'select',
    [componentTypes.PLAIN_TEXT]: '',
    [componentTypes.BUTTON]: 'button',
    [componentTypes.DUAL_LIST_SELECT]: 'transfer',
    [componentTypes.SLIDER]: 'slider'
  }
};

const mapper = (activeMapper, component) => (mapperLinks[activeMapper] && mapperLinks[activeMapper][component]) || component;

const GenericMuiComponent = ({ activeMapper = 'mui', component }) => (
  <Typography variant="body1" gutterBottom>
    This component also accepts all other original props, please see{' '}
    <a target="__blank" rel="noreferrer noopener" href={`${docsLinks[activeMapper]}${activeMapper !== 'pf3' ? mapper(activeMapper, component) : ''}`}>
      here
    </a>
    !
  </Typography>
);

GenericMuiComponent.propTypes = {
  activeMapper: PropTypes.string,
  component: PropTypes.string
};

export default GenericMuiComponent;
