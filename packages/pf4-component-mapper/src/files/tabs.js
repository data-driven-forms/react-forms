import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Tab, Tabs, TabTitleText } from '@patternfly/react-core';

const FormTabs = ({ fields, dataType, validate, component, ...rest }) => {
  const formOptions = useFormApi();
  const [activeTabKey, setActiveTabKey] = useState(0);

  const handleTabClick = (event, tabIndex) => {
    event.preventDefault();
    setActiveTabKey(tabIndex);
  };

  const renderTabItems = (fields) =>
    fields.map(({ fields, title, name }, index) => (
      <Tab key={name} eventKey={index} title={typeof title === 'string' ? <TabTitleText>{title}</TabTitleText> : title}>
        <div className="pf-c-form">{formOptions.renderForm(fields, formOptions)}</div>
      </Tab>
    ));

  return (
    <Tabs activeKey={activeTabKey} onSelect={handleTabClick} {...rest}>
      {renderTabItems(fields, formOptions)}
    </Tabs>
  );
};

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  dataType: PropTypes.any,
  validate: PropTypes.any,
  component: PropTypes.any
};

export default FormTabs;
