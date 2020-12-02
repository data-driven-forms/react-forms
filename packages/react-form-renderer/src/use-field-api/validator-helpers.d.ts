import { ValidatorType } from "./use-field-api";
import { ReactNode } from "react";
import { ValidatorMapper } from "../validator-mapper";
import { DataType } from "../data-types";
import { ValidatorFunction } from "../validators/validators";

export type convertToWarning = (validator: ValidatorType) => ValidatorFunction;

export function prepareValidator(
  validator: ValidatorFunction | ValidatorType,
  mapper: ValidatorMapper): ValidatorFunction;

export function getValidate(
  validate?: Array<ValidatorFunction | ValidatorType>,
  dataType?: DataType,
  mapper?: ValidatorMapper): ValidatorFunction[];

export function prepareArrayValidator(validation: ValidatorFunction[]): ValidatorFunction;
