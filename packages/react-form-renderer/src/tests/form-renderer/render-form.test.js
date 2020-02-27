import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import renderForm from '../../form-renderer/render-form';
import RendererContext from '../../form-renderer/renderer-context';
import { components, validators, layoutComponents } from '../../constants';
import FormRenderer from '../../form-renderer';
import { componentTypes } from '../..';

describe('renderForm function', () => {
  let layoutMapper;
  let CustomComponent;

  const ContextWrapper = ({ children, ...props }) => (
    <RendererContext.Provider value={{
      ...props,
      formOptions: {
        renderForm,
        ...props.formOptions,
      },
    }}>
      <Form onSubmit={ jest.fn() } mutators={{ ...arrayMutators }}>
        { () =>  children }
      </Form>
    </RendererContext.Provider>
  );

  beforeEach(() => {
    layoutMapper = {
      [layoutComponents.FORM_WRAPPER]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.BUTTON]: ({ label, ...rest }) =>  <button { ...rest }>{ label }</button>,
      [layoutComponents.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.TITLE]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
    };
    CustomComponent = ({ FieldProvider, dataType, formOptions, ...props }) => <div { ...props }>Custom component</div>;
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

  it('should render single field (array in array) from defined componentTypes', () => {
    const formFields = [ [{
      component: components.TEXT_FIELD,
      name: 'foo',
    }] ];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [components.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <h1 { ...props }>TextField</h1>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );

    expect(wrapper.find('h1')).toHaveLength(1);
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
        'custom-component': CustomComponent,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(CustomComponent)).toHaveLength(1);
  });

  it('should render single field form with custom componentType and assign FieldProvider', () => {
    const formFields = [{
      component: 'custom-component',
      name: 'foo',
    }];

    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        'custom-component': CustomComponent,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(wrapper.find(CustomComponent)).toHaveLength(1);
    expect(wrapper.find(CustomComponent).props().FieldProvider).toEqual(expect.any(Function));
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
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
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
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find(Form).instance().form.change('bar', 'kar');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
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
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
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
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find(Form).instance().form.change('bar', 'sdsad');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('bar', '');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
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
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if the pattern condition is met (string)', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          pattern: 'fuzz',
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if the pattern condition is met (string with flags)', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: 'bar',
          pattern: 'fuzz',
          flags: 'i',
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('bar', 'fUzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
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
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find(Form).instance().form.change('bar', 'foo fuuzz foo');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find(Form).instance().form.change('bar', 'fuzz');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
    });

    it('should render condition field only if one of depency fields has correct value', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: [ 'a', 'b' ],
          is: 'x',
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('a', 'x');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
      wrapper.find(Form).instance().form.change('a', undefined);
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
      wrapper.find(Form).instance().form.change('b', 'x');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if contition is array and passes all validations', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: [{
          when: [ 'a', 'b' ],
          is: 'x',
        }, {
          when: 'c',
          pattern: /fuzz/,
        }],
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );
      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find(Form).instance().form.change('a', 'x');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
      wrapper.find(Form).instance().form.change('a', undefined);
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
      wrapper.find(Form).instance().form.change('c', 'something fuzz is great');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
      wrapper.find(Form).instance().form.change('a', 'x');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if the condition with nested name is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo.bar',
        condition: {
          when: 'foo.bar',
          is: 'fuzz',
        },
      }];

      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );

      expect(wrapper.find(CustomComponent)).toHaveLength(0);

      wrapper.find(Form).instance().form.change('foo.bar', 'fuzz');
      wrapper.update();

      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if one of depency fields has correct value - nested name', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: [ 'nested.a', 'b' ],
          is: 'x',
        },
      }];
      const wrapper = mount(
        <ContextWrapper formFieldsMapper={{
          'custom-component': CustomComponent,
        }}>
          { renderForm(formFields) }
        </ContextWrapper>
      );

      wrapper.find(Form).instance().form.change('nested.a', 'x');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
      wrapper.find(Form).instance().form.change('nested.a', undefined);
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(0);
      wrapper.find(Form).instance().form.change('b', 'x');
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });
  });

  describe('#clearOnUmount', () => {
    const formFields = (clearOnUnmount = undefined, component = 'custom-component') => ({
      fields: [{
        component,
        name: 'foo',
      }, {
        component,
        name: 'unmnounted',
        label: 'Label 1',
        clearOnUnmount,
        condition: {
          when: 'foo',
          is: 'bar',
        },
      }, {
        component,
        name: 'unmnounted',
        label: 'Label 2',
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
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toBe(undefined);
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
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toBe(undefined);
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
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
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
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
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
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
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
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual('foovalue');
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      expect(wrapper.find(Form).instance().form.getState().values.unmnounted).toEqual(undefined);
    });
  });

  describe('#formSpy', () => {
    const TextField = ({ input, meta, label, formOptions, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest }) => (
      <div>
        <label>{ label }</label>
        <input { ...input } { ...rest } />
        { meta.error && <div><span>{ meta.error }</span></div> }
      </div>
    );

    it('should add formSpy and call update function on each state change', () => {
      const onStateUpdate = jest.fn();
      const wrapper = mount(
        <FormRenderer
          onStateUpdate={ onStateUpdate }
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={{ fields: [{ component: components.TEXT_FIELD, name: 'foo', label: 'bar' }]}}
          onSubmit={ jest.fn() }
          clearOnUnmount
        />
      );
      /**
       * there is one FormSpy for form controls
       */
      expect(wrapper.find(FormSpy)).toHaveLength(2);
      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      expect(onStateUpdate).toHaveBeenCalledTimes(4);
    });
  });

  describe('#initializeOnMount', () => {
    const SHOWER_FIELD = 'shower_FIELD';
    const INITIALIZED_FIELD = 'initialized_FIELD';
    const SHOW_VALUE = 'show';

    const INITIAL_VALUE = 'some initial value';
    const SHOWER_FIELD_INDEX = 0;
    const INITIALIZED_FIELD_INDEX = 1;
    const NEW_VALUE = 'something different';
    const NOT_SHOW_VALUE = 'bla';
    const SCHEMA_INITIAL_VALUE = 'schema initial value';

    const formFields = (initializeOnMount = false, initialValue) => ({
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: SHOWER_FIELD,
      }, {
        component: componentTypes.TEXT_FIELD,
        name: INITIALIZED_FIELD,
        initializeOnMount,
        initialValue,
        condition: {
          when: SHOWER_FIELD,
          is: SHOW_VALUE,
        },
      }],
    });

    const TextField = ({ input, meta, formOptions, ...rest }) => (
      <div>
        <input { ...input } { ...rest } />
      </div>
    );

    const updateInput = (wrapper, position, value) => {
      wrapper.find('input').at(position).simulate('change', { target: { value }});
      wrapper.update();
    };

    const getFormValue = (wrapper, name) =>
      wrapper.find(Form).instance().form.getState().values[name];

    const mountInitializedField = (wrapper) => updateInput(wrapper, SHOWER_FIELD_INDEX, SHOW_VALUE);
    const unmountInitializedField = (wrapper) => updateInput(wrapper, SHOWER_FIELD_INDEX, NOT_SHOW_VALUE);
    const setInitializedToNewValue = (wrapper) => updateInput(wrapper, INITIALIZED_FIELD_INDEX, NEW_VALUE);
    const expectNewValue = (wrapper) => expect(getFormValue(wrapper, INITIALIZED_FIELD)).toEqual(NEW_VALUE);
    const expectInitialValue = (wrapper) => expect(getFormValue(wrapper, INITIALIZED_FIELD)).toEqual(INITIAL_VALUE);
    const expectSchemaInitialValue = (wrapper) => expect(getFormValue(wrapper, INITIALIZED_FIELD)).toEqual(SCHEMA_INITIAL_VALUE);

    it('should reset value after mount when set on fields', () => {
      const SET_INITIALIZE_ON_MOUNT = true;

      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(SET_INITIALIZE_ON_MOUNT) }
          onSubmit={ jest.fn() }
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      expectInitialValue(wrapper);

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);

      expectNewValue(wrapper);

      unmountInitializedField(wrapper);
      expectNewValue(wrapper);

      mountInitializedField(wrapper);
      expectInitialValue(wrapper);
    });

    it('should not reset value after mount when set on fields', () => {
      const UNSET_INITIALIZE_ON_MOUNT = false;

      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(UNSET_INITIALIZE_ON_MOUNT) }
          onSubmit={ jest.fn() }
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      expectInitialValue(wrapper);

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);

      expectNewValue(wrapper);

      unmountInitializedField(wrapper);
      expectNewValue(wrapper);

      mountInitializedField(wrapper);
      expectNewValue(wrapper);
    });

    it('should reset value after mount when set on fields and use initialValue from schema instead of renderer initialValues', () => {
      const SET_INITIALIZE_ON_MOUNT = true;

      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE) }
          onSubmit={ jest.fn() }
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);

      expectNewValue(wrapper);

      unmountInitializedField(wrapper);
      expectNewValue(wrapper);

      mountInitializedField(wrapper);
      expectSchemaInitialValue(wrapper);
    });

    it('should reset value after mount when set on fields and use initialValue from schema', () => {
      const SET_INITIALIZE_ON_MOUNT = true;

      const wrapper = mount(
        <FormRenderer
          layoutMapper={ layoutMapper }
          formFieldsMapper={{
            [components.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE) }
          onSubmit={ jest.fn() }
        />
      );

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);

      expectNewValue(wrapper);

      unmountInitializedField(wrapper);
      expectNewValue(wrapper);

      mountInitializedField(wrapper);
      expectSchemaInitialValue(wrapper);
    });
  });
});
