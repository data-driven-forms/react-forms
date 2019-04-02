import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import renderForm from '../../form-renderer/render-form';
import RendererContext, { configureContext } from '../../form-renderer/renderer-context';
import { components } from '../../constants';
import FormRenderer from '../../form-renderer';
import layoutMapper from '../../../demo/layout-mapper';

describe('renderForm function', () => {
  let formFieldsMapper;

  const ContextWrapper = ({ initialValues = {}, ...rest }) => (
    <FormRenderer
      formFieldsMapper={ formFieldsMapper }
      layoutMapper={ layoutMapper }
      initialValues={ initialValues }
      onSubmit={ jest.fn() }
      { ...rest }
    />
  );

  beforeEach(() => {
    formFieldsMapper = {
      [components.TEXT_FIELD]: () => <div className="nested-item">Text field</div>,
    };
  });

  it('should render array field correctly', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      fields: [{
        component: components.TEXT_FIELD,
        name: 'nested component',
        label: 'foo',
      }],
    }];

    const wrapper = mount(
      <ContextWrapper schema={{ fields: formFields }}/>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add nested field to form', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      fields: [{
        component: components.TEXT_FIELD,
        name: 'nested component',
        label: 'foo',
      }],
    }];

    const wrapper = mount(
      <ContextWrapper schema={{ fields: formFields }} />
    );

    expect(wrapper.find(Form).instance().form.getState().values.foo).toBeUndefined();
    wrapper.find('button').first().simulate('click');
    wrapper.update();
    expect(wrapper.find(Form).instance().form.getState().values.foo).toHaveLength(1);
  });

  it('should remove nested field to form', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      fields: [{
        component: components.TEXT_FIELD,
        name: 'nested component',
        label: 'foo',
      }],
    }];

    const wrapper = mount(
      <ContextWrapper initialValues={{ foo: [ 'first value' ]}} schema={{ fields: formFields }}/>
    );
    expect(wrapper.find(Form).instance().form.getState().values.foo).toHaveLength(1);
    wrapper.find('button').first().simulate('click');
    wrapper.update();
    expect(wrapper.find(Form).instance().form.getState().values.foo).toBeUndefined();
  });

  it('should render fixed array field correctly', () => {
    const formFields = [{
      component: components.FIXED_LIST,
      name: 'foo',
      key: 'bar',
      title: 'Title',
      description: 'description',
      fields: [{
        component: components.TEXT_FIELD,
        name: 'nested component',
        label: 'foo',
      }],
      additionalItems: {
        key: 1,
        name: 'foo',
        component: components.TEXT_FIELD,
        fields: [],
      },
    }];

    const wrapper = mount(
      <ContextWrapper schema={{ fields: formFields }}/>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should extract dynamic field name if its in dot notation', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      title: 'Title',
      description: 'description',
      fields: [{
        component: components.TEXT_FIELD,
        name: 'name.nested-component',
        label: 'foo',
      }],
    }];

    const wrapper = mount(
      <ContextWrapper initialValues={{ foo: [{ name: 'bar'  }]}} schema={{ fields: formFields }}/>
    );
    expect(wrapper.find({ name: 'foo[0]nested-component' })).toBeTruthy();
  });

  it('should extract dynamic field name if it contains items prefix', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      title: 'Title',
      description: 'description',
      fields: [{
        component: components.TEXT_FIELD,
        name: 'items.nested-component',
        label: 'foo',
      }],
    }];

    const wrapper = mount(
      <ContextWrapper initialValues={{ foo: [{ name: 'bar'  }]  }} schema={{ fields: formFields }}/>
    );
    expect(wrapper.find({ name: 'foo[0]nested-component' })).toBeTruthy();
  });
});
