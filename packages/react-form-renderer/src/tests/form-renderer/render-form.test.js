import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import renderForm from '../../form-renderer/render-form';
import RendererContext, { configureContext } from '../../form-renderer/renderer-context';
import { components, validators, layoutComponents } from '../../constants';
import FormRenderer from '../../form-renderer';

describe('renderForm function', () => {
  let layoutMapper;

  const ContextWrapper = ({ children, ...props }) => (
    <RendererContext.Provider value={ configureContext({
      ...props,
      formOptions: {
        renderForm,
        ...props.formOptions,
      }
    }) }>
      <Form onSubmit={ jest.fn() } mutators={{ ...arrayMutators }}>
        { () =>  children }
      </Form>
    </RendererContext.Provider>
  );

  beforeEach(() => {
    layoutMapper = {
      [layoutComponents.FORM_WRAPPER]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.BUTTON]: ({ label, ...rest }) =>  <button { ...rest }>{ label }</button>,
      [layoutComponents.COL]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.FORM_GROUP]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.ICON]: props => <div>Icon</div>,
      [layoutComponents.ARRAY_FIELD_WRAPPER]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.HELP_BLOCK]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.TITLE]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
    };
  });

  it('should render single field from defined componentTypes', () => {
    const formFields = [{
      component: components.TEXT_FIELD,
      name: 'foo',
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should correctly assign dataType validator if no additional validators given', () => {
    const formFields = [{
      component: components.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    const form = wrapper.find(Form);
    form.instance().form.change('foo', 1);
    expect(form.instance().state.state.errors.foo).toBe(('Field value has to be string'));
  });

  it('should correctly assign required validator with custom message', () => {
    const formFields = [{
      component: components.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
      validate: [{
        type: validators.REQUIRED,
        message: 'Bar',
      }],
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    const form = wrapper.find(Form);
    expect(form.instance().state.state.errors.foo).toBe(('Bar'));
  });

  it('should correctly assign function validator with custom message and fail', () => {
    const cannotBeOdd = value => value % 2 === 0 ? undefined : 'Odd';
    const formFields = [{
      component: components.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
      validate: [
        cannotBeOdd,
      ],
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    const form = wrapper.find(Form);
    expect(form.instance().state.state.errors.foo).toBe(('Odd'));
  });

  it('should correctly assign function validator with custom message and pass', () => {
    const cannotBeEven = value => value % 2 === 0 ? 'Even' : undefined;
    const formFields = [{
      component: components.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
      validate: [
        cannotBeEven,
      ],
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    const form = wrapper.find(Form);
    expect(form.instance().state.state.errors.foo).toBe((undefined));
  });

  it('should render single field from with custom componentType', () => {
    const formFields = [{
      component: 'custom-component',
      name: 'foo',
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render single field form with custom componentType and assign FieldProvider', () => {
    const formFields = [{
      component: 'custom-component',
      name: 'foo',
      assignFieldProvider: true,
    }];

    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => (
          <FieldProvider { ...props } render={ () => <div>Custom component</div> } />
        ),
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render array field', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      fields: [],
    }];

    const wrapper = mount(
      <ContextWrapper layoutMapper={ layoutMapper }>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should correctly assign array field validators', () => {
    const formFields = [{
      component: components.FIELD_ARRAY,
      name: 'foo',
      key: 'bar',
      validate: [{
        type: validators.REQUIRED,
      }, {
        type: validators.MIN_ITEMS_VALIDATOR,
        treshold: 3,
      }],
      fields: [{
        component: components.TEXT_FIELD,
        name: 'name',
        type: 'text',
      }],
    }];

    const wrapper = mount(
      <ContextWrapper
        layoutMapper={ layoutMapper }
        formFieldsMapper={{
          [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
        }}
      >
        { renderForm(formFields) }
      </ContextWrapper>
    );

    const form = wrapper.find(Form);
    form.instance().form.mutators.push('foo');
    expect(form.instance().state.state.errors.foo).toBeTruthy();
  });

  describe('#condition', ()=> {
    it('should render condition field only if the condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          is: 'fuzz',
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render condition field only if the condition is not met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          is: 'fuzz',
          notMatch: true,
        },
      }];

      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('bar', 'kar');
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render condition field only if the isNotEmpty condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          isNotEmpty: true,
        },
      }];

      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render condition field only if the isEmpty condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          isEmpty: true,
        },
      }];

      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('bar', '');
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render condition field only if the pattern condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          pattern: /fuzz/,
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('bar', 'foo fuzz foo');
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render condition field only if the pattern condition is not met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          pattern: /fuzz/,
          notMatch: true,
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('bar', 'foo fuuzz foo');
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('#clearOnUmount', () => {
    const formFields = (clearOnUnmount = undefined, component = 'custom-component') => ({
      fields: [{
        component,
        name: 'foo',
      }, {
        component,
        name: 'foocon',
        label: 'Label 1',
        key: 1,
        clearOnUnmount,
        condition: {
          when: 'foo',
          is: 'bar',
        },
      }, {
        component,
        name: 'foocon',
        label: 'Label 2',
        key: 2,
        clearOnUnmount,
        condition: {
          when: 'foo',
          is: 'barrr',
        },
      }],
    });

    const TextField = ({ input, meta, label, formOptions, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest }) => (
      <div>
        <label>{ label }</label>
        <input { ...input } { ...rest } />
        { meta.error && <div><span>{ meta.error }</span></div> }
      </div>
    );

    it('should clear values after unmount when set on fields', () => {
      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields(true) }
          onSubmit={ jest.fn() }
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toBe(undefined);
    });

    it('should clear values after unmount when set on form', () => {
      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields() }
          onSubmit={ jest.fn() }
          clearOnUnmount
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toBe(undefined);
    });

    it('should not clear values after unmount when not set', () => {
      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields() }
          onSubmit={ jest.fn() }
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
    });

    it('should not clear values after unmount when set in form and not in fields', () => {
      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields(false) }
          onSubmit={ jest.fn() }
          clearOnUnmount
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
    });

    it('should not clear values after unmount (default component)', () => {
      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(undefined, components.TEXT_FIELD) }
          onSubmit={ jest.fn() }
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
    });

    it('should clear values after unmount (default component)', () => {
      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(undefined, components.TEXT_FIELD) }
          onSubmit={ jest.fn() }
          clearOnUnmount
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.foocon).toEqual(undefined);
    });
  });
});
