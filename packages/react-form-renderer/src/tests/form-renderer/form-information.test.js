import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FormRenderer from '../../form-renderer';
import { layoutComponents } from '../../constants';
import RendererContext from '../../form-renderer/renderer-context';

describe('<FormControls />', () => {
  let initialProps;
  let ContextWrapper;
  let layoutMapper;
  let formFieldsMapper;

  const schema = {
    fields: [],
  };

  beforeEach(() => {
    formFieldsMapper = {};

    layoutMapper = {
      [layoutComponents.BUTTON]: ({ label, buttonType, ...props }) => <button { ...props }>{ label }</button>,
      [layoutComponents.BUTTON_GROUP]: ({ children, ...props }) => <div { ...props }>{ children }</div>,
      [layoutComponents.TITLE]: ({ children }) => <h1>{ children }</h1>,
      [layoutComponents.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
      [layoutComponents.FORM_WRAPPER]: ({ children }) => <form>{ children }</form>,
    };

    ContextWrapper = ({ children, ...props }) => (
      <RendererContext.Provider
        value={{ layoutMapper, ...props }}
      >
        { children }
      </RendererContext.Provider>
    );
    initialProps = {
      onSubmit: jest.fn(),
      formFieldsMapper,
      layoutMapper,
    };
  });

  const TITLE = 'tiiiitle';

  it('should render with title', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormRenderer { ...initialProps } schema={{ ...schema, title: TITLE }}/>
      </ContextWrapper>
    );
    expect(wrapper.find('h1').text().includes(TITLE)).toEqual(true);
  });

  it('should render with label', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormRenderer { ...initialProps } schema={{ ...schema, label: TITLE }}/>
      </ContextWrapper>
    );
    expect(wrapper.find('h1').text().includes(TITLE)).toEqual(true);
  });

  it('should render with description', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormRenderer { ...initialProps } schema={{ ...schema, description: 'Description' }}/>
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with title and description', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormRenderer { ...initialProps } schema={{ ...schema, title: 'Title', description: 'Description' }}/>
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render without title and description', () => {
    const wrapper = mount(
      <ContextWrapper>
        <FormRenderer { ...initialProps } schema={ schema }/>
      </ContextWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
