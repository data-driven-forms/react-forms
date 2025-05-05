import React from 'react';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Checkbox = ({ activeMapper, component }) => {
  try {
    const Text = require(`@docs/doc-components/examples-texts/${activeMapper}/${component}.md`)?.default || GenericMuiComponent;
    return <Text />;
  } catch (err) {
    return <GenericMuiComponent activeMapper={activeMapper} component={component} />;
  }
};

export default Checkbox;
