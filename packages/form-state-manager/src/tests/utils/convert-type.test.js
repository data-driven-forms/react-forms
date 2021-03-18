import convertType, { dataTypes } from '../../utils/convert-type';

describe('converTypes', () => {
    describe('integer', () => {
      it('converts empty string', () => {
        expect(convertType(dataTypes.INTEGER, '')).toEqual('');
      });

      it('converts zero', () => {
        expect(convertType(dataTypes.INTEGER, '0')).toEqual(0);
      });

      it('converts an integer', () => {
        expect(convertType(dataTypes.INTEGER, '12132')).toEqual(12132);
      });

      it('converts a string', () => {
        expect(convertType(dataTypes.INTEGER, 'abcd')).toEqual('abcd');
      });

      it('converts a negative integer', () => {
        expect(convertType(dataTypes.INTEGER, '-12132')).toEqual(-12132);
      });
    });
  });
