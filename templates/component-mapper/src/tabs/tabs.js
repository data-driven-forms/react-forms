import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const Tabs = ({ fields }) => {
  const formOptions = useFormApi();

  return fields.map((tab) => (
    <div key={tab.name}>
      <h2>{tab.title}</h2>
      {formOptions.renderForm(tab.fields, formOptions)}
    </div>
  ));
};

Tabs.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      fields: PropTypes.array,
      title: PropTypes.node
    })
  )
};

export default Tabs;
