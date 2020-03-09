import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormRenderer from '../../components/form-renderer';
import SchemaErrorComponent from '../../form-renderer/schema-error-component';
import componentTypes from '../../components/component-types';
import FormTemplate from '../../../../../__mocks__/mock-form-template';
import useFieldApi from '../../hooks/use-field-api';

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

  it('should use initial values from schema over form props', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
      <FormRenderer
        {...initialProps}
        initialValues={{
          field: 'from-props'
        }}
        schema={{
          initialValues: {
            field: 'from-schema'
          },
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'field',
              label: 'Field'
            }
          ]
        }}
        onSubmit={onSubmit}
      />
    );
    expect(wrapper.find('input').instance().value).toEqual('from-schema');
  });

  it('should override clear on unmount from schema to false', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
      <FormRenderer
        {...initialProps}
        initialValues={{
          field: 'from-props'
        }}
        clearOnUnmount
        schema={{
          clearOnUnmount: false,
          initialValues: {
            field: 'from-schema'
          },
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'field',
              label: 'Field'
            },
            {
              component: componentTypes.TEXT_FIELD,
              condition: {
                when: 'field',
                is: 'a'
              },
              name: 'field-condition',
              label: 'Field'
            }
          ]
        }}
        onSubmit={onSubmit}
      />
    );
    expect(wrapper.find('input#field-condition')).toHaveLength(0);
    wrapper.find('input#field').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('input#field-condition')).toHaveLength(1);
    wrapper.find('input#field-condition').simulate('change', { target: { value: 'condition-value' } });
    wrapper.find('input#field').simulate('change', { target: { value: 'abc' } });
    expect(wrapper.find('input#field-condition')).toHaveLength(0);
    wrapper.find('input#field').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('input#field-condition')).toHaveLength(1);
    expect(wrapper.find('input#field-condition').instance().value).toEqual('condition-value');
  });

  it('should use clearedValue from schema over form props', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
      <FormRenderer
        {...initialProps}
        clearedValue={'cleared-from-props'}
        initialValues={{
          field: 'from-props'
        }}
        schema={{
          clearedValue: 'cleared-from-schema',
          initialValues: {
            field: 'from-schema'
          },
          fields: [
            {
              component: componentTypes.TEXT_FIELD,
              name: 'field',
              label: 'Field'
            }
          ]
        }}
        onSubmit={onSubmit}
      />
    );
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(wrapper.find('input').instance().value).toEqual('cleared-from-schema');
  });
});
