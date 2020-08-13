import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import FormManagerContext from '../files/form-manager-context';
import createManagerApi from '../utils/manager-api';
import FormSpy from '../files/form-spy';

describe('<FormSpy />', () => {
  it('should subscribe to changes', async () => {
    const managerApi = createManagerApi({});

    const render = jest.fn().mockImplementation(() => null);

    const wrapper = mount(
      <FormManagerContext.Provider value={{ ...managerApi(), formOptions: managerApi }}>
        <FormSpy subscription={{ valid: true }}>{render}</FormSpy>
      </FormManagerContext.Provider>
    );

    expect(render.mock.calls.length).toEqual(1);
    expect(render).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: {},
        pristine: true,
        values: {},
        valid: true,
        validating: false,
        invalid: false
      })
    );

    await act(async () => {
      managerApi().rerender(['valid']);
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);

    await act(async () => {
      managerApi().rerender(['values']);
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);
  });
});
