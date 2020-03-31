import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

export const docsLinks = {
  mui: 'https://material-ui.com/api/',
  pf4: 'http://patternfly-react.surge.sh/patternfly-4/components/',
  pf3: 'http://patternfly-react.surge.sh/patternfly-3/index.html'
};

const GenericMuiComponent = ({ activeMapper, component }) => {
  const originalComponent = component;
  if (activeMapper === 'pf4') {
    switch (component) {
      case 'date-picker':
        component = 'textinput';
        break;
      case 'select':
        component = 'select';
        break;
      case 'switch':
        component = 'switch';
        break;
      case 'textarea':
        component = 'textarea';
        break;
      case 'text-field':
        component = 'textinput';
        break;
      case 'time-picker':
        component = 'textinput';
        break;
      case 'checkbox-multiple':
        component = 'checkbox';
        break;
      default:
        break;
    }
  } else if (activeMapper === 'mui') {
    switch (component) {
      case 'date-picker':
        component = 'text-field';
        break;
      case 'select':
        component = 'select';
        break;
      case 'switch':
        component = 'switch';
        break;
      case 'textarea':
        component = 'text-field';
        break;
      case 'time-picker':
        component = 'text-field';
        break;
      case 'checkbox-multiple':
        component = 'checkbox';
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        This component also accepts all other original props, please see{' '}
        <a href={`${docsLinks[activeMapper]}${activeMapper === 'pf4' || activeMapper === 'mui' ? component : ''}`}>here</a>!
      </Typography>

      {activeMapper === 'mui'
        ? (originalComponent === 'date-picker' || originalComponent === 'time-picker') && (
            <Typography variant="body1">
              This component also use API from material-ui-pickers, please see{' '}
              <a href={`https://material-ui-pickers.firebaseapp.com/api/${originalComponent.replace('-', '')}`}>here</a>!
            </Typography>
          )
        : ''}
    </React.Fragment>
  );
};

GenericMuiComponent.propTypes = {
  activeMapper: PropTypes.string,
  component: PropTypes.string
};

export default GenericMuiComponent;
