import React, { Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormRenderer from '../../form-renderer';
import SchemaErrorComponent from '../../form-renderer/schema-error-component';
import componentTypes from '../../component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../use-field-api';
import useFormApi from '../../use-form-api';

const PropsSpy = () => <Fragment />;
const ContextSpy = ({registerSpy, spyFF, ...props}) => {
  useFieldApi(props);
  const { getRegisteredFields, ffGetRegisteredFields, ...formApi } = useFormApi();
  return (
    <Fragment>
      <button onClick={() => registerSpy(spyFF ? ffGetRegisteredFields() : getRegisteredFields())} id={props.name}></button>
      <PropsSpy {...formApi} />
    </Fragment>
  );
};

const DuplicatedField = ({name, ...props}) => {
  useFieldApi({name: name.split('@').pop(), ...props});
  return <Fragment />;
};

const TextField = (props) => {
  const { input } = useFieldApi(props);
  return (
    <div className="nested-item">
      <input {...input} id={input.name} />
    </div>
  );
};

describe('<FormRenderer />', () => {
  let componentMapper;
  let initialProps;
  let schema;

  beforeEach(() => {
    componentMapper = {
      [componentTypes.TEXT_FIELD]: TextField,
      [componentTypes.TEXTAREA]: () => <div className="nested-item">Textarea field</div>,
      [componentTypes.SELECT]: () => <div className="nested-item">Select field</div>,
      [componentTypes.CHECKBOX]: () => <div className="nested-item">checkbox field</div>,
      [componentTypes.SUB_FORM]: () => <div className="nested-item">sub form</div>,
      [componentTypes.RADIO]: () => <div className="nested-item">Radio field</div>,
      [componentTypes.TABS]: () => <div className="nested-item">Tabs field</div>,
      [componentTypes.DATE_PICKER]: () => <div className="nested-item">Date picker</div>,
      [componentTypes.TIME_PICKER]: () => <div className="nested-item">Time picker</div>,
      [componentTypes.TEXTAREA]: () => <div className="nested-item">Textarea field</div>,
      [componentTypes.SELECT]: () => <div className="nested-item">Select field</div>
    };

    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'component1'
        },
        {
          component: componentTypes.SELECT,
          name: 'secret'
        }
      ]
    };

    initialProps = {
      componentMapper,
      FormTemplate: (props) => <FormTemplate {...props} />,
      onSubmit: jest.fn(),
      schema
    };
  });

  it('should render form from schema', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render errorComponent form from schema', () => {
    const _console = console;

    const spy = jest.fn();
    const logSpy = jest.fn();
    // eslint-disable-next-line no-console
    console.error = spy;
    // eslint-disable-next-line no-console
    console.log = logSpy;

    const schemaWithError = {
      fields: [
        {
          name: 'field without component key'
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schemaWithError} />);

    expect(wrapper.find(SchemaErrorComponent));
    expect(spy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('error: ', expect.any(String));

    console = _console; // eslint-disable-line
  });

  it('should call form reset callback', () => {
    const onReset = jest.fn();
    const wrapper = mount(<FormRenderer {...initialProps} canReset onReset={onReset} />);
    wrapper.find('input#component1').simulate('change', { target: { value: 'foo' } });
    wrapper.update();
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(onReset).toHaveBeenCalled();
  });

  it('should render hidden field', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
      <FormRenderer
        {...initialProps}
        schema={{
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'visible',
              label: 'Visible'
            },
            {
              component: componentTypes.TEXT_FIELD,
              name: 'hidden',
              label: 'Hidden',
              hideField: true
            }
          ]
        }}
        onSubmit={onSubmit}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Initial value data types', () => {
    it('should convert string to integer', () => {
      const onSubmit = jest.fn();
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'initial-convert',
            initialValue: '5',
            dataType: 'integer'
          }
        ]
      };
      const wrapper = mount(<FormRenderer {...initialProps} schema={schema} onSubmit={(values) => onSubmit(values)} />);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ 'initial-convert': 5 });
    });

    it('should convert individual values in array of literals as initial value', () => {
      const onSubmit = jest.fn();
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'initial-convert',
            initialValue: ['5', 3, '11', '999'],
            dataType: 'integer'
          }
        ]
      };
      const wrapper = mount(<FormRenderer {...initialProps} schema={schema} onSubmit={(values) => onSubmit(values)} />);
      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ 'initial-convert': [5, 3, 11, 999] });
    });

    it('should convert individual values in array of objects as initial value', () => {
      const onSubmit = jest.fn();
      const schema = {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'initial-convert',
            initialValue: [{ value: '5' }, { value: 3 }, { value: '11' }, { value: '999' }],
            dataType: 'integer'
          }
        ]
      };
      const wrapper = mount(<FormRenderer {...initialProps} schema={schema} onSubmit={(values) => onSubmit(values)} />);

      wrapper.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ 'initial-convert': [{ value: 5 }, { value: 3 }, { value: 11 }, { value: 999 }] });
    });
  });

  it('should register new field to renderer context', () => {
    const registerSpy = jest.fn();
    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          spy: {component: ContextSpy, registerSpy}
        }}
        schema={{ fields: [{component: 'spy', name: 'should-show'}] }}
        onSubmit={jest.fn()}
      />
    );

    const button = wrapper.find('button#should-show');
    act(() => {
      button.simulate('click');
    });
    expect(registerSpy).toHaveBeenCalledWith(['should-show']);
  });

  it('should un-register field after unmount', () => {
    const registerSpy = jest.fn();
    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          ...componentMapper,
          spy: {component: ContextSpy, registerSpy}
        }}
        initialValues={{ x: 'a' }}
        schema={{ fields: [
          {component: 'spy', name: 'trigger'},
          {component: 'text-field', name: 'x'},
          {component: 'text-field', name: 'field-1', condition: {when: 'x', is: 'a'}}
        ] }}
        onSubmit={jest.fn()}
      />
    );

    const button = wrapper.find('button#trigger');
    act(() => {
      button.simulate('click');
    });
    expect(registerSpy).toHaveBeenCalledWith(['trigger', 'x', 'field-1']);
    act(() => {
      wrapper.find('input').first().simulate('change', { target: { value: '' } });
    });
    act(() => {
      button.simulate('click');
    });
    expect(registerSpy).toHaveBeenCalledWith(['trigger', 'x']);
  });

  it('should not un-register field after unmount with multiple fields coppies', () => {
    const registerSpy = jest.fn();
    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          ...componentMapper,
          spy: {component: ContextSpy, registerSpy},
          duplicate: DuplicatedField,
        }}
        initialValues={{ x: 'a' }}
        schema={{ fields: [
          {component: 'spy', name: 'trigger'},
          {component: 'text-field', name: 'x'},
          {component: 'text-field', name: 'field-1', condition: {when: 'x', is: 'a'}},
          {component: 'duplicate', name: 'dupe@field-1'}
        ] }}
        onSubmit={jest.fn()}
      />
    );

    const button = wrapper.find('button#trigger');
    act(() => {
      button.simulate('click');
    });
    expect(registerSpy).toHaveBeenCalledWith(['trigger', 'x', 'field-1']);
    act(() => {
      wrapper.find('input').first().simulate('change', { target: { value: '' } });
    });
    act(() => {
      button.simulate('click');
    });
    expect(registerSpy).toHaveBeenCalledWith(['trigger', 'x', 'field-1']);
  });

  it('should skip field registration', () => {
    const registerSpy = jest.fn();
    const wrapper = mount(
      <FormRenderer
        FormTemplate={(props) => <FormTemplate {...props} />}
        componentMapper={{
          ...componentMapper,
          spy: {component: ContextSpy, registerSpy},
          duplicate: DuplicatedField,
        }}
        initialValues={{ x: 'a' }}
        schema={{ fields: [
          {component: 'spy', name: 'trigger', skipRegistration: true},
        ] }}
        onSubmit={jest.fn()}
      />
    );

    const button = wrapper.find('button#trigger');
    act(() => {
      button.simulate('click');
    });
    expect(registerSpy).toHaveBeenCalledWith([]);
  });
});
