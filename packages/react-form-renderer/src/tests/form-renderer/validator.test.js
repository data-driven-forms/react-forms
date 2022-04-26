import React from 'react';
import { render, screen, act } from '@testing-library/react';
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

  describe('warning validators', () => {
    const TextFieldWarning = (props) => {
      const { input, meta, ...rest } = useFieldApi(props);
      return (
        <div>
          <input {...input} {...rest} />
          {meta.warning && <div aria-label="warning">{meta.warning}</div>}
        </div>
      );
    };

    it('should not convert object validator to warning when warnings are not used', async () => {
      render(
        <FormRenderer
          FormTemplate={FormTemplate}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextFieldWarning,
          }}
          schema={{
            fields: [{ component: 'text-field', name: NAME, validate: [{ type: 'required', warning: true }] }],
          }}
          onSubmit={jest.fn()}
        />
      );

      expect(() => screen.getByLabelText('warning')).toThrow();
    });

    it('should convert object validator to warning', async () => {
      await act(async () => {
        render(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning,
            }}
            schema={{
              fields: [{ useWarnings: true, component: 'text-field', name: NAME, validate: [{ type: 'required', warning: true }] }],
            }}
            onSubmit={jest.fn()}
          />
        );
      });

      expect(screen.getByText('Required')).toBeInTheDocument();
    });

    it('should convert function validator to warning', async () => {
      const ERROR = 'SOME-ERROR';

      const customValidator = () => ({ type: 'warning', error: ERROR });

      await act(async () => {
        render(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning,
            }}
            schema={{
              fields: [{ useWarnings: true, component: 'text-field', name: NAME, validate: [customValidator] }],
            }}
            onSubmit={jest.fn()}
          />
        );
      });

      expect(screen.getByText(ERROR)).toBeInTheDocument();
    });

    it('should convert async function validator to warning', async () => {
      const ERROR = 'SOME-ERROR';

      const customValidator = () => new Promise((res, rej) => setTimeout(() => rej({ type: 'warning', error: ERROR })));

      await act(async () => {
        render(
          <FormRenderer
            FormTemplate={FormTemplate}
            componentMapper={{
              [componentTypes.TEXT_FIELD]: TextFieldWarning,
            }}
            schema={{
              fields: [{ useWarnings: true, component: 'text-field', name: NAME, validate: [customValidator] }],
            }}
            onSubmit={jest.fn()}
          />
        );
      });

      expect(screen.getByText(ERROR)).toBeInTheDocument();
    });
  });
});
