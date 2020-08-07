import React from 'react';
import ReactDOM from 'react-dom';

import FormStateManager from '../src/files/form-state-manager';
import TextField from '../src/tests/helpers/text-field';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormStateManager onSubmit={console.log}>
        {({ handleSubmit, ...state }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h1>There will be children</h1>
              <TextField label="Field 1" name="nested.field-1" id="field-1" type="text" />
              <TextField label="Field 2" name="field-2" id="field-2" type="text" />
              <div style={{ margin: 16 }}>
                <button type="submit">Submit</button>
              </div>
            </form>
          );
        }}
      </FormStateManager>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
