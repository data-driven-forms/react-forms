import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const renderTabHeader = items => items.map(({ title, key, name }) => <Tab key={ name } label={ title } />);
const renderTabContet = (tabs, formOptions, activeTab) => tabs.map(({ fields, name }, idx) => (
  <div key={ name } hidden={ idx !== activeTab }>{ formOptions.renderForm(fields, formOptions) }</div>
));

class FormTabs extends Component {
  state = {
    activeTab: 0,
  }

  handleTabChange = (event, tabIndex) => this.setState({ activeTab: tabIndex });

  render(){
    const { fields, formOptions } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={ activeTab } onChange={ this.handleTabChange }>
            { renderTabHeader(fields) }
          </Tabs>
        </AppBar>
        { renderTabContet(fields, formOptions, activeTab) }
      </div>
    );
  }
}

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.object.isRequired,
};

export default FormTabs;
