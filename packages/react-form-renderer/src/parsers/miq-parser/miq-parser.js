import { components, validators } from '../../constants';
import { neededAttributes, neededFalseAttributes, componentMap } from './constants';

const getAttributes = (field, newField, attributes, boolValue) => {
  attributes.forEach((info) => {
    const attribute = Array.isArray(info) ? info[0] : info;
    const convertedAttribute = Array.isArray(info) ? info[1] : info;
    if (field[attribute] !== '' && field[attribute] !== null && field[attribute] !== !boolValue){
      newField[convertedAttribute] = field[attribute];
    }
  });
};

const miqParser = (
  inputSchema,
  neededFieldAttributes = neededAttributes,
  neededFieldFalseAttributes = neededFalseAttributes,
  componentsMap = componentMap,
) => {
  const title = inputSchema.label;
  const key = inputSchema.id;
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
          newField.validate = [{
            type: validators.PATTERN_VALIDATOR,
            pattern: field.validator_rule,
          }];
        }

        if (field.required) {
          newField.validate = newField.validate || [];
          newField.validate.push({
            type: validators.REQUIRED,
          });
        }

        newField.component = componentsMap[field.type];

        if (field.default_value) {
          if (newField.component === components.CHECKBOX) {
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
          newField.multi = true;
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
        key: group.id,
        fields: fieldsArray,
        component: components.SUB_FORM,
      });
    });
    formTabs.push({
      title: tab.label,
      description: tab.description,
      key: tab.id,
      fields: groups,
      component: components.TAB_ITEM,
    });
  });

  const schema = {
    title,
    description,
    fields: [{
      fields: formTabs,
      component: components.TABS,
      key,
    }],
  };

  return {
    schema,
    defaultValues,
  };
};

export default miqParser;
