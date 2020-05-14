import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

export const docsLinks = {
  mui: 'https://material-ui.com/api/',
  pf4: 'https://patternfly-react.surge.sh/documentation/react/components/',
  pf3: 'https://patternfly-react-pf3.surge.sh/?path=/story/*',
  blueprint: 'https://blueprintjs.com/docs/'
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
    'text-area': 'textarea'
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
  }
};

const mapper = (activeMapper, component) => (mapperLinks[activeMapper] && mapperLinks[activeMapper][component]) || component;

const GenericMuiComponent = ({ activeMapper = 'mui', component }) => (
  <React.Fragment>
    <Typography variant="body1" gutterBottom>
      This component also accepts all other original props, please see{' '}
      <a
        target="__blank"
        rel="noreferrer noopener"
        href={`${docsLinks[activeMapper]}${activeMapper !== 'pf3' ? mapper(activeMapper, component) : ''}`}
      >
        here
      </a>
      !
    </Typography>

    {activeMapper === 'mui'
      ? (component === 'date-picker' || component === 'time-picker') && (
          <Typography variant="body1">
            This component also use API from material-ui-pickers, please see{' '}
            <a target="__blank" rel="noreferrer noopener" href={`https://material-ui-pickers.firebaseapp.com/api/${component.replace('-', '')}`}>
              here
            </a>
            !
          </Typography>
        )
      : ''}
  </React.Fragment>
);

GenericMuiComponent.propTypes = {
  activeMapper: PropTypes.string,
  component: PropTypes.string
};

export default GenericMuiComponent;
