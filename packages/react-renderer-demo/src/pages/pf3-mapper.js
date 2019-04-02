import React from 'react';
import { Button, ButtonGroup } from 'patternfly-react';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { uiArraySchema, arraySchema, schema, uiSchema, conditionalSchema } from '../demo-data/widget-schema';
import miqSchema from '../demo-data/miq-schema';
import Spinner from '../components/spinner';
class Pf3Mapper extends React.Component {
  constructor(props) {
    super(props);
    const cssId = 'pf3css';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
      let head  = document.getElementsByTagName('head')[0];
      let link  = document.createElement('link');
      link.id   = cssId;
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = '/vendor.css';
      link.media = 'all';
      link.onload = () => this.setState({ isLoaded: true });
      head.appendChild(link);
    }

    this.state = {
      isLoaded: false,
      cssId,
      schema: miqSchema,
      schemaString: 'miq',
      ui: uiArraySchema,
    };
  }
  componentWillUnmount(){
    const pf3LinkTag = document.getElementById(this.state.cssId);
    pf3LinkTag.parentNode.removeChild(pf3LinkTag);
  }
  render() {
    if (!this.state.isLoaded) {
      return <Spinner />;
    }

    return (
      <div style={{ widht: '100%' }}>
        <div style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <h1>Pf3 component mapper</h1>
          <ButtonGroup style={{ marginBottom: 20, marginTop: 20 }}>
            <Button onClick={ () => this.setState(state => ({ schema: arraySchema, schemaString: 'mozilla', ui: uiArraySchema })) }>arraySchema</Button>
            <Button onClick={ () => this.setState(state => ({ schema, schemaString: 'mozilla', ui: uiSchema })) }>schema</Button>
            <Button onClick={ () => this.setState(state => ({ schema: miqSchema, schemaString: 'miq' })) }>miq</Button>
            <Button onClick={ () => this.setState(state => ({ schema: conditionalSchema, schemaString: 'mozilla', ui: uiSchema })) }>conditional</Button>
          </ButtonGroup>
          <FormRenderer
            onSubmit={ console.log }
            schemaType={ this.state.schemaString }
            formFieldsMapper={ formFieldsMapper }
            layoutMapper={ layoutMapper }
            schema={ this.state.schema }
            uiSchema={ this.state.ui }
          />
        </div>
      </div>
    );
  }
}

export default Pf3Mapper;
