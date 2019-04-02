import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { docs } from './documenation-pages';
import { otherExamples } from './other-pages';

class ComponentExample extends Component {
  constructor(props) {
    super(props);
    const allDocs = [ ...docs, ...otherExamples ];
    const docPages = allDocs.find(item => item.component === props.match.params.component);
    this.state = {
      ...docPages,
    };
  }

  componentDidUpdate({ match: { params: { component }}}){
    if (component !== this.props.match.params.component) {
      const allDocs = [ ...docs, ...otherExamples ];
      const docPages = allDocs.find(item => item.component === this.props.match.params.component);
      this.setState({
        ...docPages,
      });
    }
  }

  render () {
    const { linkText, contentText } = this.state;
    return (
      <Grid container spacing={ 16 } >
        <Grid item xs={ 12 } >
          <Typography variant="h4" gutterBottom >
            { linkText }
          </Typography>
        </Grid>
        <Grid item xs={ 12 } >
          { contentText }
        </Grid>
      </Grid>
    );
  }
}

ComponentExample.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      component: PropTypes.string,
    }),
  }),
};

export default withRouter(ComponentExample);
