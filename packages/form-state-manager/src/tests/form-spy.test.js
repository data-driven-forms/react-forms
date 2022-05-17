import React from 'react';
import { act, render as rtlRender } from '@testing-library/react';

import FormManagerContext from '../form-manager-context';
import createManagerApi from '../manager-api';
import FormSpy from '../form-spy';

describe('<FormSpy />', () => {
  it('should subscribe to changes', async () => {
    const managerApi = createManagerApi({});

    const render = jest.fn().mockImplementation(() => null);

    const wrapper = rtlRender(
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
        invalid: false,
      })
    );

    await act(async () => {
      managerApi().rerender(['valid']);
    });

    expect(render.mock.calls.length).toEqual(2);

    await act(async () => {
      managerApi().rerender(['values']);
    });

    expect(render.mock.calls.length).toEqual(2);
  });
});