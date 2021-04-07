import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import FormStateManager from '../../form-state-manager';
import FieldSpy from '../../field-spy';

import TextField from '../helpers/text-field';

describe('<FieldSpy />', () => {
  let wrapper;
  let render;
  let state;

  beforeEach(() => {
    render = jest.fn().mockImplementation((props) => {
      state = props;
    });
  });

  it('do not create field state', async () => {
    await act(async () => {
      wrapper = mount(
        <FormStateManager subscription={{ all: false }}>
          {() => (
            <FieldSpy names={['field-1']} onChange={render}>
              {() => null}
            </FieldSpy>
          )}
        </FormStateManager>
      );
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(1);
    expect(state.getRegisteredFields()).toEqual([]);
    expect(state.getFieldState('field-1')).toEqual(undefined);
  });

  it('rerender on field change', async () => {
    await act(async () => {
      wrapper = mount(
        <FormStateManager subscription={{ all: false }}>
          {() => (
            <React.Fragment>
              <TextField label="field-1" name="field-1" id="field-1" type="text" />
              <TextField label="field-2" name="field-2" id="field-2" type="text" />
              <FieldSpy names={['field-1']} onChange={render}>
                {() => null}
              </FieldSpy>
            </React.Fragment>
          )}
        </FormStateManager>
      );
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(1);

    await act(async () => {
      const input = wrapper.find('input').first();
      input.instance().value = 'some-change';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);

    await act(async () => {
      const input = wrapper.find('input').last();
      input.instance().value = 'some-change-unrelated';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);
  });

  it('rerender on multiple fields change', async () => {
    await act(async () => {
      wrapper = mount(
        <FormStateManager subscription={{ all: false }}>
          {() => (
            <React.Fragment>
              <TextField label="field-1" name="field-1" id="field-1" type="text" />
              <TextField label="field-2" name="field-2" id="field-2" type="text" />
              <FieldSpy names={['field-1', 'field-2']} onChange={render}>
                {() => null}
              </FieldSpy>
            </React.Fragment>
          )}
        </FormStateManager>
      );
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(1);

    await act(async () => {
      const input = wrapper.find('input').first();
      input.instance().value = 'some-change';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);

    await act(async () => {
      const input = wrapper.find('input').last();
      input.instance().value = 'some-change-unrelated';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(3);
  });

  it('unmount unregister all listeners', async () => {
    const WrappedFieldSpy = () => {
      const [show, setShow] = useState(true);

      if (show) {
        return (
          <React.Fragment>
            <button onClick={() => setShow(false)} />
            <FieldSpy names={['field-1', 'field-2']} onChange={render}>
              {() => null}
            </FieldSpy>
          </React.Fragment>
        );
      }

      return null;
    };

    await act(async () => {
      wrapper = mount(
        <FormStateManager subscription={{ all: false }}>
          {() => (
            <React.Fragment>
              <TextField label="field-1" name="field-1" id="field-1" type="text" />
              <TextField label="field-2" name="field-2" id="field-2" type="text" />
              <WrappedFieldSpy />
            </React.Fragment>
          )}
        </FormStateManager>
      );
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(1);

    await act(async () => {
      const input = wrapper.find('input').first();
      input.instance().value = 'some-change';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);

    await act(async () => {
      const input = wrapper
        .find('button')
        .first()
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      const input = wrapper.find('input').first();
      input.instance().value = 'some-change';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);

    await act(async () => {
      const input = wrapper.find('input').last();
      input.instance().value = 'some-change-unrelated';
      input.simulate('change');
    });
    wrapper.update();

    expect(render.mock.calls.length).toEqual(2);
  });
});
