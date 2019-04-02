import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

const renderTabHeader = items => items.map(({ title, key }) => <Tab key={ key } label={ title } />);
const renderTabContet = ({ key, fields }, formOptions) => <Fragment key={ key }>{ formOptions.renderForm(fields, formOptions) }</Fragment>;

class FormTabs extends Component {
  state = {
    activeTab: 0,
  }

  handleTabChange = (event, tabIndex) => this.setState({ activeTab: tabIndex });

  render(){
    const { fields, formOptions } = this.props;
    const { activeTab } = this.state;
    return (
      <Grid item xs={ 12 } container spacing={ 16 } style={{ paddingLeft: 0, paddingRight: 0 }}>
        <AppBar position="static">
          <Tabs value={ activeTab } onChange={ this.handleTabChange }>
            { renderTabHeader(fields) }
          </Tabs>
        </AppBar>
        { renderTabContet(fields[activeTab], formOptions) }
      </Grid>
    );
  }
}

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.object.isRequired,
};

export default FormTabs;
