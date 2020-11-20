import { ValidatorType } from "../files/use-field-api";
import { ReactNode } from "react";
import { ValidatorMapper } from "../files/validator-mapper";
import { DataType } from "../files/data-types";
import { ValidatorFunction } from "../files/validators";

export type convertToWarning = (validator: ValidatorType) => ValidatorFunction;

export function prepareValidator(
  validator: ValidatorFunction | ValidatorType,
  mapper: ValidatorMapper): ValidatorFunction;

export function getValidate(
  validate?: Array<ValidatorFunction | ValidatorType>,
  dataType?: DataType,
  mapper?: ValidatorMapper): ValidatorFunction[];

export function prepareArrayValidator(validation: ValidatorFunction[]): ValidatorFunction;
