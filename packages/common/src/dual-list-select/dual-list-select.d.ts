import { AnyObject, Input } from "@data-driven-forms/react-form-renderer";

export type DualListSelectCommonProps<
  FieldValue,
  SelectProps = {}
>  = {
  DualListSelect: React.ComponentType;
  options: {
    [key: string]: any;
    label: React.ReactNode,
    value: any 
  }[];
  input: Input<FieldValue>;
} & SelectProps & AnyObject;

declare const DualListSelectCommon: React.ComponentType<DualListSelectCommonProps<any, {}>>;

export default DualListSelectCommon;