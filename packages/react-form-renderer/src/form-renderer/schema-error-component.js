import React from 'react';
import PropTypes from 'prop-types';

const SchemaErrorComponent = ({ name, message }) => (
  <div style={{
    padding: 5,
    border: '1px solid #bbb',
    borderCollapse: 'collapse',
    borderRadius: 2,
  }}>
    <h1 style={{ fontSize: 24, marginBottom: 5 }}>Form could not be rendered, because of invalid form schema.</h1>
    <h2 style={{ fontSize: 20, marginBottom: 5 }}>{ name }:</h2>
    <p style={{ marginBottom: 5 }}>{ message }</p>
    <p>If you don't know what this error means, please contact site administrator.</p>
  </div>
);

SchemaErrorComponent.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default SchemaErrorComponent;
