import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

export const docsLinks = {
  mui: 'https://material-ui.com/api/',
  pf4: 'https://patternfly-react.surge.sh/documentation/react/components/',
  pf3: 'https://patternfly-react-pf3.surge.sh/?path=/story/*'
};

const mapper = (activeMapper, component) =>
  ({
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
    }
  }[activeMapper][component] || component);

const GenericMuiComponent = ({ activeMapper, component }) => {
  const originalComponent = component;

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        This component also accepts all other original props, please see{' '}
        <a
          target="__blank"
          rel="noreferrer noopener"
          href={`${docsLinks[activeMapper]}${activeMapper === 'pf4' || activeMapper === 'mui' ? mapper(activeMapper, component) : ''}`}
        >
          here
        </a>
        !
      </Typography>

      {activeMapper === 'mui'
        ? (originalComponent === 'date-picker' || originalComponent === 'time-picker') && (
            <Typography variant="body1">
              This component also use API from material-ui-pickers, please see{' '}
              <a
                target="__blank"
                rel="noreferrer noopener"
                href={`https://material-ui-pickers.firebaseapp.com/api/${originalComponent.replace('-', '')}`}
              >
                here
              </a>
              !
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
