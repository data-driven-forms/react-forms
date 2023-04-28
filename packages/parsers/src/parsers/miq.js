import { validatorTypes, componentTypes } from '@data-driven-forms/react-form-renderer';

import { neededAttributes, neededFalseAttributes, componentMap } from './miq/constants';

const getAttributes = (field, newField, attributes, boolValue) => {
  attributes.forEach((info) => {
    const attribute = Array.isArray(info) ? info[0] : info;
    const convertedAttribute = Array.isArray(info) ? info[1] : info;
    if (field[attribute] !== '' && field[attribute] !== null && field[attribute] !== !boolValue) {
      newField[convertedAttribute] = field[attribute];
    }
  });
};

const miqParser = (
  inputSchema,
  neededFieldAttributes = neededAttributes,
  neededFieldFalseAttributes = neededFalseAttributes,
  componentsMap = componentMap
) => {
  const title = inputSchema.label;
  const name = inputSchema.id;
  const tabs = inputSchema.content[0].dialog_tabs;
  const formTabs = [];
  const defaultValues = {};
  const { description } = inputSchema;

  tabs.forEach((tab) => {
    const groups = [];
    tab.dialog_groups.forEach((group) => {
      const fieldsArray = [];
      group.dialog_fields.forEach((field) => {
        const newField = {};

        getAttributes(field, newField, neededFieldAttributes, true);
        getAttributes(field, newField, neededFieldFalseAttributes, false);

        if (field.validator_rule) {
          newField.validate = [
            {
              type: validatorTypes.PATTERN,
              pattern: field.validator_rule,
            },
          ];
        }

        if (field.required) {
          newField.validate = newField.validate || [];
          newField.validate.push({
            type: validatorTypes.REQUIRED,
          });
        }

        newField.component = componentsMap[field.type];

        if (field.default_value) {
          if (newField.component === componentTypes.CHECKBOX) {
            defaultValues[field.name] = 'true';
          } else {
            defaultValues[field.name] = field.default_value;
          }
        }

        const options = [];
        if (Array.isArray(field.values)) {
          field.values.forEach((option) => {
            const optionObject = { label: option[1], value: option[0] };
            if (option[0] === null && field.required) {
              optionObject.disabled = true;
            }

            options.push(optionObject);
          });
        }

        if (field.options.force_multi_value) {
          newField.isMulti = true;
        }

        if (options.length !== 0) {
          newField.options = options;
        }

        if (field.data_type === 'integer') {
          newField.type = 'number';
        }

        fieldsArray.push(newField);
      });
      groups.push({
        title: group.label,
        name: group.id,
        fields: fieldsArray,
        component: componentTypes.SUB_FORM,
      });
    });
    formTabs.push({
      title: tab.label,
      description: tab.description,
      name: tab.id,
      fields: groups,
      component: componentTypes.TAB_ITEM,
    });
  });

  const schema = {
    title,
    description,
    fields: [
      {
        fields: formTabs,
        component: componentTypes.TABS,
        name,
      },
    ],
  };

  return {
    schema,
    defaultValues,
  };
};

export default miqParser;
