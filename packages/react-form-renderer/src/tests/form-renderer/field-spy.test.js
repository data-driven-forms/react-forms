import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../component-types';
import useFieldApi from '../../use-field-api';
import FormRenderer from '../../form-renderer';

import FieldSpy from '../../field-spy';

const TextField = (props) => {
  const { input, placeholder } = useFieldApi(props);
  return <input aria-label={input.name} placeholder={placeholder} {...input} />;
};

describe('field-spy test', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      FormTemplate,
      componentMapper: {
        [componentTypes.TEXT_FIELD]: TextField,
      },
      onSubmit: () => {},
    };
  });

  it('should re-render child on eligible field change', async () => {
    const onChangeFn = jest.fn();
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
        },
        {
          component: 'listener',
          name: 'listener',
        },
      ],
    };

    render(
      <FormRenderer
        {...initialProps}
        schema={schema}
        componentMapper={{
          ...initialProps.componentMapper,
          listener: () => (
            <FieldSpy fields={['field-1']}>
              {() => {
                onChangeFn();
                return <></>;
              }}
            </FieldSpy>
          ),
        }}
      />
    );
    expect(onChangeFn).toBeCalledTimes(1);
    await userEvent.type(screen.getByLabelText('field-1'), 's');
    expect(onChangeFn).toBeCalledTimes(2);
  });

  it('should not re-render child on ineligible field change', async () => {
    const onChangeFn = jest.fn();
    const schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
        },
        {
          component: 'listener',
          name: 'listener',
        },
      ],
    };

    render(
      <FormRenderer
        {...initialProps}
        schema={schema}
        componentMapper={{
          ...initialProps.componentMapper,
          listener: () => (
            <FieldSpy fields={['field-2']}>
              {() => {
                onChangeFn();
                return <></>;
              }}
            </FieldSpy>
          ),
        }}
      />
    );
    expect(onChangeFn).toBeCalledTimes(1);
    await userEvent.type(screen.getByLabelText('field-1'), 's');
    expect(onChangeFn).toBeCalledTimes(1);
  });
});
