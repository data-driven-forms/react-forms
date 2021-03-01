import { DataType } from "../data-types";

export interface EnhancedOnChangeOptions {
  dataType?: DataType;
  onChange: (value: any) => void;
  initial?: any;
  clearedValue?: any;
  dirty?: boolean;
}

export default function enhancedOnChange(options: EnhancedOnChangeOptions, value: any): void;
