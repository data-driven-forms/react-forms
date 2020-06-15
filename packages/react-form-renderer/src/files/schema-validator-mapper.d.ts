export interface PartialValidator {
  [key: string]: (...args: any[]) => void;
}

interface SchemaValidatorMapper {
  components?: PartialValidator;
  actions?: PartialValidator;
  validators?: PartialValidator;
}

export default SchemaValidatorMapper;
