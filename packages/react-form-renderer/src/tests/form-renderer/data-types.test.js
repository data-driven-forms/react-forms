import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormRenderer from '../../form-renderer';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../component-types';
import useFieldApi from '../../use-field-api';
import convertType from '../../use-field-api/convert-type';
import dataTypes from '../../data-types';

const DataTypeInput = (props) => {
  const { input, type, label } = useFieldApi(props);
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input type={type} id={input.name} {...input} />
    </div>
  );
};

describe('data types', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      FormTemplate: (props) => <FormTemplate {...props} />,
      componentMapper: {
        [componentTypes.TEXT_FIELD]: DataTypeInput,
      },
      schema: {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'data-type-text',
            label: 'Data type test',
            type: 'text',
            dataType: 'integer',
          },
        ],
      },
    };
  });

  it('should add integer data type validator and save interger to form state', async () => {
    const onSubmit = jest.fn();
    render(<FormRenderer {...initialProps} onSubmit={onSubmit} />);

    expect(screen.getByLabelText('Data type test')).toBeInTheDocument();
    /**
     * should not allow submit
     * validator should prevent submit if anything else than number is passed to the input
     */
    await userEvent.type(screen.getByLabelText('Data type test'), 'abc');

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();

    await userEvent.clear(screen.getByLabelText('Data type test'));

    await userEvent.type(screen.getByLabelText('Data type test'), '123');

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-type-text': 123,
      }),
      expect.anything(),
      expect.anything()
    );
  });

  describe('converTypes', () => {
    describe('integer', () => {
      it('converts empty string', () => {
        expect(convertType(dataTypes.INTEGER, '')).toEqual('');
      });

      it('converts zero', () => {
        expect(convertType(dataTypes.INTEGER, '0')).toEqual(0);
      });

      it('converts an integer', () => {
        expect(convertType(dataTypes.INTEGER, '12132')).toEqual(12132);
      });

      it('converts a string', () => {
        expect(convertType(dataTypes.INTEGER, 'abcd')).toEqual('abcd');
      });

      it('converts a negative integer', () => {
        expect(convertType(dataTypes.INTEGER, '-12132')).toEqual(-12132);
      });

      it('converts a floating number with nothing preceding decimal', () => {
        expect(convertType(dataTypes.FLOAT, '123.')).toEqual('123.');
      });

      it('converts a floating number', () => {
        expect(convertType(dataTypes.FLOAT, '123.0')).toEqual(123.0);
      });
    });
  });
});
