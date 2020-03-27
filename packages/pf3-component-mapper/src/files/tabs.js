import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { TabContainer, Nav, NavItem, TabContent, TabPane, Icon } from 'patternfly-react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import './tabs.scss';

const renderTabHeader = (items, formOptions) =>
  items.map(({ title, name, validateFields = [] }, index) => {
    const errors = formOptions.getState().errors;
    const hasError = validateFields.find((name) => !!get(errors, name));
    return (
      <NavItem key={name} eventKey={index}>
        {hasError && <Icon classnName="ddorg__pf3-layout-components__tabs__error" type="fa" name="exclamation-circle" />}
        {title}
      </NavItem>
    );
  });

const renderTabContent = (items, formOptions) =>
  items.map(({ name, fields }, index) => (
    <TabPane key={name} eventKey={index}>
      {formOptions.renderForm(fields, formOptions)}
    </TabPane>
  ));

const FormTabs = ({ fields }) => {
  const formOptions = useFormApi();

  return (
    <TabContainer id="basic-tabs-pf" defaultActiveKey={0}>
      <div>
        <Nav bsClass="nav nav-tabs">{renderTabHeader(fields, formOptions)}</Nav>
        <TabContent animation>{renderTabContent(fields, formOptions)}</TabContent>
      </div>
    </TabContainer>
  );
};

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired
};

export default FormTabs;
