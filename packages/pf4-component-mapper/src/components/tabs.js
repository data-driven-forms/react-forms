import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@patternfly/react-core/dist/js/components/Tabs/Tab';
import { Tabs } from '@patternfly/react-core/dist/js/components/Tabs/Tabs';

class FormTabs extends React.Component {
  state = {
    activeTabKey: 0
  };

  // Toggle currently active tab
  handleTabClick = (event, tabIndex) => {
    event.preventDefault();
    this.setState({
      activeTabKey: tabIndex
    });
  };

  renderTabItems = (fields, formOptions) =>
    fields.map(({ fields, title, name }, index) => (
      <Tab key={name} eventKey={index} title={title}>
        <div className="pf-c-form">{formOptions.renderForm(fields, formOptions)}</div>
      </Tab>
    ));

  render() {
    const { fields, formOptions, dataType, FieldProvider, validate, ...rest } = this.props;
    return (
      <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabClick} {...rest}>
        {this.renderTabItems(fields, formOptions)}
      </Tabs>
    );
  }
}

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    // not from props
    renderForm: PropTypes.func.isRequired
  }).isRequired,
  dataType: PropTypes.any,
  FieldProvider: PropTypes.any, // not form props
  validate: PropTypes.any
};

export default FormTabs;
