import React, { useState } from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    rtlRender(
      <FormStateManager subscription={{ all: false }}>
        {() => (
          <FieldSpy names={['field-1']} onChange={render}>
            {() => null}
          </FieldSpy>
        )}
      </FormStateManager>
    );

    expect(render.mock.calls.length).toEqual(1);
    expect(state.getRegisteredFields()).toEqual([]);
    expect(state.getFieldState('field-1')).toEqual(undefined);
  });

  it('rerender on field change', async () => {
    rtlRender(
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

    expect(render.mock.calls.length).toEqual(1);

    await userEvent.type(screen.getByLabelText('field-1'), 'some-change');

    expect(render.mock.calls.length).toEqual(13);

    await userEvent.type(screen.getByLabelText('field-2'), 'unrelated');

    expect(render.mock.calls.length).toEqual(14);
  });

  it('rerender on multiple fields change', async () => {
    rtlRender(
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

    expect(render.mock.calls.length).toEqual(1);

    await userEvent.type(screen.getByLabelText('field-1'), 'some-change');

    expect(render.mock.calls.length).toEqual(13);

    await userEvent.type(screen.getByLabelText('field-2'), 'unrelated');

    expect(render.mock.calls.length).toEqual(23);
  });

  it('unrender unregister all listeners', async () => {
    const WrappedFieldSpy = () => {
      const [show, setShow] = useState(true);

      if (show) {
        return (
          <React.Fragment>
            <button onClick={() => setShow(false)}>show</button>
            <FieldSpy names={['field-1', 'field-2']} onChange={render}>
              {() => null}
            </FieldSpy>
          </React.Fragment>
        );
      }

      return null;
    };

    rtlRender(
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
    expect(render.mock.calls.length).toEqual(1);

    await userEvent.type(screen.getByLabelText('field-1'), 'some-change');

    expect(render.mock.calls.length).toEqual(13);

    await userEvent.click(screen.getByText('show'));

    await userEvent.type(screen.getByLabelText('field-1'), 'some-change');

    expect(render.mock.calls.length).toEqual(14);

    await userEvent.type(screen.getByLabelText('field-2'), 'some-change');

    expect(render.mock.calls.length).toEqual(14);
  });

  it('show error when children is not a function', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    rtlRender(
      <FormStateManager subscription={{ all: false }}>
        {() => (
          <FieldSpy names={['field-1']}>
            <span>not a function</span>
          </FieldSpy>
        )}
      </FormStateManager>
    );

    expect(consoleSpy).toHaveBeenCalledWith('Children of FieldSpy has to be a function, you provided: object');

    consoleSpy.mockRestore();
  });
});
