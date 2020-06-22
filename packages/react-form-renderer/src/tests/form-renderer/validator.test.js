import React from 'react';
import { mount } from 'enzyme';

import FormRenderer from '../../files/form-renderer';
import componentTypes from '../../files/component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../files/use-field-api';
import { act } from 'react-dom/test-utils';

describe('FormRenderer validator', () => {
  const TextField = (props) => {
    const { input, meta, ...rest } = useFieldApi(props);
    return (
      <div>
        <input {...input} {...rest} />
        {meta.error && <div id="error">{meta.error}</div>}
      </div>
    );
  };

  it('pass value, allvalues, meta to custom validator func', async () => {
    expect.assertions(3);

    const VALUE = 'some-value';
    const NAME = 'field1';
    const META = expect.any(Object);

    const validator = (value, allValues, meta) => {
      if (value) {
        //skip initial validation
        expect(value).toEqual(VALUE);
        expect(allValues).toEqual({
          other: '111',
          [NAME]: VALUE
        });
        expect(meta).toEqual(META);
      }
    };

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField
        }}
        schema={{
          fields: [{ component: 'text-field', name: NAME, validate: [validator] }]
        }}
        onSubmit={jest.fn()}
        initialValues={{ other: '111' }}
      />
    );

    await act(async () => {
      wrapper.find('input').simulate('change', { target: { value: VALUE } });
    });
  });
});
