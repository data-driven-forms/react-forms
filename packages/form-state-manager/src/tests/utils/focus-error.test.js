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
});
