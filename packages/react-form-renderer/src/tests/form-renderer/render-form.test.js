import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import arrayMutators from 'final-form-arrays';

import renderForm from '../../form-renderer/render-form';
import RendererContext from '../../renderer-context';
import FormRenderer from '../../form-renderer';
import validatorTypes from '../../validator-types';
import componentTypes from '../../component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../use-field-api';
import FieldProvider from '../../field-provider';
import Form from '../../form';

const TextField = (props) => {
  const { input, meta, ...rest } = useFieldApi(props);
  return (
    <div>
      <input {...input} {...rest} aria-label={input.name} />
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
          internalRegisterField: jest.fn(),
          internalUnRegisterField: jest.fn(),
          ...props.formOptions,
        },
      }}
    >
      <Form onSubmit={jest.fn()} mutators={{ ...arrayMutators }}>
        {() => children}
      </Form>
    </RendererContext.Provider>
  );

  beforeEach(() => {
    const TextField = ({ input }) => <input {...input} aria-label={input.name} />;
    CustomComponent = ({ dataType, formOptions, ...props }) => <FieldProvider {...props} Component={TextField} />;
  });

  it('should render single field from defined componentTypes', () => {
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
      },
    ];
    render(
      <ContextWrapper
        componentMapper={{
          [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <div {...props}>TextField</div>,
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );

    expect(screen.getByText('TextField', { selector: 'div' })).toBeInTheDocument();
  });

  it('should render single field (array in array) from defined componentTypes', () => {
    const formFields = [
      [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'foo',
        },
      ],
    ];
    render(
      <ContextWrapper
        componentMapper={{
          [componentTypes.TEXT_FIELD]: ({ FieldProvider, dataType, ...props }) => <h1 {...props}>TextField</h1>,
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );

    expect(screen.getByText('TextField', { selector: 'h1' })).toBeInTheDocument();
  });

  it('should correctly assign dataType validator if no additional validators given', () => {
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'number',
      },
    ];
    render(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField,
        }}
      />
    );

    userEvent.type(screen.getByLabelText('foo'), 'abc');

    expect(screen.getByText('Values must be number')).toBeInTheDocument();
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
            message: 'Bar',
          },
        ],
      },
    ];
    render(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField,
        }}
      />
    );

    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();

    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it('should correctly assign function validator with custom message and fail', () => {
    const cannotBeOdd = (value) => (value % 2 === 0 ? undefined : 'Odd');
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'string',
        validate: [cannotBeOdd],
      },
    ];
    render(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField,
        }}
      />
    );

    userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Odd')).toBeInTheDocument();
  });

  it('should correctly assign function validator with custom message and pass', () => {
    const cannotBeEven = (value) => (value % 2 === 0 ? 'Even' : undefined);
    const onSubmit = jest.fn();
    const formFields = [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'foo',
        dataType: 'string',
        validate: [cannotBeEven],
      },
    ];
    render(
      <FormRenderer
        onSubmit={onSubmit}
        schema={{ fields: formFields }}
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          [componentTypes.TEXT_FIELD]: TextField,
        }}
      />
    );

    userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should use custom validatoMapper and default validatorMapper', () => {
    const customType = 'custom';
    const customValidatorMapper = {
      [customType]: () => (value) => value > 5 ? undefined : 'Error',
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        validate: [
          {
            type: validatorTypes.REQUIRED,
          },
          {
            type: customType,
          },
        ],
      },
    ];

    const onSubmit = jest.fn();

    const TextField = (props) => {
      const { input, meta } = useFieldApi(props);
      return (
        <div>
          <input {...input} aria-label={props.name} />
          {meta.error && <div id="error">{meta.error}</div>}
        </div>
      );
    };

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': TextField,
        }}
        validatorMapper={customValidatorMapper}
        schema={{ fields: formFields }}
        onSubmit={(values) => onSubmit(values)}
      />
    );

    expect(screen.getByText('Required'));

    userEvent.type(screen.getByLabelText('foo'), '3');

    expect(screen.getByText('Error'));

    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();

    userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}6');
    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ foo: '6' });
  });

  it('should render single field from with custom componentType', () => {
    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
      },
    ];
    render(
      <ContextWrapper
        componentMapper={{
          'custom-component': CustomComponent,
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );
  });

  it('should render single field form with custom componentType and assign FieldProvider', () => {
    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
      },
    ];

    render(
      <ContextWrapper
        componentMapper={{
          'custom-component': CustomComponent,
        }}
      >
        {renderForm(formFields)}
      </ContextWrapper>
    );

    expect(screen.getByLabelText('foo')).toBeInTheDocument();
  });

  describe('#condition', () => {
    it('should render condition field only if the condition is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            is: 'fuzz',
          },
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), 'fuzz');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the condition is not met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            is: 'fuzz',
            notMatch: true,
          },
        },
      ];

      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      expect(screen.getByLabelText('foo')).toBeInTheDocument();

      userEvent.type(screen.getByLabelText('bar'), 'fuzz');

      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), 'else');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the isNotEmpty condition is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            isNotEmpty: true,
          },
        },
      ];

      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), 'something');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the isEmpty condition is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            isEmpty: true,
          },
        },
      ];

      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      expect(screen.getByLabelText('foo')).toBeInTheDocument();

      userEvent.type(screen.getByLabelText('bar'), 'fuzz');

      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), '{selectall}{backspace}');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the pattern condition is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: /fuzz/,
          },
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );
      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), 'fuzz');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the pattern condition is met (string)', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: 'fuzz',
          },
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), 'fuzz');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the pattern condition is met (string with flags)', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: 'fuzz',
            flags: 'i',
          },
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('bar'), 'FuZz');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the pattern condition is not met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'bar',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: 'bar',
            pattern: /fuzz/,
            notMatch: true,
          },
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      expect(screen.getByLabelText('foo')).toBeInTheDocument();

      userEvent.type(screen.getByLabelText('bar'), 'foo fuuzz foo');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();

      userEvent.type(screen.getByLabelText('bar'), '{selectall}{backspace}fuzz');

      expect(() => screen.getByLabelText('foo')).toThrow();
    });

    it('should render condition field only if one of depency fields has correct value', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'a',
        },
        {
          component: 'custom-component',
          name: 'b',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: ['a', 'b'],
            is: 'x',
          },
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      userEvent.type(screen.getByLabelText('a'), 'x');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
      userEvent.type(screen.getByLabelText('a'), '{selectall}{backspace}');

      expect(() => screen.getByLabelText('foo')).toThrow();
      userEvent.type(screen.getByLabelText('b'), 'x');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if contition is array and passes all validations', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'a',
        },
        {
          component: 'custom-component',
          name: 'c',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: [
            {
              when: ['a', 'b'],
              is: 'x',
            },
            {
              when: 'c',
              pattern: /fuzz/,
            },
          ],
        },
      ];
      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      userEvent.type(screen.getByLabelText('a'), '{selectall}{backspace}x');

      expect(() => screen.getByLabelText('foo')).toThrow();
      userEvent.type(screen.getByLabelText('a'), '{selectall}{backspace}');

      expect(() => screen.getByLabelText('foo')).toThrow();
      userEvent.type(screen.getByLabelText('c'), '{selectall}{backspace}something fuzz is great');

      expect(() => screen.getByLabelText('foo')).toThrow();
      userEvent.type(screen.getByLabelText('a'), '{selectall}{backspace}x');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });

    it('should render condition field only if the condition with nested name is met', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'foo',
        },
        {
          component: 'custom-component',
          name: 'foo.bar',
          condition: {
            when: 'foo',
            is: 'fuzz',
          },
        },
      ];

      render(
        <ContextWrapper
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        >
          {renderForm(formFields)}
        </ContextWrapper>
      );

      expect(() => screen.getByLabelText('foo.bar')).toThrow();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}fuzz');

      expect(screen.getByLabelText('foo.bar')).toBeInTheDocument();
    });

    it('should render condition field only if one of depency fields has correct value - nested name', () => {
      const formFields = [
        {
          component: 'custom-component',
          name: 'nested.a',
        },
        {
          component: 'custom-component',
          name: 'b',
        },
        {
          component: 'custom-component',
          name: 'foo',
          condition: {
            when: ['nested.a', 'b'],
            is: 'x',
          },
        },
      ];
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          schema={{ fields: formFields }}
          onSubmit={jest.fn()}
          componentMapper={{
            'custom-component': CustomComponent,
          }}
        />
      );

      expect(() => screen.getByLabelText('foo')).toThrow();
      userEvent.type(screen.getByLabelText('nested.a'), '{selectall}{backspace}x');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();

      userEvent.type(screen.getByLabelText('nested.a'), '{selectall}{backspace}');

      expect(() => screen.getByLabelText('foo')).toThrow();

      userEvent.type(screen.getByLabelText('b'), '{selectall}{backspace}x');

      expect(screen.getByLabelText('foo')).toBeInTheDocument();
    });
  });

  describe('#clearOnUrender', () => {
    const formFields = (clearOnUnmount = undefined, component = 'custom-component') => ({
      fields: [
        {
          component,
          name: 'foo',
        },
        {
          component,
          name: 'unmnounted',
          key: 'unmnounted-1',
          label: 'Label 1',
          clearOnUnmount,
          condition: {
            when: 'foo',
            is: 'bar',
          },
        },
        {
          component,
          name: 'unmnounted',
          key: 'unmnounted-2',
          label: 'Label 2',
          clearOnUnmount,
          condition: {
            when: 'foo',
            is: 'barrr',
          },
        },
      ],
    });

    const TextField = (props) => {
      const { input, meta, label, formOptions, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest } = useFieldApi(props);
      return (
        <div>
          <label>{label}</label>
          <input {...input} {...rest} aria-label={input.name} />
          {meta.error && (
            <div>
              <span>{meta.error}</span>
            </div>
          )}
        </div>
      );
    };

    it('should clear values after unrender when set on fields', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={formFields(true)}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}bar');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should clear values after unrender when set on form', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={formFields()}
          onSubmit={(values) => onSubmit(values)}
          clearOnUnmount
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}bar');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');

      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unrender when not set', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={formFields()}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}bar');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unrender when set in form and not in fields', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={formFields(false)}
          onSubmit={(values) => onSubmit(values)}
          clearOnUnmount
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}bar');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
      onSubmit.mockReset();
    });

    it('should not clear values after unrender (default component)', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={formFields(undefined, componentTypes.TEXT_FIELD)}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}bar');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'barrr' });
    });

    it('should clear values after unrender (default component)', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={formFields(undefined, componentTypes.TEXT_FIELD)}
          onSubmit={(values) => onSubmit(values)}
          clearOnUnmount
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}bar');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: 'foovalue', foo: 'bar' });
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ unmnounted: undefined, foo: 'barrr' });
    });

    it('should clear values after unrender and set to field cleared value', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'foo',
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmnounted',
            label: 'Label 1',
            clearedValue: 'bla',
            clearOnUnmount: true,
            condition: {
              when: 'foo',
              is: 'show',
            },
          },
        ],
      };

      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={schema}
          onSubmit={(values) => onSubmit(values)}
          clearedValue="BlaBlaBla"
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}show');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');

      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'show', unmnounted: 'foovalue' });
      onSubmit.mockClear();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'barrr', unmnounted: 'bla' });
    });

    it('should clear values after unrender and set to form cleared value', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'foo',
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unmnounted',
            label: 'Label 1',
            clearOnUnmount: true,
            condition: {
              when: 'foo',
              is: 'show',
            },
          },
        ],
      };

      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={schema}
          onSubmit={(values) => onSubmit(values)}
          clearedValue="BlaBlaBla"
        />
      );

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}show');
      userEvent.type(screen.getByLabelText('unmnounted'), '{selectall}{backspace}foovalue');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'show', unmnounted: 'foovalue' });
      onSubmit.mockClear();

      userEvent.type(screen.getByLabelText('foo'), '{selectall}{backspace}barrr');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ foo: 'barrr', unmnounted: 'BlaBlaBla' });
    });
  });

  describe('#initializeOnMount', () => {
    const SHOWER_FIELD = 'shower_FIELD';
    const INITIALIZED_FIELD = 'initialized_FIELD';
    const SHOW_VALUE = 'show';

    const INITIAL_VALUE = 'some initial value';
    const NEW_VALUE = 'something different';
    const NOT_SHOW_VALUE = 'bla';
    const SCHEMA_INITIAL_VALUE = 'schema initial value';

    const formFields = (initializeOnMount = false, initialValue) => ({
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: SHOWER_FIELD,
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: INITIALIZED_FIELD,
          initializeOnMount,
          ...(initialValue ? { initialValue } : {}),
          condition: {
            when: SHOWER_FIELD,
            is: SHOW_VALUE,
          },
        },
      ],
    });

    it('should reset value after render when set on fields', () => {
      const SET_INITIALIZE_ON_MOUNT = true;
      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={formFields(SET_INITIALIZE_ON_MOUNT)}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.type(screen.getByLabelText(INITIALIZED_FIELD), `{selectall}{backspace}${NEW_VALUE}`);

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: SHOW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${NOT_SHOW_VALUE}`);

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: NOT_SHOW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE, [SHOWER_FIELD]: SHOW_VALUE }));
    });

    it('should not reset value after render when set on fields', () => {
      const UNSET_INITIALIZE_ON_MOUNT = false;
      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={formFields(UNSET_INITIALIZE_ON_MOUNT)}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: INITIAL_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.type(screen.getByLabelText(INITIALIZED_FIELD), `{selectall}{backspace}${NEW_VALUE}`);

      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${NOT_SHOW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: NOT_SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();
    });

    it('should reset value after render when set on fields and use initialValue from schema instead of renderer initialValues', () => {
      const SET_INITIALIZE_ON_MOUNT = true;
      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE)}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            [INITIALIZED_FIELD]: INITIAL_VALUE,
          }}
        />
      );

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.type(screen.getByLabelText(INITIALIZED_FIELD), `{selectall}{backspace}${NEW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${NOT_SHOW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: NOT_SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: SCHEMA_INITIAL_VALUE }));
      onSubmit.mockReset();
    });

    it('should reset value after render when set on fields and use initialValue from schema', () => {
      const SET_INITIALIZE_ON_RENDER = true;
      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={formFields(SET_INITIALIZE_ON_RENDER, SCHEMA_INITIAL_VALUE)}
          onSubmit={(values) => onSubmit(values)}
        />
      );

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.type(screen.getByLabelText(INITIALIZED_FIELD), `{selectall}{backspace}${NEW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [SHOWER_FIELD]: SHOW_VALUE, [INITIALIZED_FIELD]: NEW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${NOT_SHOW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: NEW_VALUE, [SHOWER_FIELD]: NOT_SHOW_VALUE }));
      onSubmit.mockReset();

      userEvent.type(screen.getByLabelText(SHOWER_FIELD), `{selectall}{backspace}${SHOW_VALUE}`);
      userEvent.click(screen.getByText('Submit'));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ [INITIALIZED_FIELD]: SCHEMA_INITIAL_VALUE, [SHOWER_FIELD]: SHOW_VALUE }));
      onSubmit.mockReset();
    });

    it('should set false value in initializeOnMount', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'input',
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unrendered',
            initialValue: false,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_false',
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unrendered',
            key: 'unrendered-2',
            initialValue: true,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_true',
            },
          },
        ],
      };

      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={schema}
          onSubmit={onSubmit}
        />
      );

      userEvent.type(screen.getByLabelText('input'), '{selectall}{backspace}show_true');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_true', unrendered: true }, expect.any(Object), expect.any(Function));
      onSubmit.mockClear();

      userEvent.type(screen.getByLabelText('input'), '{selectall}{backspace}show_false');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_false', unrendered: false }, expect.any(Object), expect.any(Function));
    });

    it('should set unefined value in initializeOnMount', () => {
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'input',
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unrendered',
            initialValue: undefined,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_undef',
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'unrendered',
            key: 'unrendered-1',
            initialValue: true,
            initializeOnMount: true,
            condition: {
              when: 'input',
              is: 'show_true',
            },
          },
        ],
      };

      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            [componentTypes.TEXT_FIELD]: TextField,
          }}
          schema={schema}
          onSubmit={onSubmit}
        />
      );

      userEvent.type(screen.getByLabelText('input'), '{selectall}{backspace}show_true');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_true', unrendered: true }, expect.any(Object), expect.any(Function));
      onSubmit.mockClear();

      userEvent.type(screen.getByLabelText('input'), '{selectall}{backspace}show_undef');
      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ input: 'show_undef', unrendered: undefined }, expect.any(Object), expect.any(Function));
    });
  });

  it('should use actionMapper', () => {
    const id = '23asd86';

    const intl = jest.fn().mockImplementation((id) => `translated ${id}`);

    const action = 'loadLabel';
    const customActionMapper = {
      [action]: intl,
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        actions: {
          label: [action, id],
        },
      },
      {
        component: 'custom-component',
        name: 'bar',
        label: 'standard label',
      },
    ];

    const CustomComponent = ({ label }) => <label>{label}</label>;

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': CustomComponent,
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={customActionMapper}
      />
    );

    expect(intl).toHaveBeenCalledWith(id);
    expect(intl.mock.calls).toHaveLength(1);

    expect(screen.getByText(`translated ${id}`, { selector: 'label' })).toBeInTheDocument();
    expect(screen.getByText('standard label', { selector: 'label' })).toBeInTheDocument();
  });

  it('should use actions from componentMapper', () => {
    const mapperLabel = 'mapper label';

    const actionMapper = 'loadLabelMapper';

    const customActionMapper = {
      [actionMapper]: () => mapperLabel,
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
      },
    ];

    const CustomComponent = ({ label }) => <label>{label}</label>;

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': {
            component: CustomComponent,
            actions: {
              label: [actionMapper],
            },
          },
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={customActionMapper}
      />
    );

    expect(screen.getByText(mapperLabel, { selector: 'label' })).toBeInTheDocument();
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
      [idActionmapper]: () => mappedId,
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        actions: {
          label: [actionField],
        },
      },
    ];

    const CustomComponent = ({ label, id }) => <label id={id}>{label}</label>;

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': {
            component: CustomComponent,
            actions: {
              label: [actionMapper],
              id: [idActionmapper],
            },
          },
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={customActionMapper}
      />
    );

    expect(screen.getByText(fieldLabel, { selector: 'label' })).toHaveAttribute('id', mappedId);
  });

  it('composite mapper component', () => {
    const schema = {
      fields: [
        {
          component: 'text-field',
          name: 'props-from-mapper',
          label: 'Number field',
          type: 'number',
        },
      ],
    };
    render(
      <FormRenderer
        FormTemplate={FormTemplate}
        schema={schema}
        onSubmit={() => {}}
        componentMapper={{
          'text-field': {
            component: TextField,
            className: 'composite-class',
            type: 'text',
          },
        }}
      />
    );

    expect(screen.getByLabelText('props-from-mapper', { selector: 'input' })).toHaveClass('composite-class');
    expect(screen.getByLabelText('props-from-mapper', { selector: 'input' })).toHaveAttribute('type', 'number');
  });

  it('resolve props resolve props', () => {
    const label = 'Some super label';
    const resolveProps = jest.fn().mockImplementation(() => ({ label }));

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        resolveProps,
      },
    ];

    const CustomComponent = (props) => {
      const { label } = useFieldApi(props);
      return <label>{label}</label>;
    };

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': CustomComponent,
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(label, { selector: 'label' })).toBeInTheDocument();

    expect(resolveProps).toHaveBeenCalledWith(
      { label: 'standard label', component: 'custom-component' },
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
        resolveProps: () => ({ label }),
      },
    ];

    const CustomComponent = (props) => {
      const { label, id } = useFieldApi(props);
      return <label id={id}>{label}</label>;
    };

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': {
            component: CustomComponent,
            resolveProps: () => ({
              id,
              label: mapperLabel,
            }),
          },
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(label, { selector: 'label' })).toHaveAttribute('id', id);
  });

  it('actions can return resolveProps and it has priority over fields', () => {
    const id = 'someId';
    const label = 'Some super label';

    const actionMapper = {
      resolveProps: () => () => ({ label }),
    };

    const formFields = [
      {
        component: 'custom-component',
        name: 'foo',
        label: 'standard label',
        resolveProps: () => ({ id, label: 'nonsense' }),
        actions: { resolveProps: ['resolveProps'] },
      },
    ];

    const CustomComponent = (props) => {
      const { label, id } = useFieldApi(props);
      return <label id={id}>{label}</label>;
    };

    render(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          'custom-component': CustomComponent,
        }}
        schema={{ fields: formFields }}
        onSubmit={jest.fn()}
        actionMapper={actionMapper}
      />
    );

    expect(screen.getByText(label, { selector: 'label' })).toHaveAttribute('id', id);
  });

  describe('#initialValues', () => {
    it('initialValues has a higher priority than initialValue', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={{
            fields: [
              {
                component: 'custom-component',
                name: 'testField',
                initialValue: 'lower-priority',
              },
            ],
          }}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ testField: 'higher-priority' }}
        />
      );

      expect(screen.getByLabelText('testField')).toHaveValue('higher-priority');

      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ testField: 'higher-priority' });
    });

    it('empty initialValues ', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={{
            fields: [
              {
                component: 'custom-component',
                name: 'testField',
                initialValue: 'lower-priority',
              },
            ],
          }}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ testField: undefined }}
        />
      );

      expect(screen.getByLabelText('testField')).toHaveValue('lower-priority');

      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ testField: 'lower-priority' });
    });

    it('null initialValues ', () => {
      const onSubmit = jest.fn();
      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={{
            fields: [
              {
                component: 'custom-component',
                name: 'testField',
                initialValue: 'lower-priority',
              },
            ],
          }}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ testField: null }}
        />
      );

      expect(screen.getByLabelText('testField')).toHaveValue('');

      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ testField: null });
    });

    it('use initialValue when initialOnrender', async () => {
      const onSubmit = jest.fn();

      render(
        <FormRenderer
          FormTemplate={(props) => <FormTemplate {...props} />}
          componentMapper={{
            'custom-component': TextField,
          }}
          schema={{
            fields: [
              {
                component: 'custom-component',
                name: 'testField',
                initialValue: 'lower-priority',
                initializeOnMount: true,
              },
            ],
          }}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ testField: 'higher-priority' }}
        />
      );

      expect(screen.getByLabelText('testField')).toHaveValue('lower-priority');

      userEvent.click(screen.getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledWith({ testField: 'lower-priority' });
    });
  });
});
