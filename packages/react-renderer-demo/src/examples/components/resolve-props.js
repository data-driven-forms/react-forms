import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      label: 'Validate me',
      isRequired: true,
      validate: [{ type: 'required' }],
      helperText: 'This field will indicate successful validation after onBlur event',
      resolveProps: (props, { meta, input }, formOptions) => {
        if (meta.valid && meta.touched) {
          return {
            helperText: 'Validated',
            style: {
              background: 'greenyellow'
            }
          };
        }

        return {};
      }
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const ResolveProps = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default ResolveProps;
