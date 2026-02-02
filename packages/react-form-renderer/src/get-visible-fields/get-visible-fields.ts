import parseCondition from '../parse-condition';
import Field from '../common-types/field';
import { ConditionMapper } from '../form-renderer/condition-mapper';

type FieldOrSchema = Field | Field[] | ({ fields?: Field[] } & Record<string, any>);

const getVisibleFields = (
  schema: FieldOrSchema,
  values: Record<string, any>,
  _unused?: undefined,
  conditionMapper?: ConditionMapper
): FieldOrSchema | FieldOrSchema[] | null => {
  if (Array.isArray(schema)) {
    return schema.map((field) => getVisibleFields(field, values, undefined, conditionMapper)).filter(Boolean);
  }

  const field = schema as Field;

  if (field.condition) {
    const result = parseCondition(field.condition, values, field, conditionMapper);

    if (result.visible) {
      return {
        ...field,
        ...(field.fields && { fields: getVisibleFields(field.fields, values, undefined, conditionMapper)?.filter(Boolean) }),
      };
    } else {
      return null;
    }
  }

  return {
    ...field,
    ...(field.fields && { fields: getVisibleFields(field.fields, values, undefined, conditionMapper)?.filter(Boolean) }),
  };
};

export default getVisibleFields;
