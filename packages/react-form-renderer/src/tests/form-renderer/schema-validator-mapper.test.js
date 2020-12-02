/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import FormRenderer from '../../form-renderer';
import componentTypes from '../../component-types';
import DefaultSchemaError from '../../schema-errors';
import SchemaErrorComponent from '../../form-renderer/schema-error-component';

describe('schemaValidatorMapper', () => {
  let initialProps;
  let schemaValidatorMapper;
  let _console;

  beforeEach(() => {
    initialProps = {
      componentMapper: {
        [componentTypes.TEXT_FIELD]: () => <div>heeeellooo</div>,
        [componentTypes.SUB_FORM]: () => <div>heeeellooo</div>
      },
      validatorMapper: {
        custom: () => () => undefined
      },
      actionMapper: {
        translateString: () => 'string'
      },
      FormTemplate: () => <div>heeeellooo</div>,
      onSubmit: jest.fn(),
      schema: {
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            name: 'field-input',
            validate: [{ type: 'custom' }],
            actions: {
              label: ['translateString']
            }
          }
        ]
      }
    };
    schemaValidatorMapper = {};
    _console = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = _console;
  });

  it('component schema error', () => {
    schemaValidatorMapper = {
      components: {
        [componentTypes.TEXT_FIELD]: (field) => {
          if (!field.customProp) {
            throw new DefaultSchemaError(`Please include "customProp" in ${field.name}`);
          }
        }
      }
    };

    const wrapper = mount(<FormRenderer {...initialProps} schemaValidatorMapper={schemaValidatorMapper} />);

    expect(wrapper.find(SchemaErrorComponent).text()).toEqual(expect.stringContaining('Please include "customProp" in field-input'));
  });

  it('validator schema error', () => {
    schemaValidatorMapper = {
      validators: {
        custom: (validator, fieldName) => {
          if (!validator.customProp) {
            throw new DefaultSchemaError(`Please include "customProp" in custom validator in ${fieldName}`);
          }
        }
      }
    };

    const wrapper = mount(<FormRenderer {...initialProps} schemaValidatorMapper={schemaValidatorMapper} />);

    expect(wrapper.find(SchemaErrorComponent).text()).toEqual(
      expect.stringContaining('Please include "customProp" in custom validator in field-input')
    );
  });

  it('action schema error', () => {
    schemaValidatorMapper = {
      actions: {
        translateString: (action, fieldName) => {
          if (!action.length < 2) {
            throw new DefaultSchemaError(`TranslateString actions has to have two arguments in: ${fieldName}`);
          }
        }
      }
    };

    const wrapper = mount(<FormRenderer {...initialProps} schemaValidatorMapper={schemaValidatorMapper} />);

    expect(wrapper.find(SchemaErrorComponent).text()).toEqual(
      expect.stringContaining('TranslateString actions has to have two arguments in: field-input')
    );
  });

  describe('nested components', () => {
    beforeEach(() => {
      initialProps = {
        ...initialProps,
        schema: {
          fields: [
            {
              component: componentTypes.SUB_FORM,
              name: 'subform',
              ...initialProps.schema
            }
          ]
        }
      };
    });

    it('component schema error', () => {
      schemaValidatorMapper = {
        components: {
          [componentTypes.TEXT_FIELD]: (field) => {
            if (!field.customProp) {
              throw new DefaultSchemaError(`Please include "customProp" in ${field.name}`);
            }
          }
        }
      };

      const wrapper = mount(<FormRenderer {...initialProps} schemaValidatorMapper={schemaValidatorMapper} />);

      expect(wrapper.find(SchemaErrorComponent).text()).toEqual(expect.stringContaining('Please include "customProp" in field-input'));
    });

    it('validator schema error', () => {
      schemaValidatorMapper = {
        validators: {
          custom: (validator, fieldName) => {
            if (!validator.customProp) {
              throw new DefaultSchemaError(`Please include "customProp" in custom validator in ${fieldName}`);
            }
          }
        }
      };

      const wrapper = mount(<FormRenderer {...initialProps} schemaValidatorMapper={schemaValidatorMapper} />);

      expect(wrapper.find(SchemaErrorComponent).text()).toEqual(
        expect.stringContaining('Please include "customProp" in custom validator in field-input')
      );
    });

    it('action schema error', () => {
      schemaValidatorMapper = {
        actions: {
          translateString: (action, fieldName) => {
            if (!action.length < 2) {
              throw new DefaultSchemaError(`TranslateString actions has to have two arguments in: ${fieldName}`);
            }
          }
        }
      };

      const wrapper = mount(<FormRenderer {...initialProps} schemaValidatorMapper={schemaValidatorMapper} />);

      expect(wrapper.find(SchemaErrorComponent).text()).toEqual(
        expect.stringContaining('TranslateString actions has to have two arguments in: field-input')
      );
    });
  });
});
