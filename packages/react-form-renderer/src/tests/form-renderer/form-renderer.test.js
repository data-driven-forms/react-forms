import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Form } from 'react-final-form';
import FormRenderer from '../../form-renderer';
import { widgets, uiWidgets } from '../../demo-schemas/mozilla-schemas';
import { components, layoutComponents } from '../../constants';
import FormControls from '../../form-renderer/form-controls';

describe('<FormRenderer />', () => {
  let layoutMapper;
  let formFieldsMapper;
  let initialProps;
  beforeEach(() => {
    formFieldsMapper = {
      [components.TEXT_FIELD]: () => <div className="nested-item">Text field</div>,
      [components.TEXTAREA_FIELD]: () => <div className="nested-item">Textarea field</div>,
      [components.SELECT_COMPONENT]: () => <div className="nested-item">Select field</div>,
      [components.CHECKBOX]: () => <div className="nested-item">checkbox field</div>,
      [components.SUB_FORM]: () => <div className="nested-item">sub form</div>,
      [components.RADIO]: () => <div className="nested-item">Radio field</div>,
      [components.TABS]: () => <div className="nested-item">Tabs field</div>,
      [components.DATE_PICKER]: () => <div className="nested-item">Date picker</div>,
      [components.TIME_PICKER]: () => <div className="nested-item">Time picker</div>,
      [components.TAG_CONTROL]: () => <div className="nested-item">Tag control</div>,
      [components.TEXTAREA]: () => <div className="nested-item">Textarea field</div>,
      [components.SELECT]: () => <div className="nested-item">Select field</div>,
    };

    layoutMapper = {
      [layoutComponents.COL]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.FORM_GROUP]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.HELP_BLOCK]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.BUTTON]: ({ label, bsStyle, ...rest }) => <button { ...rest }>{ label }</button>,
      [layoutComponents.ICON]: ({ type, name }) => <div>Icon: { name }</div>,
      [layoutComponents.ARRAY_FIELD_WRAPPER]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.FORM_WRAPPER]: ({ children }) => <form>{ children }</form>,
      [layoutComponents.TITLE]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
    };

    initialProps = {
      formFieldsMapper,
      layoutMapper,
      onSubmit: jest.fn(),
      schemaType: 'mozilla',
      schema: widgets,
      uischema: uiWidgets,
    };

  });

  it('should render form from schema', () => {
    const wrapper = mount(<FormRenderer { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
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
});

