import React, { Component } from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/mui-component-mapper';
import { formFieldsMapper as pf3FormFieldsMapper, layoutMapper as pf3LayoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { formFieldsMapper as pf4FormFieldsMapper, layoutMapper as pf4LayoutMapper } from '@data-driven-forms/pf4-component-mapper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { schema, uiSchema, conditionalSchema } from '../../demo-data/widget-schema';
import MiqSchema from '../../demo-data/miq-schema';
import wizardSchema from '../../demo-data/wizard-schema';
import MuiWizzard from '../demo-missing-fields/mui-wizzard/wizzard';

class DemoForms extends Component {
  state = {
    mappers: {
      mui: { formFieldsMapper: { ...formFieldsMapper, [componentTypes.WIZARD]: MuiWizzard, summary: () => <div>Mui summary</div>  }, layoutMapper },
      pf3: {
        formFieldsMapper: {
          ...pf3FormFieldsMapper,
          summary: () => <div>Pf3 summary</div>,
        },
        layoutMapper: pf3LayoutMapper,
      },
      pf4: { formFieldsMapper: { ...pf4FormFieldsMapper, summary: () => <div>Pf4 summary</div> }, layoutMapper: pf4LayoutMapper },
    },
    activeMapper: 'mui',
    schemas: {
      miq: { schema: MiqSchema, uiSchema: {}, schemaType: 'miq' },
      conditional: { schema: conditionalSchema, uiSchema: {}, schemaType: 'mozilla' },
      widgets: { schema, uiSchema, schemaType: 'mozilla' },
      wizard: { schema: wizardSchema, uiSchema: {}, schemaType: 'default' },
    },
    activeSchema: 'conditional',
  }

  handleMapperChange = (_event, value) => this.setState({ activeMapper: value });
  handleSchemaChange = (_event, value) => this.setState({ activeSchema: value });
  render() {
    return (
      <Grid container spacing={ 16 }>
        <Grid item xs={ 2 }>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select form mapper</FormLabel>
            <RadioGroup
              aria-label="form-mapper"
              name="form-mapper"
              value={ this.state.activeMapper }
              onChange={ this.handleMapperChange }
            >
              <FormControlLabel value="mui" control={ <Radio /> } label="Material UI" />
              <FormControlLabel value="pf3" control={ <Radio /> } label="Patternfly 3" />
              <FormControlLabel value="pf4" control={ <Radio /> } label="Patternfly 4" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Select form schema</FormLabel>
            <RadioGroup
              aria-label="form-schema"
              name="form-schema"
              value={ this.state.activeSchema }
              onChange={ this.handleSchemaChange }
            >
              <FormControlLabel value="conditional" control={ <Radio /> } label="Conditional schema" />
              <FormControlLabel value="miq" control={ <Radio /> } label="Manageiq tab schema" />
              <FormControlLabel value="widgets" control={ <Radio /> } label="Widgets schema" />
              <FormControlLabel value="wizard" control={ <Radio /> } label="Wizard schema" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={ 10 }>
          <div className={ this.state.activeMapper } style={{ padding: 16 }}>
            <FormRenderer
              { ...this.state.mappers[this.state.activeMapper] }
              { ...this.state.schemas[this.state.activeSchema] }
              onSubmit={ console.log }
              onCancel={ () => console.log('action canceled') }
              showFormControls={ this.state.activeSchema !== 'wizard' }
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default DemoForms;
