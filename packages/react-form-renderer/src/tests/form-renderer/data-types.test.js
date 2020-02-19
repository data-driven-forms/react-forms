import React from 'react';
import { mount } from 'enzyme';
import FormRenderer from '../../components/form-renderer';
import formTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../components/component-types';

const DataTypeInput = ({ input, dataType: _dataType, type, label }) => (
  <div>
    <label htmlFor={ input.name }>{ label }</label>
    <input type={ type } id={ input.name } { ...input } />
  </div>
);

const PropComponent = ({ FieldProvider, ...props }) => (
  <FieldProvider component={ DataTypeInput } { ...props } />
);

const RenderComponent = ({ FieldProvider, ...props }) => (
  <FieldProvider render={ renderProps => <DataTypeInput { ...renderProps } /> } { ...props } />
);

const ChildrenComponent = ({ FieldProvider, ...props }) => (
  <FieldProvider { ...props }>
    { props => <DataTypeInput { ...props } /> }
  </FieldProvider>
);

describe('data types', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      formTemplate,
      formFieldsMapper: {
        [componentTypes.TEXT_FIELD]: DataTypeInput,
        'prop-component': PropComponent,
        'render-component': RenderComponent,
        'children-component': ChildrenComponent,
      },
      schema: {
        fields: [{
          component: componentTypes.TEXT_FIELD,
          name: 'data-type-text',
          label: 'Data type test',
          type: 'text',
          dataType: 'integer',
        }],
      },
    };
  });

  it('should add integer data type validator and save interger to form state', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FormRenderer { ...initialProps } onSubmit={ onSubmit } />);
    expect(wrapper.find(DataTypeInput)).toHaveLength(1);
    const input = wrapper.find('input');
    /**
     * should not allow submit
     * validator should prevent submit if anything else than number is passed to the input
     */
    input.simulate('change', { target: { value: 'sadsad' }});
    wrapper.find('button').first().simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();

    input.simulate('change', { target: { value: '123' }});
    wrapper.update();

    wrapper.find('form').first().simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      'data-type-text': 123,
    }), expect.anything(), expect.anything());
  });

  it('should correctly add dataType to component which uses component prop', () => {
    const onSubmit = jest.fn();
    const propSchema = {
      fields: [{
        component: 'prop-component',
        name: 'data-type-text',
        label: 'Data type test',
        type: 'text',
        dataType: 'integer',
      }],
    };
    const wrapper = mount(<FormRenderer { ...initialProps } onSubmit={ onSubmit } schema={ propSchema } />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '123' }});
    wrapper.find('form').first().simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      'data-type-text': 123,
    }), expect.anything(), expect.anything());
  });

  it('should correctly add dataType to component which uses render prop', () => {
    const onSubmit = jest.fn();
    const renderSchema = {
      fields: [{
        component: 'render-component',
        name: 'data-type-text',
        label: 'Data type test',
        type: 'text',
        dataType: 'integer',
      }],
    };
    const wrapper = mount(<FormRenderer { ...initialProps } onSubmit={ onSubmit } schema={ renderSchema } />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '123' }});
    wrapper.find('form').first().simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      'data-type-text': 123,
    }), expect.anything(), expect.anything());
  });

  it('should correctly add dataType to component which uses children', () => {
    const onSubmit = jest.fn();
    const childSchema = {
      fields: [{
        component: 'children-component',
        name: 'data-type-text',
        label: 'Data type test',
        type: 'text',
        dataType: 'integer',
      }],
    };
    const wrapper = mount(<FormRenderer { ...initialProps } onSubmit={ onSubmit } schema={ childSchema } />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: '123' }});
    wrapper.find('form').first().simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      'data-type-text': 123,
    }), expect.anything(), expect.anything());
  });
});
