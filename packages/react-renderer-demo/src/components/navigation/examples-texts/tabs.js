import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { docsLinks } from './generic-mui-component';

export default ({ activeMapper }) =>
  <Fragment>
    { activeMapper === 'pf4' &&
      <Typography variant='body1' gutterBottom>
      This component also accepts all other original props, please see <a
          href={ `${docsLinks[activeMapper]}/tabs` }>
      here</a>!
      </Typography> }
    <Typography variant="body1">
  For using this component, you have to append TabItem component (containing form fields) to fields property.
    </Typography>
    <Typography variant="h6" gutterBottom>
    Component constant
    </Typography>
    <pre>TAB_ITEM</pre> <Typography variant="body1">as an import from componentTypes</Typography>
    <pre>tab-item</pre> <Typography variant="body1">as a string</Typography>
    { activeMapper === 'pf3' &&
    (
      <Fragment>
        <Typography variant="h6" gutterBottom>
        Validation
        </Typography>
        <Typography variant="body1">Because of schema flexibility there is no simple and efficient way to signal invalid tab content.</Typography>
        <Typography variant="body1">
          If you want to add some visual feedback for this case, please specify field names to <strong>validateFields</strong> attribute.
        </Typography>
      </Fragment>
    ) }

  </Fragment>;
