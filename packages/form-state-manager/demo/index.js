import React from 'react';
import ReactDOM from 'react-dom';
import FormStateManager from '../src/files/form-state-manager';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormStateManager />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
