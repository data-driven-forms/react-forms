import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import renderForm from '../../form-renderer/render-form';
import RendererContext from '../../renderer-context';
import FormRenderer from '../../form-renderer';
import validatorTypes from '../../validator-types';
import componentTypes from '../../component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../use-field-api';
import FieldProvider from '../../field-provider';

const TextField = (props) => {
  const { input, meta, ...rest } = useFieldApi(props);
  return (
    <div>
      <input {...input} {...rest} />
      {meta.error && <div id="error">{meta.error}</div>}
    </div>
  );
};

describe('renderForm function', () => {
  let CustomComponent;

  const ContextWrapper = ({ children, ...props }) => (
    <RendererContext.Provider
      value={{
        ...props,
        formOptions: {
          renderForm,
          getState: () => ({ dirty: true }),
          ...props.formOptions
        }
      }}
    >
      <Form onSubmit={jest.fn()} mutators={{ ...arrayMutators }}>
        {() => children}
      </Form>
    </RendererContext.Provider>
  );

  beforeEach(() => {
    const TextField = ({ input }) => <input {...input} id={input.name} />;
    CustomComponent = ({ dataType, formOptions, ...props }) => <FieldProvider {...props} Component={TextField} />;
  });

  it('should render single field from defined componentTypes', () => {
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo'
      }
    ];
    const wrapper = mount(
      <ContextWrapper
        componentMapper={{
          [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div {...props}>TextField</div>
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render single field (array in array) from defined componentTypes', () => {
    const formFields = [
      [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'foo'
        }
      ]
    ];
    const wrapper = mount(
      <ContextWrapper
        componentMapper={{
          [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <h1 {...props}>TextField</h1>
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );

    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should correctly assign dataType validator if no additional validators given', () => {
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'string'
      }
    ];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField
        }}
      />
    );
    expect(wrapper.find('div#error')).toHaveLength(0);
    wrapper.find('input[name="foo"]').simulate('change', { target: { value: 1 } });
    expect(wrapper.find('div#error')).toHaveLength(1);
  });

  it('should correctly assign required validator with custom message', () => {
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'string',
        validate: [
          {
            type: validatorTypes.REQUIRED,
            message: 'Bar'
          }
        ]
      }
    ];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField
        }}
      />
    );
    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(wrapper.find('div#error')).toHaveLength(1);
  });

  it('should correctly assign function validator with custom message and fail', () => {
    const cannotBeOdd = (value) => (value % 2 === 0 ? undefined : 'Odd');
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'string',
        validate: [cannotBeOdd]
      }
    ];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField
        }}
      />
    );

    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should correctly assign function validator with custom message and pass', () => {
    const cannotBeEven = (value) => (value % 2 === 0 ? 'Even' : undefined);
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'string',
        validate: [cannotBeEven]
      }
    ];
    const wrapper = mount(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField
        }}
      />
    );

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should use custom validatoMapper and default validatorMapper', () => {
    const customType = 'custom';
    const customValidatorMapper = {
      [customType]: () => (value) => (value > 5 ? undefined : 'Error')
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        validate: [
          {
            type: validatorTypes.REQUIRED
          },
          {
            type: customType
          }
        ]
      }
    ];

    const onSubmit = jest.fn();

    const TextField = (props) => {
      const { input, meta } = useFieldApi(props);
      return (
        <div>
          <input {...input} />
          {meta.error && <div id="error">{meta.error}</div>}
        </div>
      );
    };

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': TextField
        }}
        validatorMapper={customValidatorMapper}
        schema={{ fields: formFields }}
        onSubmit={(values) => onSubmit(values)}
      />
    );

    expect(wrapper.find('#error').text()).toEqual('Required');

    wrapper.find('input').instance().value = '3';
    wrapper.find('input').simulate('change');
    wrapper.update();

    expect(wrapper.find('#error').text()).toEqual('Error');

    wrapper.find('form').simulate('submit');
    expect(onSubmit).not.toHaveBeenCalled();

    wrapper.find('input').instance().value = '6';
    wrapper.find('input').simulate('change');
    wrapper.update();

    expect(wrapper.find('#error')).toHaveLength(0);

    wrapper.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledWith({ foo: '6' });
  });

  it('should render single field from with custom componentType', () => {
    const formFields = [
      {
        component: 'custom-component',
        name: 'foo'
      }
    ];
    const wrapper = mount(
      <ContextWrapper
        componentMapper={{
          'custom-component': CustomComponent
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(CustomComponent)).toHaveLength(1);
  });

  it('should render single field form with custom componentType and assign FieldProvider', () => {
    const formFields = [
      {
        component: 'custom-component',
        name: 'foo'
      }
    ];

    const wrapper = mount(
      <ContextWrapper
        componentMapper={{
          'custom-component': CustomComponent
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );
    expect(wrapper.find(CustomComponent)).toHaveLength(1);
    expect(wrapper.find(FieldProvider)).toHaveLength(1);
  });

  describe('#condition', () => {
    it('should render condition field only if the condition is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            is: 'fuzz'
          }
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the condition is not met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            is: 'fuzz',
            notMatch: true
          }
        }
      ];

      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
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
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            isNotEmpty: true
          }
        }
      ];

      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the isEmpty condition is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            isEmpty: true
          }
        }
      ];

      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
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
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: /fuzz/
          }
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the pattern condition is met (string)', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: 'fuzz'
          }
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fuzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });

    it('should render condition field only if the pattern condition is met (string with flags)', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: 'fuzz',
            flags: 'i'
          }
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(wrapper.find(CustomComponent)).toHaveLength(1);

      wrapper.find('input[name="bar"]').simulate('change', { target: { value: 'fUzz' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
    });
    it('should render condition field only if the pattern condition is not met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: /fuzz/,
            notMatch: true
          }
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
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
      const formFields = [
        {
          component: 'custom-component',
          name: 'a'
        },
        {
          component: 'custom-component',
          name: 'b'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: ['a', 'b'],
            is: 'x'
          }
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
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
      const formFields = [
        {
          component: 'custom-component',
          name: 'a'
        },
        {
          component: 'custom-component',
          name: 'c'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: [
            {
              when: ['a', 'b'],
              is: 'x'
            },
            {
              when: 'c',
              pattern: /fuzz/
            }
          ]
        }
      ];
      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
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
      const formFields = [
        {
          component: 'custom-component',
          name: 'foo'
        },
        {
          component: 'custom-component',
          name: 'foo.bar',
          condition: {
            when: 'foo',
            is: 'fuzz'
          }
        }
      ];

      const wrapper = mount(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent
          }}
        >
          {renderForm(formFields)}
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
        },
        {
          component: 'custom-component',
          name: 'b'
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: ['nested.a', 'b'],
            is: 'x'
          }
        }
      ];
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          schema={{ fields: formFields }}
          onSubmit={jest.fn()}
          componentMapper={{
            'custom-component': CustomComponent
          }}
        />
      );

      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input[name="nested.a"]').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      wrapper.find('input[name="nested.a"]').simulate('change', { target: { value: undefined } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(2);
      wrapper.find('input#b').simulate('change', { target: { value: 'x' } });
      wrapper.update();
      expect(wrapper.find(CustomComponent)).toHaveLength(3);
    });
  });

  describe('#clearOnUmount', () => {
    const formFields = (clearOnUnmount = undefined, component = 'custom-component') => ({
      fields: [
        {
          component,
          name: 'foo'
        },
        {
          component,
          name: 'unmnounted',
          key: 'unmnounted-1',
          label: 'Label 1',
          clearOnUnmount,
          condition: {
            when: 'foo',
            is: 'bar'
          }
        },
        {
          component,
          name: 'unmnounted',
          key: 'unmnounted-2',
          label: 'Label 2',
          clearOnUnmount,
          condition: {
            when: 'foo',
            is: 'barrr'
          }
        }
      ]
    });

    const TextField = (props) => {
      const { input, meta, label, formOptions, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest } = useFieldApi(props);
      return (
        <div>
          <label>{label}</label>
          <input {...input} {...rest} />
          {meta.error && (
            <div>
              <span>{meta.error}</span>
            </div>
          )}
        </div>
      );
    };

    it('should clear values after unmount when set on fields', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField
          }}
          schema={formFields(true)}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'bar' } });
      wrapper.update();
      wrapper.find('input[name="unmnounted"]').simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should clear values after unmount when set on form', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField
          }}
          schema={formFields()}
          onSubmit={(values) => onSubmit(values)}
          clearOnUnmount
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'bar' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unmount when not set', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField
          }}
          schema={formFields()}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'bar' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unmount when set in form and not in fields', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField
          }}
          schema={formFields(false)}
          onSubmit={(values) => onSubmit(values)}
          clearOnUnmount
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'bar' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unmount (default component)', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={formFields(undefined, componentTypes.TEXT_FIELD)}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'bar' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
    });

    it('should clear values after unmount (default component)', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={formFields(undefined, componentTypes.TEXT_FIELD)}
          onSubmit={(values) => onSubmit(values)}
          clearOnUnmount
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'bar' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
    });

    it('should clear values after unmount and set to field cleared value', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'foo'
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmnounted',
            label: 'Label 1',
            clearedValue: 'bla',
            clearOnUnmount: true,
            condition: {
              when: 'foo',
              is: 'show'
            }
          }
        ]
      };

      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={schema}
          onSubmit={(values) => onSubmit(values)}
          clearedValue="BlaBlaBla"
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'show' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'show', unmnounted: 'foovalue' });
      onSubmit.mockClear();

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'barrr', unmnounted: 'bla' });
    });

    it('should clear values after unmount and set to form cleared value', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'foo'
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmnounted',
            label: 'Label 1',
            clearOnUnmount: true,
            condition: {
              when: 'foo',
              is: 'show'
            }
          }
        ]
      };

      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={schema}
          onSubmit={(values) => onSubmit(values)}
          clearedValue="BlaBlaBla"
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'show' } });
      wrapper.update();
      wrapper
        .find('input')
        .last()
        .simulate('change', { target: { value: 'foovalue' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'show', unmnounted: 'foovalue' });
      onSubmit.mockClear();

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'barrr' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'barrr', unmnounted: 'BlaBlaBla' });
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
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: SHOWER_FIELD
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: INITIALIZED_FIELD,
          initializeOnMount,
          ...(initialValue ? { initialValue } : {}),
          condition: {
            when: SHOWER_FIELD,
            is: SHOW_VALUE
          }
        }
      ]
    });

    const updateInput = (wrapper, position, value) => {
      wrapper
        .find('input')
        .at(position)
        .simulate('change', { target: { value } });
      wrapper.update();
    };

    const mountInitializedField = (wrapper) => updateInput(wrapper, SHOWER_FIELD_INDEX, SHOW_VALUE);
    const unmountInitializedField = (wrapper) => updateInput(wrapper, SHOWER_FIELD_INDEX, NOT_SHOW_VALUE);
    const setInitializedToNewValue = (wrapper) => updateInput(wrapper, INITIALIZED_FIELD_INDEX, NEW_VALUE);

    it('should reset value after mount when set on fields', () => {
      const SET_INITIALIZE_ON_MOUNT = true;
      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={formFields(SET_INITIALIZE_ON_MOUNT)}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE
          }}
        />
      );

      const form = wrapper.find('form');
      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE }));
      onSubmit.mockReset();

      mountInitializedField(wrapper);
      setInitializedToNewValue(wrapper);
      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: SHOW_VALUE }));
      onSubmit.mockReset();

      unmountInitializedField(wrapper);
      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: NOT_SHOW_VALUE }));
      onSubmit.mockReset();

      mountInitializedField(wrapper);
      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE, [SHOWER_FIELD]: SHOW_VALUE }));
    });

    it('should not reset value after mount when set on fields', () => {
      const UNSET_INITIALIZE_ON_MOUNT = false;
      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={formFields(UNSET_INITIALIZE_ON_MOUNT)}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE
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
      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE)}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE
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
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE)}
          onSubmit={(values) => onSubmit(values)}
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

    it('should set false value in initializeOnMount', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'input'
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmounted',
            initialValue: false,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_false'
            }
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmounted',
            key: 'unmounted-2',
            initialValue: true,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_true'
            }
          }
        ]
      };

      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={schema}
          onSubmit={onSubmit}
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'show_true' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_true', unmounted: true }, expect.any(Object), expect.any(Function));
      onSubmit.mockClear();

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'show_false' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');
      wrapper.update();

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_false', unmounted: false }, expect.any(Object), expect.any(Function));
    });

    it('should set unefined value in initializeOnMount', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'input'
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmounted',
            initialValue: undefined,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_undef'
            }
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmounted',
            key: 'unmounted-1',
            initialValue: true,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_true'
            }
          }
        ]
      };

      const onSubmit = jest.fn();

      const wrapper = mount(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField
          }}
          schema={schema}
          onSubmit={onSubmit}
        />
      );

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'show_true' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_true', unmounted: true }, expect.any(Object), expect.any(Function));
      onSubmit.mockClear();

      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: 'show_undef' } });
      wrapper.update();

      wrapper.find('form').simulate('submit');
      wrapper.update();

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_undef', unmounted: undefined }, expect.any(Object), expect.any(Function));
    });
  });

  it('should use actionMapper', () => {
    const id = '23asd86';

    const intl = jest.fn().mockImplementation((id) => `translated ${id}`);

    const action = 'loadLabel';
    const customActionMapper = {
      [action]: intl
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        actions: {
          label: [action, id]
        }
      },
      {
        component: 'custom-component',
        name: 'bar',
        label: 'standard label'
      }
    ];

    const CustomComponent = ({ label }) => <label>{label}</label>;

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': CustomComponent
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={customActionMapper}
      />
    );

    expect(intl).toHaveBeenCalledWith(id);
    expect(intl.mock.calls).toHaveLength(1);
    expect(
      wrapper
        .find('label')
        .first()
        .text()
    ).toEqual(`translated ${id}`);
    expect(
      wrapper
        .find('label')
        .last()
        .text()
    ).toEqual('standard label');
  });

  it('should use actions from componentMapper', () => {
    const mapperLabel = 'mapper label';

    const actionMapper = 'loadLabelMapper';

    const customActionMapper = {
      [actionMapper]: () => mapperLabel
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label'
      }
    ];

    const CustomComponent = ({ label }) => <label>{label}</label>;

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': {
            component: CustomComponent,
            actions: {
              label: [actionMapper]
            }
          }
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={customActionMapper}
      />
    );

    expect(wrapper.find('label').text()).toEqual(mapperLabel);
  });

  it('field actions has a priority over mappers and they are merged', () => {
    const fieldLabel = 'field label';
    const mapperLabel = 'mapper label';
    const mappedId = 'mapper id';

    const actionField = 'loadLabelField';
    const actionMapper = 'loadLabelMapper';
    const idActionmapper = 'loadId';

    const customActionMapper = {
      [actionField]: () => fieldLabel,
      [actionMapper]: () => mapperLabel,
      [idActionmapper]: () => mappedId
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        actions: {
          label: [actionField]
        }
      }
    ];

    const CustomComponent = ({ label, id }) => <label id={id}>{label}</label>;

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': {
            component: CustomComponent,
            actions: {
              label: [actionMapper],
              id: [idActionmapper]
            }
          }
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={customActionMapper}
      />
    );

    expect(wrapper.find('label').text()).toEqual(fieldLabel);
    expect(wrapper.find('label').props().id).toEqual(mappedId);
  });

  it('composite mapper component', () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'props-from-mapper',
          label: 'Number field',
          type: 'number'
        }
      ]
    };
    const wrapper = mount(
      <FormRenderer
        FormTemplate={FormTemplate}
        schema={schema}
        onSubmit={() => {}}
        componentMapper={{
          'text-field': {
            component: TextField,
            className: 'composite-class',
            type: 'text'
          }
        }}
      />
    );
    const { className, type } = wrapper.find('input').props();
    expect(className).toEqual('composite-class');
    expect(type).toEqual('number');
  });

  it('resolve props resolve props', () => {
    const label = 'Some super label';
    const resolveProps = jest.fn().mockImplementation(() => ({ label }));

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        resolveProps
      }
    ];

    const CustomComponent = (props) => {
      const { label } = useFieldApi(props);
      return <label>{label}</label>;
    };

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': CustomComponent
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
      />
    );

    expect(wrapper.find('label').text()).toEqual(label);
    expect(resolveProps).toHaveBeenCalledWith(
      { label: 'standard label' },
      expect.objectContaining({ meta: expect.any(Object), input: expect.any(Object) }),
      expect.any(Object)
    );
  });

  it('resolve props are merged and field has priority ', () => {
    const id = 'someId';
    const mapperLabel = 'mappers label';
    const label = 'Some super label';

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        resolveProps: () => ({ label })
      }
    ];

    const CustomComponent = (props) => {
      const { label, id } = useFieldApi(props);
      return <label id={id}>{label}</label>;
    };

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': {
            component: CustomComponent,
            resolveProps: () => ({
              id,
              label: mapperLabel
            })
          }
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
      />
    );

    expect(wrapper.find('label').text()).toEqual(label);
    expect(wrapper.find('label').props().id).toEqual(id);
  });

  it('actions can return resolveProps and it has priority over fields', () => {
    const id = 'someId';
    const label = 'Some super label';

    const actionMapper = {
      resolveProps: () => () => ({ label })
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        resolveProps: () => ({ id, label: 'nonsense' }),
        actions: { resolveProps: ['resolveProps'] }
      }
    ];

    const CustomComponent = (props) => {
      const { label, id } = useFieldApi(props);
      return <label id={id}>{label}</label>;
    };

    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': CustomComponent
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={actionMapper}
      />
    );

    expect(wrapper.find('label').text()).toEqual(label);
    expect(wrapper.find('label').props().id).toEqual(id);
  });
});
