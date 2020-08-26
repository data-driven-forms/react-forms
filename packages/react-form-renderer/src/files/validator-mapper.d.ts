export interface ValidatorMapper {
  [key: string]: (options?: object) => (value: any, allValues: object) => string | undefined;
}

declare const validatorMapper: ValidatorMapper;
export default validatorMapper;
