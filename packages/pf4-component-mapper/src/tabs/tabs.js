import React, { useState } from 'react';
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

export default FormTabs;
