import focusError from '../../utils/focus-error';

describe('focusError', () => {
  it('focus first error element', async () => {
    document.body.innerHTML = `<form name="foo">
        <input name="field-1" />
        <input name="field-2" />
        <input name="field-3" />
    </form>`;

    const listener = jest.fn();

    document.querySelector('[name="field-2"]').addEventListener('focus', listener);

    expect(listener).not.toHaveBeenCalled();

    focusError({ 'field-3': 'error', 'field-2': 'error' });

    expect(listener).toHaveBeenCalled();
  });

  it('focus first error element in the right form', async () => {
    document.body.innerHTML = `<form name="not-error">
        <input name="field-1" />
        <input id="not-error" name="this-has-error" />
        <input name="field-3" />
    </form>
    <form name="this-has-error">
        <input name="field-1" />
        <input id="this-has-error" name="this-has-error" />
        <input name="field-3" />
    </form>`;

    const listenerNotError = jest.fn();
    const listenerError = jest.fn();

    document.querySelector('#not-error').addEventListener('focus', listenerNotError);
    document.querySelector('#this-has-error').addEventListener('focus', listenerError);

    expect(listenerNotError).not.toHaveBeenCalled();
    expect(listenerError).not.toHaveBeenCalled();

    focusError({ 'field-3': 'error', 'this-has-error': 'error' }, 'this-has-error');

    expect(listenerNotError).not.toHaveBeenCalled();
    expect(listenerError).toHaveBeenCalled();
  });

  it('not focus first error element when error is empty', async () => {
    document.body.innerHTML = `<form name="foo">
        <input name="field-1" />
        <input name="field-2" />
        <input name="field-3" />
    </form>`;

    const listener = jest.fn();

    document.querySelector('[name="field-2"]').addEventListener('focus', listener);

    expect(listener).not.toHaveBeenCalled();

    focusError({ 'field-2': '' });

    expect(listener).not.toHaveBeenCalled();
  });
});
