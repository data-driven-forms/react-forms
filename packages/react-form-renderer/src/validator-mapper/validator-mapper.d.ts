import { ValidatorFunction } from "../validators";

export interface ValidatorMapper {
  [key: string]: (options?: object) => ValidatorFunction;
}

declare const validatorMapper: ValidatorMapper;
export default validatorMapper;
