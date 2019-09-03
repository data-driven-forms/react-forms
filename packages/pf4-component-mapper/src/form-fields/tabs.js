import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@patternfly/react-core';

class FormTabs extends React.Component {
  state = {
    activeTabKey: 0,
  };

  // Toggle currently active tab
  handleTabClick = (event, tabIndex) => {
    event.preventDefault();
    this.setState({
      activeTabKey: tabIndex,
    });
  };

  renderTabItems = (fields, formOptions) => fields.map(({ key, fields, title, name }, index) => (
    <Tab key={ name || key } eventKey={ index } title={ title }>
      <div className='pf-c-form'>
        { formOptions.renderForm(fields, formOptions) }
      </div>
    </Tab>
  ));

  render() {
    const { fields, formOptions, dataType, FieldProvider, validate, ...rest } = this.props;
    return (
      <Tabs activeKey={ this.state.activeTabKey } onSelect={ this.handleTabClick } { ...rest }>
        { this.renderTabItems(fields, formOptions) }
      </Tabs>
    );
  }
}

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
  dataType: PropTypes.any,
  FieldProvider: PropTypes.any,
  validate: PropTypes.any,
};

export default FormTabs;
