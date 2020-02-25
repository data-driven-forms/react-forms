import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import renderForm from '../../form-renderer/render-form';
import RendererContext from '../../components/renderer-context';
import FormRenderer from '../../components/form-renderer';
import validatorTypes from '../../components/validator-types';
import componentTypes from '../../components/component-types';
import formTemplate from '../../../../../__mocks__/mock-form-template';


describe('renderForm function', () => {
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
    const TextField = ({ input }) => <input {...input} id={input.name} />
    CustomComponent = ({ FieldProvider, dataType, formOptions, ...props }) => (
      <FieldProvider {...props} component={TextField}/>
    );
  });

  it('should render single field from defined componentTypes', () => {
    const formFields = [{
      component: componentTypes.TEXT_FIELD,
      name: 'foo',
    }];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render single field (array in array) from defined componentTypes', () => {
    const formFields = [ [{
      component: componentTypes.TEXT_FIELD,
      name: 'foo',
    }] ];
    const wrapper = mount(
      <ContextWrapper formFieldsMapper={{
        [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <h1 { ...props }>TextField</h1>,
      }}>
        { renderForm(formFields) }
      </ContextWrapper>
    );

    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should correctly assign dataType validator if no additional validators given', () => {
    const onSubmit = jest.fn()
    const formFields = [{
      component: componentTypes.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
    }];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        formTemplate={formTemplate}
        formFieldsMapper={{
          [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, meta, input, ...props }) => (
            <div>
              <input {...input} />
              {meta.error && <div id="error" />}
            </div>
          )
        }}
      />
    );
    expect(wrapper.find('div#error')).toHaveLength(0);
    wrapper.find('input[name="foo"]').simulate('change', { target: { value: 1 } });
    expect(wrapper.find('div#error')).toHaveLength(1);
  });

  it('should correctly assign required validator with custom message', () => {
    const onSubmit = jest.fn()
    const formFields = [{
      component: componentTypes.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
      validate: [{
        type: validatorTypes.REQUIRED,
        message: 'Bar',
      }],
    }];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        formTemplate={formTemplate}
        formFieldsMapper={{
          [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, meta, ...props }) => (
            <div {...props}>
              TextField
              {meta.error && <div id="error" />}
            </div>
          )
        }}
      />
    );
    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(wrapper.find('div#error')).toHaveLength(1);
  });

  it('should correctly assign function validator with custom message and fail', () => {
    const cannotBeOdd = value => value % 2 === 0 ? undefined : 'Odd';
    const onSubmit = jest.fn()
    const formFields = [{
      component: componentTypes.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
      validate: [
        cannotBeOdd,
      ],
    }];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        formTemplate={formTemplate}
        formFieldsMapper={{
        [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }} />
    );

    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should correctly assign function validator with custom message and pass', () => {
    const cannotBeEven = value => value % 2 === 0 ? 'Even' : undefined;
    const onSubmit = jest.fn()
    const formFields = [{
      component: componentTypes.TEXT_FIELD,
      name: 'foo',
      dataType: 'string',
      validate: [
        cannotBeEven,
      ],
    }];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        formTemplate={formTemplate}
        formFieldsMapper={{
        [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div { ...props }>TextField</div>,
      }} />
    );

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
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
        name: 'bar'
      }, {
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
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the condition is not met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'bar'
      }, {
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
      expect(wrapper.find(CustomComponent)).toHaveLength(2);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'kar' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if the isNotEmpty condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'bar'
      }, {
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
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the isEmpty condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'bar'
      }, {
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
      expect(wrapper.find(CustomComponent)).toHaveLength(2);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'sdsad' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: '' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the pattern condition is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'bar'
      }, {
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
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the pattern condition is not met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'bar'
      }, {
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
      expect(wrapper.find(CustomComponent)).toHaveLength(2);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'foo fuuzz foo' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(1);
    });

    it('should render condition field only if one of depency fields has correct value', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'a'
      },{
        component: 'custom-component',
        name: 'b'
      }, {
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

      wrapper.find('input[name="a"]').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(3);
      wrapper.find('input[name="a"]').simulate('change', { target: { value: undefined } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input[name="b"]').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(3);
    });

    it('should render condition field only if contition is array and passes all validations', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'a'
      }, {
        component: 'custom-component',
        name: 'c',
      }, {
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

      
      wrapper.find('input[name="a"]').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input[name="a"]').simulate('change', { target: { value: undefined } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input[name="c"]').simulate('change', { target: { value: 'something fuzz is great' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input[name="a"]').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(3);
    });

    it('should render condition field only if the condition with nested name is met', () => {
      const formFields = [{
        component: 'custom-component',
        name: 'foo',
      }, {
        component: 'custom-component',
        name: 'foo.bar',
        condition: {
          when: 'foo',
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

      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="foo"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();

      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if one of depency fields has correct value - nested name', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'nested.a'
      }, {
        component: 'custom-component',
        name: 'b'
      }, {
        component: 'custom-component',
        name: 'foo',
        condition: {
          when: [ 'nested.a', 'b' ],
          is: 'x',
        },
      }];
      const wrapper = mount(
        <FormRenderer
          formTemplate={formTemplate}
          schema={{ fields: formFields }}
          onSubmit={jest.fn()}
          formFieldsMapper={{
            'custom-component': CustomComponent
          }}/>
      );

      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input[name="nested.a"]').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      wrapper.find('input[name="nested.a"]').simulate('change', { target: { value: undefined } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input#b').simulate('change', { target: { value: 'x' }});
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(3);
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
      const onSubmit = jest.fn()
      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields(true) }
          onSubmit={ values => onSubmit(values) }
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should clear values after unmount when set on form', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields() }
          onSubmit={ values => onSubmit(values) }
          clearOnUnmount
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unmount when not set', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields() }
          onSubmit={ values => onSubmit(values) }
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unmount when set in form and not in fields', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            'custom-component': ({ FieldProvider, ...props }) => <FieldProvider
              { ...props }
              component={ TextField }
            />,
          }}
          schema={ formFields(false) }
          onSubmit={ values => onSubmit(values) }
          clearOnUnmount
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unmount (default component)', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(undefined, componentTypes.TEXT_FIELD) }
          onSubmit={ values => onSubmit(values) }
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
    });

    it('should clear values after unmount (default component)', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(undefined, componentTypes.TEXT_FIELD) }
          onSubmit={ values => onSubmit(values) }
          clearOnUnmount
        />
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'bar' }});
      wrapper.update();
      wrapper.find('input').last().simulate('change', { target: { value: 'foovalue' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper.find('input').first().simulate('change', { target: { value: 'barrr' }});
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
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

    const mountInitializedField = (wrapper) => updateInput(wrapper, SHOWER_FIELD_INDEX, SHOW_VALUE);
    const unmountInitializedField = (wrapper) => updateInput(wrapper, SHOWER_FIELD_INDEX, NOT_SHOW_VALUE);
    const setInitializedToNewValue = (wrapper) => updateInput(wrapper, INITIALIZED_FIELD_INDEX, NEW_VALUE);

    it('should reset value after mount when set on fields', () => {
      const SET_INITIALIZE_ON_MOUNT = true;
      const onSubmit = jest.fn()

      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(SET_INITIALIZE_ON_MOUNT) }
          onSubmit={ values => onSubmit(values) }
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      const form = wrapper.find('form');
      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE }));

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);
      onSubmit.mockReset();

      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      form.simulate('submit');
      unmountInitializedField(wrapper);
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      form.simulate('submit');
      mountInitializedField(wrapper);
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: NOT_SHOW_VALUE }));
    });

    it('should not reset value after mount when set on fields', () => {
      const UNSET_INITIALIZE_ON_MOUNT = false;
      const onSubmit = jest.fn()

      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(UNSET_INITIALIZE_ON_MOUNT) }
          onSubmit={ values => onSubmit(values) }
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE }));
      onSubmit.mockReset();

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);

      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      unmountInitializedField(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: NOT_SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      mountInitializedField(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();
    });

    it('should reset value after mount when set on fields and use initialValue from schema instead of renderer initialValues', () => {
      const SET_INITIALIZE_ON_MOUNT = true;
      const onSubmit = jest.fn()

      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE) }
          onSubmit={ values => onSubmit(values) }
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      unmountInitializedField(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: NOT_SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      mountInitializedField(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: SCHEMA_INITIAL_VALUE }));
      onSubmit.mockReset();
    });

    it('should reset value after mount when set on fields and use initialValue from schema', () => {
      const SET_INITIALIZE_ON_MOUNT = true;
      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          formTemplate={ formTemplate }
          formFieldsMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={ formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE) }
          onSubmit={ values => onSubmit(values) }
        />
      );

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      unmountInitializedField(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: NOT_SHOW_VALUE }));
      onSubmit.mockReset();

      mountInitializedField(wrapper);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: SCHEMA_INITIAL_VALUE, [SHOWER_FIELD]: SHOW_VALUE }));
      onSubmit.mockReset();
    });
  });
});
