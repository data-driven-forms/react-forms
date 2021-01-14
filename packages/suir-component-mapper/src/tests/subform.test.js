import React from 'react';
import { mount } from 'enzyme';

import Subform from '../sub-form';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import { Header } from 'semantic-ui-react';

describe('subform', () => {
  const props = {
    fields: [
      {
        title: 'cosiTitle',
        name: 'cosiName',
        fields: []
      },
      {
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: []
      }
    ]
  };

  const TITLE = 'TIIIITLE';
  const DESCRIPTION = 'THIS IS DESCRIPTION';

  it('should render correctly', () => {
    const wrapper = mount(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>)
          }
        }}
      >
        <Subform {...props} />
      </RenderWithProvider>
    );

    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render correctly with title', () => {
    const wrapper = mount(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>)
          }
        }}
      >
        <Subform {...props} title={TITLE} />
      </RenderWithProvider>
    );

    expect(wrapper.find(Header)).toHaveLength(1);
    expect(
      wrapper
        .find(Header)
        .text()
        .includes(TITLE)
    ).toEqual(true);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render correctly with description', () => {
    const wrapper = mount(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>)
          }
        }}
      >
        <Subform {...props} description={DESCRIPTION} />
      </RenderWithProvider>
    );

    expect(wrapper.find('p')).toHaveLength(1);
    expect(
      wrapper
        .find('p')
        .text()
        .includes(DESCRIPTION)
    ).toEqual(true);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render correctly with title and description', () => {
    const wrapper = mount(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>)
          }
        }}
      >
        <Subform {...props} title={TITLE} description={DESCRIPTION} />
      </RenderWithProvider>
    );

    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(
      wrapper
        .find(Header)
        .text()
        .includes(TITLE)
    ).toEqual(true);
    expect(
      wrapper
        .find('p')
        .text()
        .includes(DESCRIPTION)
    ).toEqual(true);
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
