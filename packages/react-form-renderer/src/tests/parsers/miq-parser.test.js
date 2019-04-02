import miqParse from '../../parsers/miq-parser/miq-parser';
import inputJSON from '../../demo-schemas/miq-schemas/input';
import outputJSON, { defaultValues } from '../../demo-schemas/miq-schemas/output';

describe('miqParser', () => {
  it('Should parse schema and default values correctly ', () => {
    const output = miqParse(inputJSON);
    expect(output.schema).toEqual(outputJSON);
    expect(output.defaultValues).toEqual(defaultValues);
  });
});
