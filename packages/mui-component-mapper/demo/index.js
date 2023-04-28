import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import Grid from '@mui/material/Grid';
import { componentMapper, FormTemplate } from '../src';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import demoSchema from '../../../shared/demoschema';
import fieldArraySchema from './demo-schemas/field-array-schema';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Button from '@mui/material/Button';
import wizardSchema from './demo-schemas/wizard-schema';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

const theme = createTheme();

const compositeMapper = {
  ...componentMapper,
  [componentTypes.SWITCH]: {
    component: componentMapper[componentTypes.SWITCH],
    FormControlLabelProps: {
      labelPlacement: 'end',
    },
  },
};

const options = [
  {
    label: 'One',
    value: 1,
  },
  {
    label: 'Two',
    value: 2,
  },
  {
    label: 'Three',
    value: 3,
  },
  {
    label: 'Four',
    value: 4,
  },
  {
    label: 'Five',
    value: 5,
  },
  {
    label: 'Six',
    value: 6,
  },
  {
    label: 'Seven',
    value: 7,
  },
  {
    label: 'Eight',
    value: 8,
  },
  {
    label: 'Nine',
    value: 9,
  },
  {
    label: 'Ten',
    value: 10,
  },
];

const loadOptions = (filter) =>
  new Promise((res) =>
    setTimeout(() => {
      console.log('filter', filter);
      if (filter && filter.length > 0) {
        return res(options.filter(({ label }) => label.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
      }

      return res(options.slice(0, 3));
    }, 1500)
  );

const selectSchema = {
  fields: [
    {
      name: 'searchable-async-select',
      component: componentTypes.SELECT,
      label: 'Searchable async select',
      loadOptions,
      isSearchable: true,
      isRequired: true,
      validate: [{ type: validatorTypes.REQUIRED }],
      closeMenuOnSelect: false,
    },
    {
      name: 'default-select',
      component: componentTypes.SELECT,
      label: 'Default select',
      options,
      placeholder: 'Select',
    },
    {
      name: 'disabled-select',
      component: componentTypes.SELECT,
      label: 'Disabled select',
      options,
      isDisabled: true,
    },
    {
      name: 'clearable-select',
      component: componentTypes.SELECT,
      label: 'Clearable select',
      options,
      isClearable: true,
    },
    {
      name: 'multi-select',
      component: componentTypes.SELECT,
      label: 'Multi select',
      options,
      isMulti: true,
    },
    {
      name: 'searchable-select',
      component: componentTypes.SELECT,
      label: 'Searchable select',
      options,
      isSearchable: true,
    },
    {
      name: 'async-select',
      component: componentTypes.SELECT,
      label: 'Async select',
      loadOptions,
    },
  ],
};

const App = () => {
  const [schema, setSchema] = useState(wizardSchema);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h3">Material UI component mapper</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => setSchema(demoSchema)}>Demo schema</Button>
              <Button onClick={() => setSchema(fieldArraySchema)}>Field array</Button>
              <Button onClick={() => setSchema(wizardSchema)}>Wizard</Button>
              <Button onClick={() => setSchema(selectSchema)}>Select</Button>
            </Grid>
            <FormRenderer
              onSubmit={console.log}
              componentMapper={compositeMapper}
              FormTemplate={(props) => <FormTemplate {...props} />}
              schema={schema}
              onCancel={() => console.log('canceling')}
            />
          </Grid>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
