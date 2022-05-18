import React from 'react';
import ReactDOM from 'react-dom';

import TextField from '../src/tests/helpers/text-field';
import FormStateManager from '../src/form-state-manager';
import FormSpy from '../src/form-spy';
import { Validator } from '../src/validate';
import useField from '../use-field';

const asyncValidator: Validator = (value) => new Promise((res, rej) => setTimeout(() => (value === 'foo' ? rej('No async foo') : res(undefined)), 1000));
// const asyncValidator1: Validator = (value) => new Promise((res, rej) => setTimeout(() => (value === 'foo' ? rej('No async foo') : res()), 3000));


const Field = (props: any) => {
  const { input, id, ...rest } = useField(props);
  return <input id={id} {...input} {...rest} />;
};

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormStateManager onSubmit={console.log} subscription={{values: true}}>
          {({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <TextField label="pepa" name="one" id="one" type="text" placeholder="one" />
                <TextField label="pep1a" name="two" id="two" type="text" placeholder="two" />
                <button type="submit">Submit</button>
              </form>
            );
          }}
      </FormStateManager>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
