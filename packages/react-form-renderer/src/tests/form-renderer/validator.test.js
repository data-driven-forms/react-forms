import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import FormRenderer from '../../form-renderer';
import componentTypes from '../../component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../use-field-api';

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

  const VALUE = 'some-value';
  const NAME = 'field1';

  it('pass value, allvalues, meta to custom validator func', async () => {
    expect.assertions(3);

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

  describe('warning validators', () => {
    const TextFieldWarning = (props) => {
      const { input, meta, ...rest } = useFieldApi(props);
      return (
        <div>
          <input {...input} {...rest} />
          {meta.warning && <div id="warning">{meta.warning}</div>}
        </div>
      );
    };

    let wrapper;

    it('should not convert object validator to warning when warnings are not used', async () => {
      await act(async () => {
        wrapper = mount(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning
            }}
            schema={{
              fields: [{ component: 'text-field', name: NAME, validate: [{ type: 'required', warning: true }] }]
            }}
            onSubmit={jest.fn()}
          />
        );
      });
      wrapper.update();

      expect(wrapper.find('#warning')).toHaveLength(0);
    });

    it('should convert object validator to warning', async () => {
      await act(async () => {
        wrapper = mount(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning
            }}
            schema={{
              fields: [{ useWarnings: true, component: 'text-field', name: NAME, validate: [{ type: 'required', warning: true }] }]
            }}
            onSubmit={jest.fn()}
          />
        );
      });
      wrapper.update();

      expect(wrapper.find('#warning').text()).toEqual('Required');
    });

    it('should convert function validator to warning', async () => {
      const ERROR = 'SOME-ERROR';

      const customValidator = () => ({ type: 'warning', error: ERROR });

      await act(async () => {
        wrapper = mount(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning
            }}
            schema={{
              fields: [{ useWarnings: true, component: 'text-field', name: NAME, validate: [customValidator] }]
            }}
            onSubmit={jest.fn()}
          />
        );
      });
      wrapper.update();

      expect(wrapper.find('#warning').text()).toEqual(ERROR);
    });

    it('should convert async function validator to warning', async () => {
      const ERROR = 'SOME-ERROR';

      const customValidator = () => new Promise((res, rej) => setTimeout(() => rej({ type: 'warning', error: ERROR })));

      await act(async () => {
        wrapper = mount(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning
            }}
            schema={{
              fields: [{ useWarnings: true, component: 'text-field', name: NAME, validate: [customValidator] }]
            }}
            onSubmit={jest.fn()}
          />
        );
      });
      wrapper.update();

      expect(wrapper.find('#warning').text()).toEqual(ERROR);
    });
  });
});
