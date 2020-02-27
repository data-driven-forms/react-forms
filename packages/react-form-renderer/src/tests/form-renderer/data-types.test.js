import React from 'react';
import { mount } from 'enzyme';
import FormRenderer from '../../components/form-renderer';
import formTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../components/component-types';
import useFieldApi from '../../hooks/use-field-api';

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
      formTemplate,
      formFieldsMapper: {
        [componentTypes.TEXT_FIELD]: DataTypeInput,
      },
      schema: {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'data-type-text',
            label: 'Data type test',
            type: 'text',
            dataType: 'integer'
          }
        ]
      }
    };
  });

  it('should add integer data type validator and save interger to form state', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FormRenderer {...initialProps} onSubmit={onSubmit} />);
    expect(wrapper.find(DataTypeInput)).toHaveLength(1);
    const input = wrapper.find('input');
    /**
     * should not allow submit
     * validator should prevent submit if anything else than number is passed to the input
     */
    input.simulate('change', { target: { value: 'sadsad' }});
    wrapper
    .find('button')
    .first()
    .simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();

    input.simulate('change', { target: { value: '123' }});
    wrapper.update();

    wrapper
    .find('form')
    .first()
    .simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-type-text': 123
      }),
      expect.anything(),
      expect.anything()
    );
  });
});
