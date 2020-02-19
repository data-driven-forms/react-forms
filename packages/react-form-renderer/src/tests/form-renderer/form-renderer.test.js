import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form } from 'react-final-form';
import FormRenderer from '../../components/form-renderer';
import FormControls from '../../form-renderer/form-controls';
import SchemaErrorComponent from '../../form-renderer/schema-error-component';
import componentTypes from '../../components/component-types';
import layoutComponentTypes from '../../components/layout-component-types';

describe('<FormRenderer />', () => {
  let layoutMapper;
  let formFieldsMapper;
  let initialProps;
  let schema;

  beforeEach(() => {
    formFieldsMapper = {
      [componentTypes.TEXT_FIELD]: () => <div className="nested-item">Text field</div>,
      [componentTypes.TEXTAREA_FIELD]: () => <div className="nested-item">Textarea field</div>,
      [componentTypes.SELECT_COMPONENT]: () => <div className="nested-item">Select field</div>,
      [componentTypes.CHECKBOX]: () => <div className="nested-item">checkbox field</div>,
      [componentTypes.SUB_FORM]: () => <div className="nested-item">sub form</div>,
      [componentTypes.RADIO]: () => <div className="nested-item">Radio field</div>,
      [componentTypes.TABS]: () => <div className="nested-item">Tabs field</div>,
      [componentTypes.DATE_PICKER]: () => <div className="nested-item">Date picker</div>,
      [componentTypes.TIME_PICKER]: () => <div className="nested-item">Time picker</div>,
      [componentTypes.TEXTAREA]: () => <div className="nested-item">Textarea field</div>,
      [componentTypes.SELECT]: () => <div className="nested-item">Select field</div>,
    };

    layoutMapper = {
      [layoutComponentTypes.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
      [layoutComponentTypes.BUTTON]: ({ label, bsStyle, ...rest }) => <button { ...rest }>{ label }</button>,
      [layoutComponentTypes.FORM_WRAPPER]: ({ children }) => <form>{ children }</form>,
      [layoutComponentTypes.TITLE]: ({ children }) => <div>{ children }</div>,
      [layoutComponentTypes.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
    };

    schema = {
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'component1',
      }, {
        component: componentTypes.SELECT,
        name: 'secret',
      }],
    };

    initialProps = {
      formFieldsMapper,
      layoutMapper,
      onSubmit: jest.fn(),
      schema,
    };
  });

  it('should render form from schema', () => {
    const wrapper = mount(<FormRenderer { ...initialProps } />);
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
      fields: [{
        name: 'field without component key',
      }],
    };

    const wrapper = mount(<FormRenderer { ...initialProps } schema={ schemaWithError } />);

    expect(wrapper.find(SchemaErrorComponent));
    expect(spy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('error: ', expect.any(String));

    // eslint-disable-next-line no-global-assign
    console = _console;
  });

  it('should call form reset callback', () => {
    const wrapper = mount(<FormRenderer { ...initialProps } canReset />);
    const form = wrapper.find(Form);
    form.instance().form.change('secret', 'not so secret');
    wrapper.update();
    expect(form.instance().form.getState().pristine).toBe(false);
    wrapper.find('button').at(1).simulate('click');
    expect(form.instance().form.getState().pristine).toBe(true);
  });

  it('should call form reset callback and custom onReset callback', () => {
    const onReset = jest.fn();
    const wrapper = mount(<FormRenderer { ...initialProps } canReset onReset={ onReset }/>);
    const form = wrapper.find(Form);
    form.instance().form.change('secret', 'not so secret');
    wrapper.update();
    expect(form.instance().form.getState().pristine).toBe(false);
    wrapper.find('button').at(1).simulate('click');
    expect(form.instance().form.getState().pristine).toBe(true);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should not render form controls', () => {
    const wrapper = mount(<FormRenderer { ...initialProps } showFormControls={ false }/>);
    expect(wrapper.find(FormControls).first()).toHaveLength(0);
  });

  it('should render custom form controls', () => {
    const onSubmit = jest.fn();
    const FormControls = ({ form: { submit }}) => (
      <div>
        <button id="custom-submit-button" onClick={ submit } type="button">Handle submit</button>
      </div>
    );
    const wrapper = mount(<FormRenderer { ...initialProps } onSubmit={ onSubmit } renderFormButtons={ FormControls }/>);
    wrapper.find('#custom-submit-button').simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should render hidden field', () => {
    const onSubmit = jest.fn();
    const FormControls = ({ form: { submit }}) => (
      <div>
        <button id="custom-submit-button" onClick={ submit } type="button">Handle submit</button>
      </div>
    );
    const wrapper = mount(<FormRenderer
      { ...initialProps }
      schema={{
        fields: [{
          component: [ componentTypes.TEXT_FIELD ],
          name: 'visible',
          label: 'Visible',
        }, {
          component: [ componentTypes.TEXT_FIELD ],
          name: 'hidden',
          label: 'Hidden',
          hideField: true,
        }],
      }}
      onSubmit={ onSubmit }
      renderFormButtons={ FormControls }
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

