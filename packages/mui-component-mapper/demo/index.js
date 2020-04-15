/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import Grid from '@material-ui/core/Grid';
import { componentMapper, FormTemplate } from '../src'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import demoSchema from '@data-driven-forms/common/src/demoschema';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });

const compositeMapper = {
    ...componentMapper,
    [componentTypes.SWITCH]: {
        component: componentMapper[componentTypes.SWITCH],
        FormControlLabelProps: {
            labelPlacement: 'end'
        }
    }
}
  

const App = () => (
    <ThemeProvider theme={ theme }>
        <Grid 
            container
            spacing={4}
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Typography variant="h3" >Material UI component mapper</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormRenderer
                    onSubmit={console.log}
                    componentMapper={compositeMapper}
                    FormTemplate={props => <FormTemplate {...props} />}
                    schema={demoSchema}
                    onCancel={() => console.log('canceling')}
                />
            </Grid>
        </Grid>
    </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
