import React from 'react';
import PropTypes from 'prop-types';
import { TabContainer, Nav, NavItem, TabContent, TabPane, Icon } from 'patternfly-react';

const renderTabHeader = (items, formOptions) => items.map(({ title, key, validateFields = []}, index) => {
  const errors = formOptions.getState().errors;
  const hasError = validateFields.find(name => !!errors[name]);
  return (
    <NavItem key={ key } eventKey={ index }>
      { hasError && <Icon style={{ marginRight: 8, color: '#CC0000' }} type="fa" name="exclamation-circle" /> }
      { title }
    </NavItem>
  );
});
const renderTabContent = (items, formOptions) =>
  items.map(({ key, fields }, index) =>
    <TabPane key={ key } eventKey={ index } >{ formOptions.renderForm(fields, formOptions) }</TabPane>);

const FormTabs = ({ fields, formOptions }) => (
  <TabContainer id="basic-tabs-pf" defaultActiveKey={ 0 }>
    <div>
      <Nav bsClass="nav nav-tabs">
        { renderTabHeader(fields, formOptions) }
      </Nav>
      <TabContent animation>
        { renderTabContent(fields, formOptions) }
      </TabContent>
    </div>
  </TabContainer>
);

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.object.isRequired,
};

export default FormTabs;
