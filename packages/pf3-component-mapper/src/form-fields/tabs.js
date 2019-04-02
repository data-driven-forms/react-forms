import React from 'react';
import PropTypes from 'prop-types';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

const renderTabHeader = items => items.map(({ title, key }, index) => <NavItem key={ key } eventKey={ index }>{ title }</NavItem>);
const renderTabContet = (items, formOptions) =>
  items.map(({ key, fields }, index) =>
    <TabPane key={ key } eventKey={ index } >{ formOptions.renderForm(fields, formOptions) }</TabPane>
  );

const FormTabs = ({ fields, formOptions }) => (
  <TabContainer id="basic-tabs-pf" defaultActiveKey={ 0 }>
    <div>
      <Nav bsClass="nav nav-tabs nav-tabs-pf">
        { renderTabHeader(fields) }
      </Nav>
      <TabContent animation>
        { renderTabContet(fields, formOptions) }
      </TabContent>
    </div>
  </TabContainer>
);

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.object.isRequired,
};

export default FormTabs;
