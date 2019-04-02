/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';

import Grid from '@material-ui/core/Grid';
import { formFieldsMapper, layoutMapper } from '../src'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import sandbox from './demo-schemas/sandbox';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });
  

const App = () => (
    <MuiThemeProvider theme={ theme }>
        <Grid 
            container
            spacing={16}
            justify="center"
            alignItems="center"
        >
            <Grid item xs={8}>
                <Typography variant="h3" >Material UI component mapper</Typography>
            </Grid>
            <Grid item xs={8}>
                <FormRenderer
                    onSubmit={console.log}
                    formFieldsMapper={formFieldsMapper}
                    layoutMapper={layoutMapper}
                    schema={sandbox}
                    onCancel={() => console.log('canceling')}
                />
            </Grid>
        </Grid>
    </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
