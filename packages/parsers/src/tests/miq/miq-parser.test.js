import { miq } from '../../index';
import inputJSON from './miq-schemas/input';
import outputJSON, { defaultValues } from './miq-schemas/output';

describe('miqParser', () => {
  it('Should parse schema and default values correctly ', () => {
    const output = miq(inputJSON);
    expect(output.schema).toEqual(outputJSON);
    expect(output.defaultValues).toEqual(defaultValues);
  });
});
