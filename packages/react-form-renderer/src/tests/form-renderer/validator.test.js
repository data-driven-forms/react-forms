import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormRenderer from '../../form-renderer';
import componentTypes from '../../component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../use-field-api';

describe('FormRenderer validator', () => {
  const TextField = (props) => {
    const { input, meta, ...rest } = useFieldApi(props);
    return (
      <div>
        <input {...input} {...rest} aria-label={props.name} />
        {meta.error && <div id="error">{meta.error}</div>}
      </div>
    );
  };

  const VALUE = 'some-value';
  const NAME = 'field1';

  it('pass value, allvalues, meta to custom validator func', async () => {
    expect.assertions(3);

    const META = expect.any(Object);

    const validator = (value, allValues, meta) => {
      if (value === VALUE) {
        //skip initial validation
        expect(value).toEqual(VALUE);
        expect(allValues).toEqual({
          other: '111',
          [NAME]: VALUE,
        });
        expect(meta).toEqual(META);
      }
    };

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField,
        }}
        schema={{
          fields: [{ component: 'text-field', name: NAME, validate: [validator] }],
        }}
        onSubmit={jest.fn()}
        initialValues={{ other: '111' }}
      />
    );

    await userEvent.type(screen.getByLabelText(NAME), VALUE);
  });
});
