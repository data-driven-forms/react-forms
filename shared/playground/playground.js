import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';

import availableSchema from './schemas';

/* TODO:
    - each demo file will use different FormTemplate, ComponentMapper
    - optional: each demo should customize the playground components to its design system
    (for example, MUI should be able to use MUI select for the schema selection, etc. )
*/
const Playground = ({ FormTemplate }) => {
  /* TODO:
    - this is just a hint how you can use useState hook
    - find more about hooks
    - DO NOT USE CLASS COMPONENTS
    */
  const [selectedSchema, setSchema] = useState();

  return (
    <div>
      {/* TODO:
        - here should be schema selection where users can switch between different schemas
      */}
      <select></select>
      {/* TODO:
        - pass correct props to FormRenderer
        - store the form state so the values will be preserved on refresh
        (look in ddf documentation for a FormRenderer prop that is called on each formState update
        look for 'localStorage' )
        - the state should be also clearable so add some button to do it
      */}
      <FormRenderer FormTemplate={FormTemplate} />
    </div>
  );
};

/* TODO:
    - add types for each prop you add
*/
Playground.propTypes = {
  FormTemplate: PropTypes.elementType
};

export default Playground;
