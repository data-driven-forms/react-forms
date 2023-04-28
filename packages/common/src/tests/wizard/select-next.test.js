import { selectNext } from '../../wizard';

describe('selectNext', () => {
  const VALUE = 'value';
  const EXPECTED_NEXT_STEP = 'barisko';

  const GET_STATE = () => ({
    values: {
      foo: VALUE,
    },
  });

  it('should return string nextstep', () => {
    const NEXTSTEP = EXPECTED_NEXT_STEP;

    expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
  });

  it('should return stepmapper nextstep', () => {
    const NEXTSTEP = {
      when: 'foo',
      stepMapper: {
        [VALUE]: EXPECTED_NEXT_STEP,
      },
    };

    expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
  });

  it('should return custom func nextstep', () => {
    const NEXTSTEP = ({ values }) => {
      if (values.foo === VALUE) {
        return EXPECTED_NEXT_STEP;
      }
    };

    expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
  });
});
