import React from 'react';
import Typography from '@material-ui/core/Typography';

export const docsLinks = {
  mui: 'https://material-ui.com/api/',
  pf4: 'http://patternfly-react.surge.sh/patternfly-4/components/',
  pf3: 'http://patternfly-react.surge.sh/patternfly-3/index.html',
};

export default ({ activeMapper, component }) => {
  const originalComponent = component;
  if (activeMapper === 'pf4'){
    switch (component){
      case 'date-picker':
        component = 'textinput';
        break;
      case 'select-field':
        component = 'select';
        break;
      case 'switch-field':
        component = 'switch';
        break;
      case 'textarea-field':
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
    }
  } else if (activeMapper === 'mui'){
    switch (component){
      case 'date-picker':
        component = 'text-field';
        break;
      case 'select-field':
        component = 'select';
        break;
      case 'switch-field':
        component = 'switch';
        break;
      case 'textarea-field':
        component = 'text-field';
        break;
      case 'time-picker':
        component = 'text-field';
        break;
      case 'checkbox-multiple':
        component = 'checkbox';
        break;
    }
  }

  return <React.Fragment>
    <Typography variant='body1' gutterBottom>
    This component also accepts all other original props, please see <a
        href={ `${docsLinks[activeMapper]}${ activeMapper === 'pf4' || activeMapper === 'mui' ? component : '' }` }>
    here</a>!
    </Typography>

    { activeMapper === 'mui' ?
      (originalComponent === 'date-picker' || originalComponent === 'time-picker') &&
      <Typography variant='body1'>
      This component also use API from material-ui-pickers, please see <a
          href={ `https://material-ui-pickers.firebaseapp.com/api/${originalComponent.replace('-', '')}` }>
      here</a>!
      </Typography>
      : '' }
  </React.Fragment>;};
