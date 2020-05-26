export interface PartialValidator {
  [key: string]: () => void;
}

interface SchemaValidatorMapper {
  components?: PartialValidator;
  actions?: PartialValidator;
  validators?: PartialValidator;
}

export default SchemaValidatorMapper;
