import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';
import { Title, Button, Toolbar, ToolbarGroup } from '@patternfly/react-core';
import { uiArraySchema, arraySchema, schema, uiSchema, conditionalSchema } from '../demo-data/widget-schema';
import wizardSchema from '../demo-data/wizard-schema';
import miqSchema from '../demo-data/miq-schema';
import Spinner from '../components/spinner';

const Summary = props => <div>Custom summary component.</div>;
class Pf4Mapper extends React.Component {
  constructor(props) {
    super(props);
    const cssId = 'pf4css';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
      let head  = document.getElementsByTagName('head')[0];
      let link  = document.createElement('link');
      link.id   = cssId;
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = '/vendor4.css';
      link.media = 'all';
      link.onload = () => this.setState({ isLoaded: true });
      head.appendChild(link);
    }

    this.state = {
      isLoaded: false,
      cssId,
      schema: wizardSchema,
      schemaString: 'default',
      ui: uiArraySchema,
      additionalOptions: { showFormControls: false },
    };
  }
  componentWillUnmount(){
    const pf4LinkTag = document.getElementById(this.state.cssId);
    pf4LinkTag.parentNode.removeChild(pf4LinkTag);
  }
  render() {
    if (!this.state.isLoaded) {
      return <Spinner />;
    }

    return (
      <div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <Title size="4xl">Pf4 component mapper</Title>
          <Toolbar style={{ marginBottom: 20, marginTop: 20 }}>
            <ToolbarGroup>
              <Button onClick={ () => this.setState(state => ({ schema: wizardSchema, schemaString: 'default', additionalOptions: { showFormControls: false }})) }>Wizard</Button>
            </ToolbarGroup>
            <ToolbarGroup>
              <Button onClick={ () => this.setState(state => ({ schema: arraySchema, schemaString: 'mozilla', ui: uiArraySchema, additionalOptions: {}})) }>arraySchema</Button>
            </ToolbarGroup>
            <ToolbarGroup>
              <Button onClick={ () => this.setState(state => ({ schema, schemaString: 'mozilla', ui: uiSchema, additionalOptions: {}})) }>schema</Button>
            </ToolbarGroup>
            <ToolbarGroup>
              <Button onClick={ () => this.setState(state => ({ schema: miqSchema, schemaString: 'miq', additionalOptions: {}})) }>miq</Button>
            </ToolbarGroup>
            <ToolbarGroup>
              <Button onClick={ () => this.setState(state => ({ schema: conditionalSchema, schemaString: 'mozilla', ui: uiSchema, additionalOptions: {}})) }>conditional</Button>
            </ToolbarGroup>
          </Toolbar>
          <FormRenderer
            onSubmit={ console.log }
            onCancel={ () => console.log('Cancel action') }
            schemaType={ this.state.schemaString }
            formFieldsMapper={{
              ...formFieldsMapper,
              summary: Summary,
            }}
            layoutMapper={ layoutMapper }
            schema={ this.state.schema }
            uiSchema={ this.state.ui }
            { ...this.state.additionalOptions }
          />
        </div>
      </div>
    );
  }
}

export default Pf4Mapper;
