import {
  simple,
  uiSchemaSimple,
  nestedSchema,
  nestedUiSchema,
  arraySchema,
  uiArraySchema,
  numberSchema,
  numberUiSchema,
  widgetSchema,
  uiWidgetSchema,
  orderingSchema,
  uiOrderingSchema,
  anyOfSelectSchema,
  conditionalSchema,
} from '../../demo-schemas/mozilla-schemas';
import {
  simpleSchemaResult,
  nestedSchemaResult,
  arraySchemaResult,
  numbersSchemaResult,
  widgetsExpectedResult,
} from './expected-parser-results';
import mozillaSchemaParser from '../../parsers/mozilla-parser/mozilla-schema-parser';

describe('Mozilla json schema parser', () => {
  it('should parse simple form example', () => {
    const  formSchema = simple;
    const uiSchema = uiSchemaSimple;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema, uiSchema);
    expect(schema).toEqual(simpleSchemaResult);
    expect(defaultValues).toEqual({});
  });

  it('should parse nested schema', () => {
    const  formSchema = nestedSchema;
    const uiSchema = nestedUiSchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema, uiSchema);
    expect(schema).toEqual(nestedSchemaResult);
    expect(defaultValues).toEqual({ tasks: { done: false }});
  });

  it('should parse array schema', () => {
    const  formSchema = arraySchema;
    const uiSchema = uiArraySchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema, uiSchema);
    expect(schema).toEqual(arraySchemaResult);
    expect(defaultValues).toEqual(expect.objectContaining({
      fixedItemsList: { additionalItems: undefined },
      minItemsList: { name: 'Default name' },
      defaultsAndMinItems: [ 'carp', 'trout', 'bream' ],
      fixedNoToolbar: { additionalItems: { items: 'lorem ipsum' }},
    }));
  });

  it('should parse numbers schema', () => {
    const  formSchema = numberSchema;
    const uiSchema = numberUiSchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema, uiSchema);
    expect(schema).toEqual(numbersSchemaResult);
    expect(defaultValues).toEqual({});
  });

  it('should parse widgets schema', () => {
    const  formSchema = widgetSchema;
    const uiSchema = uiWidgetSchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema, uiSchema);
    expect(schema).toEqual(widgetsExpectedResult);
    expect(defaultValues).toEqual({
      disabled: 'I am disabled.',
      readonly: 'I am read-only.',
      secret: 'I\'m a hidden string.',
      string: {
        color: '#151ce6',
      },
      widgetOptions: 'I am yellow',
    });
  });

  it('should parse ordered schema', () => {
    const  formSchema = orderingSchema;
    const uiSchema = uiOrderingSchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema, uiSchema);
    const expectedResult =  {
      title: 'A registration form',
      fields: [
        expect.objectContaining({
          name: 'firstName',
        }),
        expect.objectContaining({
          name: 'lastName',
        }),
        expect.objectContaining({
          name: 'bio',
        }),
        expect.objectContaining({
          name: 'age',
        }),
        expect.objectContaining({
          name: 'password',
        }),
      ],
    };
    expect(schema).toEqual(expectedResult);
    expect(defaultValues).toEqual({});
  });

  it('should parse anyOf select definition', () => {
    const  formSchema = anyOfSelectSchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema);
    const expectedSchema = expect.objectContaining({
      fields: expect.arrayContaining([
        expect.objectContaining({
          component: 'select-field',
          dataType: 'string',
          name: 'authentication',
          options: [{
            label: 'Please Choose',
          }, {
            value: 'oauth',
            label: 'OAuth 2.0',
          }, {
            value: 'basic',
            label: 'Basic Authentication',
          }, {
            value: 'none',
            label: 'No Authentication needed',
          }],
        }),
      ]),
    });
    expect(schema).toEqual(expectedSchema);
    expect(defaultValues).toEqual({
      authentication: 'none',
    });
  });

  it('should parse conditional fields', () => {
    const formSchema = conditionalSchema;
    const  { schema, defaultValues } = mozillaSchemaParser(formSchema);
    const expectedSchema = {
      title: 'Web hook',
      description: 'This web hook allows us to send a JSON object from the service portal',
      fields: [
        expect.objectContaining({
          name: 'url',
          validate: [{
            type: 'required-validator',
          }, {
            type: 'pattern-validator',
            pattern: '^(http|https)://*',
          }],
        }),
        expect.objectContaining({
          name: 'verify_ssl',
        }),
        expect.objectContaining({
          name: 'secret',
        }),
        expect.arrayContaining([
          expect.objectContaining({
            name: 'authentication',
            component: 'select-field',
            type: 'text',
            options: [{
              label: 'Please Choose',
            }, {
              label: 'OAuth 2.0',
              value: 'oauth',
            }, {
              label: 'Basic Authentication',
              value: 'basic',
            }, {
              label: 'No Authentication needed',
              value: 'none',
            }],
          }),
          expect.objectContaining({
            component: 'text-field',
            condition: { when: 'authentication', is: [ 'oauth' ]},
            name: 'token',
            type: 'text',
          }),
          expect.objectContaining({
            component: 'text-field',
            condition: { when: 'authentication', is: [ 'basic' ]},
            name: 'userid',
            type: 'text',
          }),
          expect.objectContaining({
            component: 'text-field',
            condition: { when: 'authentication', is: [ 'basic' ]},
            type: 'password',
            name: 'password',
          }),
        ]) ],
    };
    expect(schema).toEqual(expectedSchema);
    expect(defaultValues).toEqual({
      authentication: 'none',
      verify_ssl: true, // eslint-disable-line camelcase
    });
  });
});
