import React from 'react';
import PropTypes from 'prop-types';

import { Tabs as CarbonTabs, Tab } from 'carbon-components-react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const Tabs = ({ fields, component, name, ...props }) => {
  const formOptions = useFormApi();

  return (
    <CarbonTabs {...props}>
      {fields.map(({ fields, name, label, title, ...rest }) => (
        <Tab {...rest} id={name} key={name} label={label || title}>
          {formOptions.renderForm(fields, formOptions)}
        </Tab>
      ))}
    </CarbonTabs>
  );
};

Tabs.propTypes = {
  component: PropTypes.string,
  name: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      fields: PropTypes.array,
      title: PropTypes.node,
      label: PropTypes.node
    })
  )
};

export default Tabs;
