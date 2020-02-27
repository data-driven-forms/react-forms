import { createDisabledDays } from '../../../form-fields/date-time-picker/helpers';

describe('<DateTimePicker /> helpers', () => {
  it('should convert string into Date object', () => {
    const inputValue = ['Tue Oct 08 2019 13:27:20 GMT+0200 (Central European Summer Time)', '1995-12-18T03:24:00', new Date()];
    const expectedValue = [expect.any(Date), expect.any(Date), expect.any(Date)];

    const output = createDisabledDays(inputValue);
    expect(output).toEqual(expectedValue);
    expect(output[0].getFullYear()).toEqual(2019);
    expect(output[1].getFullYear()).toEqual(1995);
    expect(output[1].getDay()).toEqual(1);
    expect(output[1].getMonth()).toEqual(11);
  });

  it('should return Date object if used alias today', () => {
    const inputValue = ['today'];
    const expectedValue = [expect.any(Date)];

    const output = createDisabledDays(inputValue);
    expect(output).toEqual(expectedValue);
  });

  it('should return range object with correct keys', () => {
    const inputValue = [
      {
        before: 'Tue Oct 08 2019 13:27:20 GMT+0200 (Central European Summer Time)',
        after: '1995-12-18T03:24:00'
      },
      new Date()
    ];
    const expectedValue = [
      {
        before: expect.any(Date),
        after: expect.any(Date)
      },
      expect.any(Date)
    ];

    const output = createDisabledDays(inputValue);
    expect(output).toEqual(expectedValue);
  });
});
