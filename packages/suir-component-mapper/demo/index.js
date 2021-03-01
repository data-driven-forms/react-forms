import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import { componentMapper, FormTemplate } from '../src';
import demoSchema from '@data-driven-forms/common/demoschema';
import fieldArraySchema from './demo-schemas/field-array-schema';
import dualListSchema from './demo-schemas/dual-list-select-schema';
import wizardSchema from './demo-schemas/wizard-schema';
import { Button } from 'semantic-ui-react';

const compositeMapper = {
  ...componentMapper,
  [componentTypes.SWITCH]: {
    component: componentMapper[componentTypes.SWITCH]
  }
};

const App = () => {
  const [schema, setSchema] = useState(wizardSchema);

  return (
    <div>
      <div>
        <div>
          <h3>SUIR component mapper</h3>
        </div>
        <div>
          <Button onClick={() => setSchema(demoSchema)}>Demo schema</Button>
          <Button onClick={() => setSchema(fieldArraySchema)}>Field array</Button>
          <Button onClick={() => setSchema(wizardSchema)}>Wizard</Button>
          <Button onClick={() => setSchema(dualListSchema)}>Dual list</Button>
        </div>
        <div style={{ padding: 32 }}>
          <FormRenderer
            onSubmit={console.log}
            componentMapper={compositeMapper}
            FormTemplate={(props) => <FormTemplate {...props} showFormControls={true} />}
            schema={schema}
            onCancel={() => console.log('canceling')}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
