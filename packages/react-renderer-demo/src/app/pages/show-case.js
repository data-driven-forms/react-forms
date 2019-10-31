import React, { useState, useContext } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { schema, uiSchema, conditionalSchema } from '../src/schemas/widget-schema';
import MiqSchema from '../src/schemas/miq-schema';
import wizardSchema from '../src/schemas/wizard-schema';

import MapperContext from '@docs/components/mappers-context';

const Forms = ({ mappers }) => {
  const [ activeMapper, setActiveMapper ] = useState({
    value: 'mui',
    mod: mappers.mui,
  });
  const [ activeSchema, setActiveSchema ] = useState('conditional');

  const handleMapperChange = (_event, value) => setActiveMapper({ value, mod: mappers[value], label: value });
  const handleSchemaChange = (_event, value) => setActiveSchema(value);

  const schemas = {
    miq: { schema: MiqSchema, uiSchema: {}, schemaType: 'miq' },
    conditional: { schema: conditionalSchema, uiSchema: {}, schemaType: 'mozilla' },
    widgets: { schema, uiSchema, schemaType: 'mozilla' },
    wizard: { schema: wizardSchema, uiSchema: {}, schemaType: 'default' },
  };
  return (
    <React.Fragment>
      <Grid item xs={ 2 }>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select form mapper</FormLabel>
          <RadioGroup
            aria-label="form-mapper"
            name="form-mapper"
            value={ activeMapper.value }
            onChange={ handleMapperChange }
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
            value={ activeSchema }
            onChange={ handleSchemaChange }
          >
            <FormControlLabel value="conditional" control={ <Radio /> } label="Conditional schema" />
            <FormControlLabel value="miq" control={ <Radio /> } label="Manageiq tab schema" />
            <FormControlLabel value="widgets" control={ <Radio /> } label="Widgets schema" />
            <FormControlLabel value="wizard" control={ <Radio /> } label="Wizard schema" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={ 10 }>
        <Paper>

          <div className={ activeMapper.value } style={{ padding: 16 }}>
            <FormRenderer
              layoutMapper={ mappers[activeMapper.value].layoutMapper }
              formFieldsMapper={ mappers[activeMapper.value].formFieldsMapper }
              { ...schemas[activeSchema] }
              onSubmit={ console.log }
              onCancel={ () => console.log('action canceled') }
              showFormControls={ activeSchema !== 'wizard' }
            />
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

const DemoForms = () =>  {
  const mappers = useContext(MapperContext);
  console.log(mappers);
  return (
    <Grid container direction="row" justify="space-evenly">
      <Grid item xs={ 12 }>
        <Typography gutterBottom variant="h5">React Form Renderer</Typography>
      </Grid>
      { mappers.loaded && <Forms mappers={ mappers.mappers } /> }
    </Grid>
  );
};

export default DemoForms;
