import React, { useState } from 'react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Tab, Tabs, TabTitleText } from '@patternfly/react-core';
import { BaseFieldProps, TabsProps, TabField } from '../types';

const FormTabs: React.FC<BaseFieldProps<TabsProps>> = ({ fields, dataType, validate, component, ...rest }) => {
  const formOptions = useFormApi();
  const [activeTabKey, setActiveTabKey] = useState<number>(0);

  const handleTabClick = (event: React.MouseEvent<HTMLElement>, tabIndex: string | number) => {
    event.preventDefault();
    setActiveTabKey(typeof tabIndex === 'string' ? parseInt(tabIndex, 10) : tabIndex);
  };

  const renderTabItems = (fields: TabField[]) =>
    fields.map(({ fields, title, name }, index) => (
      <Tab key={name} eventKey={index} title={typeof title === 'string' ? <TabTitleText>{title}</TabTitleText> : title}>
        <div className="pf-c-form">{formOptions.renderForm(fields)}</div>
      </Tab>
    ));

  return (
    <Tabs activeKey={activeTabKey} onSelect={handleTabClick} {...rest}>
      {renderTabItems(fields)}
    </Tabs>
  );
};

export default FormTabs;
