import { getOptionLabel, createValue } from '../select';

describe('<Select />', () => {
  describe('helpers', () => {
    describe('#getOptionLabel', () => {
      it('undefined', () => {
        expect(getOptionLabel(undefined)).toEqual('');
      });

      it('empty string', () => {
        expect(getOptionLabel('')).toEqual('');
      });

      it('empty array', () => {
        expect(getOptionLabel([])).toEqual('');
      });

      it('object', () => {
        expect(getOptionLabel({ label: 'some label' })).toEqual('some label');
      });

      it('find in options', () => {
        const options = [
          { value: '1', label: 'one' },
          { value: 'key', label: 'this label' },
          { value: '2', label: 'two' }
        ];

        expect(getOptionLabel('key', options)).toEqual('this label');
      });
    });

    describe('#createOptions', () => {
      it('is multi - single', () => {
        const option = { label: 'label', value: '123' };

        expect(createValue(option, true)).toEqual(option);
      });

      it('is multi - array with objects', () => {
        const option = [
          { label: 'label', value: '123' },
          { label: 'label 2', value: '456' }
        ];

        expect(createValue(option, true)).toEqual(option);
      });

      it('is multi - array with values', () => {
        const option = ['123', '456'];

        expect(createValue(option, true)).toEqual([{ value: '123' }, { value: '456' }]);
      });

      it('is multi - array with values and object', () => {
        const option = ['123', '456', { value: '789', label: 'some label' }];

        expect(createValue(option, true)).toEqual([{ value: '123' }, { value: '456' }, { value: '789', label: 'some label' }]);
      });

      it('createValue', () => {
        const option = { label: 'label', value: '123' };

        expect(createValue(option, false)).toEqual(option);
      });
    });
  });
});
